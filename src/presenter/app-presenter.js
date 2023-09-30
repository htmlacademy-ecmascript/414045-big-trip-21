import TripEventsListView from '../view/trip-events-list-view';
import EmptyTripEventsListView from '../view/empty-trip-events-list-view';
import {remove, render} from '../framework/render';
import TripEventPresenter from './trip-event-presenter';
import {FilterType, SortType, TripEventUserAction, UpdateType} from '../const';
import {filterTripEvents, sortByDate, sortByPrice, sortByTime} from '../utils/trip-event';
import FiltersPresenter from './filters-presenter';
import SortsPresenter from './sorts-presenter';
import AddTripEventPresenter from './add-trip-event-presenter';
import TripEventModel from '../model/trip-event-model';
import OfferModel from '../model/offer-model';
import DestinationModel from '../model/destination-model';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import TripInfoPresenter from './trip-info-presenter';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export default class AppPresenter {
  #destinations = [];
  #offers = [];
  #tripEventModel = null;
  #destinationModel = null;
  #offerModel = null;
  #filterModel = null;
  #sortModel = null;
  #tripEventsContainer = document.querySelector('.trip-events');
  #tripEventsList = new TripEventsListView();
  #filterContainer = document.querySelector('.trip-controls__filters');
  #filtersPresenter = null;
  #tripInfoPresenter = null;
  #emptyTipEventListComponent = new EmptyTripEventsListView();
  #sortsPresenter = null;
  #tripEventPresenters = new Map();
  #newEventButton = document.querySelector('.trip-main__event-add-btn');
  #addTripEventPresenter = null;
  #isLoading = true;
  #isLoadingTripEvents = true;
  #isLoadingDestinations = true;
  #isLoadingOffers = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({tripEventModel, destinationModel, offerModel, filterModel, sortModel}) {
    this.#tripEventModel = tripEventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;
    this.#sortModel = sortModel;
    this.#filtersPresenter = new FiltersPresenter({
      tripEventModel: this.#tripEventModel,
      filterModel: this.#filterModel,
      container: this.#filterContainer
    });
    this.#sortsPresenter = new SortsPresenter({
      tripEventModel: this.#tripEventModel,
      sortModel: this.#sortModel,
      container: this.#tripEventsContainer
    });
    this.#tripInfoPresenter = new TripInfoPresenter({
      tripEventModel: this.#tripEventModel,
      offerModel: this.#offerModel,
      destinationModel: this.#destinationModel
    });

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#tripEventModel.addObserver(this.#handleModelEvent);
    this.#sortModel.addObserver(this.#handleModelEvent);
    this.#offerModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
    this.#newEventButton.addEventListener('click', this.#handlerClickCreateEventButton);
  }

  get tripEvents() {
    const filteredTripEvents = filterTripEvents(this.#filterModel.filter, this.#tripEventModel.tripEvents);
    switch (this.#sortModel.sort) {
      case SortType.DAY:
        return filteredTripEvents.sort(sortByDate);
      case SortType.TIME:
        return filteredTripEvents.sort(sortByTime);
      case SortType.PRICE:
        return filteredTripEvents.sort(sortByPrice);
    }

    return filteredTripEvents;
  }

  init() {
    this.#tripInfoPresenter.init();
    this.#filtersPresenter.init();
  }

  #renderTripEventsList() {
    render(this.#tripEventsList, this.#tripEventsContainer);

    if (this.#isLoading) {
      return;
    }

    if (this.tripEvents.length > 0) {
      remove(this.#emptyTipEventListComponent);
      this.#sortsPresenter.init();
    } else {
      render(this.#emptyTipEventListComponent, this.#tripEventsContainer);
    }

    this.#offers = this.#offerModel.offers;
    this.#destinations = this.#destinationModel.destinations;

    for (const tripEvent of this.tripEvents) {
      const tripEventPresenter = new TripEventPresenter({
        offers: this.#offers,
        destinations: this.#destinations,
        eventsListContainer: this.#tripEventsList,
        onUpdateTripEvent: this.#handleTripEventChange,
        onOpenEditForm: this.#handleOpenEditEvent,
        handleViewAction: this.#handleViewAction
      });
      this.#tripEventPresenters.set(tripEvent.id, tripEventPresenter);
      tripEventPresenter.init(tripEvent);
    }
  }

  #handleTripEventChange = (updatedTripEvent) => {
    this.#tripEventModel.updateTripEvent(UpdateType.PATCH, updatedTripEvent);
  };

  #handleOpenEditEvent = () => {
    this.#closeCreateForm();
    this.#tripEventPresenters.forEach((tripEventPresenter) => tripEventPresenter.reset());
  };

  #clearTripEventsList() {
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#closeCreateForm();
        this.#clearTripEventsList();
        this.#renderTripEventsList();
        break;
      case UpdateType.MAJOR:
        this.#closeCreateForm();
        this.#clearTripEventsList();
        this.#renderTripEventsList();
        break;
      case UpdateType.INIT:
        this.#updateLoadingStatus(data);
        this.#isLoading = this.#isLoadingTripEvents || this.#isLoadingDestinations || this.#isLoadingOffers;
        this.#renderTripEventsList();
        break;
    }
  };

  #updateLoadingStatus = (modelClassName) => {
    switch (modelClassName) {
      case TripEventModel.name:
        this.#isLoadingTripEvents = false;
        break;
      case OfferModel.name:
        this.#isLoadingOffers = false;
        break;
      case DestinationModel.name:
        this.#isLoadingDestinations = false;
        break;
    }
  };

  #handlerClickCreateEventButton = () => {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#sortModel.setSort(UpdateType.MINOR, SortType.DAY);
    this.#tripEventPresenters.forEach((tripEventPresenter) => tripEventPresenter.reset());
    this.#newEventButton.disabled = true;
    this.#addTripEventPresenter = new AddTripEventPresenter({
      offers: this.#offers,
      destinations: this.#destinations,
      container: this.#tripEventsList,
      onClose: this.#handlerCloseCreateTripEventForm,
      handleViewAction: this.#handleViewAction
    });

    this.#addTripEventPresenter.init();

  };

  #handlerCloseCreateTripEventForm = () => {
    this.#newEventButton.disabled = false;
  };

  #closeCreateForm = () => {
    if (this.#addTripEventPresenter) {
      this.#addTripEventPresenter.destroy();
      this.#addTripEventPresenter = null;
      this.#newEventButton.disabled = false;
    }
  };

  #handleViewAction = async (actionType, updateType, tripEvent) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case TripEventUserAction.CREATE:
        try {
          this.#addTripEventPresenter.setSaving();
          await this.#tripEventModel.addTripEvent(updateType, tripEvent);
        } catch {
          this.#addTripEventPresenter.setAborting();
        }
        break;
      case TripEventUserAction.UPDATE:
        try {
          this.#tripEventPresenters.get(tripEvent.id).setSaving();
          await this.#tripEventModel.updateTripEvent(updateType, tripEvent);
        } catch {
          this.#tripEventPresenters.get(tripEvent.id).setAborting();
        }
        break;
      case TripEventUserAction.DELETE:
        try {
          this.#tripEventPresenters.get(tripEvent.id).setDeleting();
          await this.#tripEventModel.deleteTripEvent(updateType, tripEvent);
        } catch {
          this.#tripEventPresenters.get(tripEvent.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };
}
