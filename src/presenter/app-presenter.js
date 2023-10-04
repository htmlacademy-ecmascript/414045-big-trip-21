import TripEventsListView from '../view/trip-events-list-view';
import EmptyListWithMessageView from '../view/empty-list-with-message-view';
import TripEventPresenter from './trip-event-presenter';
import FiltersPresenter from './filters-presenter';
import SortsPresenter from './sorts-presenter';
import AddTripEventPresenter from './add-trip-event-presenter';
import TripInfoPresenter from './trip-info-presenter';
import TripEventModel from '../model/trip-event-model';
import OfferModel from '../model/offer-model';
import DestinationModel from '../model/destination-model';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import {remove, render} from '../framework/render';
import {FilterType, SortType, TripEventUserAction, UpdateType} from '../const';
import {filterTripEvents} from '../utils/filter';
import {sortByDate, sortByPrice, sortByTime} from '../utils/sort';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export default class AppPresenter {
  #tripEventModel = null;
  #destinationModel = null;
  #offerModel = null;
  #filterModel = null;
  #sortModel = null;

  #tripEventsContainer = document.querySelector('.trip-events');
  #filterContainer = document.querySelector('.trip-controls__filters');

  #filtersPresenter = null;
  #sortsPresenter = null;
  #tripInfoPresenter = null;
  #addTripEventPresenter = null;
  #tripEventPresenters = new Map();

  #messageComponent = null;
  #loadingTripEventsComponent = new EmptyListWithMessageView({message: 'Loading...'});
  #tripEventsListComponent = new TripEventsListView();

  #newEventButton = document.querySelector('.trip-main__event-add-btn');

  #isLoadingError = false;
  #isLoading = true;
  #isLoadingTripEvents = true;
  #isLoadingDestinations = true;
  #isLoadingOffers = true;
  #isDeletedAllTripEvents = false;
  #isCreatingTripEvent = false;

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
      sortModel: this.#sortModel,
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

  #renderTripEventsList() {
    this.#removeMessage();
    render(this.#tripEventsListComponent, this.#tripEventsContainer);

    if (this.#isLoadingError) {
      this.#renderMessage('Failed to load latest route information');
      return;
    }

    if (this.tripEvents.length > 0) {
      this.#sortsPresenter.init();
    } else if (this.#isDeletedAllTripEvents && this.#filterModel.filter !== FilterType.EVERYTHING) {
      this.#renderMessage(`There are no ${this.#filterModel.filter} events now`);
      this.#isDeletedAllTripEvents = false;
    } else if (!this.#isCreatingTripEvent) {
      this.#renderMessage('Click New Event to create your first point');
    }

    for (const tripEvent of this.tripEvents) {
      const tripEventPresenter = new TripEventPresenter({
        offers: this.#offerModel.offers,
        destinations: this.#destinationModel.destinations,
        eventsListContainer: this.#tripEventsListComponent,
        onOpenEditForm: this.#handleOpenEditEvent,
        handleViewAction: this.#handleViewAction
      });
      this.#tripEventPresenters.set(tripEvent.id, tripEventPresenter);
      tripEventPresenter.init(tripEvent);
    }
  }

  #renderMessage(message) {
    this.#messageComponent = new EmptyListWithMessageView({message});

    render(this.#messageComponent, this.#tripEventsContainer);
  }

  #removeMessage() {
    if (this.#messageComponent) {
      remove(this.#messageComponent);
      this.#messageComponent = null;
    }
  }

  #clearTripEventsList() {
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();
  }

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

  #closeCreateForm = () => {
    if (this.#addTripEventPresenter) {
      this.#addTripEventPresenter.destroy();
      this.#addTripEventPresenter = null;
      this.#newEventButton.disabled = false;
    }
  };

  #handlerClickCreateEventButton = () => {
    this.#isCreatingTripEvent = true;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#sortModel.setSort(UpdateType.MINOR, SortType.DAY);
    this.#tripEventPresenters.forEach((tripEventPresenter) => tripEventPresenter.reset());
    this.#newEventButton.disabled = true;
    this.#addTripEventPresenter = new AddTripEventPresenter({
      offers: this.#offerModel.offers,
      destinations: this.#destinationModel.destinations,
      container: this.#tripEventsListComponent,
      onClose: this.#handlerCloseCreateTripEventForm,
      handleViewAction: this.#handleViewAction
    });

    this.#addTripEventPresenter.init();
  };

  #handleOpenEditEvent = () => {
    this.#removeMessage();
    this.#closeCreateForm();
    this.#tripEventPresenters.forEach((tripEventPresenter) => tripEventPresenter.reset());
  };

  #handlerCloseCreateTripEventForm = () => {
    this.#newEventButton.disabled = false;
    this.#isCreatingTripEvent = false;
    this.#clearTripEventsList();
    this.#renderTripEventsList();
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
          this.#isDeletedAllTripEvents = true;
          await this.#tripEventModel.deleteTripEvent(updateType, tripEvent);
        } catch {
          this.#tripEventPresenters.get(tripEvent.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

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

        if (this.#isLoading) {
          return;
        } else {
          remove(this.#loadingTripEventsComponent);
        }

        this.#renderTripEventsList();
        break;
      case UpdateType.LOADING_ERROR:
        this.#isLoadingError = true;
        break;
    }
  };

  init() {
    render(this.#loadingTripEventsComponent, this.#tripEventsContainer);
    this.#tripInfoPresenter.init();
    this.#filtersPresenter.init();
  }
}
