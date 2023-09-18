import TripEventsListView from '../view/trip-events-list-view';
import EmptyTripEventsListView from '../view/empty-trip-events-list-view';
import {render} from '../framework/render';
import TripEventPresenter from './trip-event-presenter';
import {FilterType, SortType, UpdateType, UserAction} from '../const';
import {filterTripEvents, sortByPrice, sortByTime} from '../utils/trip-event';
import FiltersPresenter from './filters-presenter';
import SortsPresenter from './sorts-presenter';
import AddTripEventPresenter from './add-trip-event-presenter';

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
  #sortsPresenter = null;
  #tripEventPresenters = new Map();
  #newEventButton = document.querySelector('.trip-main__event-add-btn');
  #addTripEventPresenter = null;

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

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#tripEventModel.addObserver(this.#handleModelEvent);
    this.#sortModel.addObserver(this.#handleModelEvent);
    this.#newEventButton.addEventListener('click', this.#handlerClickCreateEventButton);
  }

  get tripEvents() {
    const filteredTripEvents = filterTripEvents(this.#filterModel.filter, this.#tripEventModel.tripEvents);

    switch (this.#sortModel.sort) {
      case SortType.TIME:
        return filteredTripEvents.sort(sortByTime);
      case SortType.PRICE:
        return filteredTripEvents.sort(sortByPrice);
    }

    return filteredTripEvents;
  }

  init() {
    this.#destinations = [...this.#destinationModel.destinations];
    this.#offers = [...this.#offerModel.offers];

    this.#filtersPresenter.init();

    if (this.tripEvents.length > 0) {
      this.#sortsPresenter.init();
      this.#renderTripEventsList();
    } else {
      render(new EmptyTripEventsListView(), this.#tripEventsContainer);
    }
  }

  #renderTripEventsList() {
    render(this.#tripEventsList, this.#tripEventsContainer);

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
    this.#tripEventPresenters.get(updatedTripEvent.id).init(updatedTripEvent);
  };

  #handleOpenEditEvent = () => {
    this.#closeCreateForm();
    this.#tripEventPresenters.forEach((tripEventPresenter) => tripEventPresenter.reset());
  };

  #clearTripEventsList(resetSortType = false) {
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();

    if (resetSortType) {
      this.#sortModel.set = SortType.DAY;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEventsList();
        this.#renderTripEventsList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEventsList(true);
        this.#renderTripEventsList();
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
    this.#addTripEventPresenter = null;
  };

  #closeCreateForm = () => {
    if (this.#addTripEventPresenter) {
      this.#addTripEventPresenter.destroy();
      this.#addTripEventPresenter = null;
    }
  };

  #handleViewAction = (actionType, updateType, data) => {
    switch (actionType) {
      case UserAction.CREATE_TRIP_EVENT:
        this.#tripEventModel.addTripEvent(updateType, data);
        break;
      case UserAction.DELETE_TRIP_EVENT:
        this.#tripEventModel.deleteTripEvent(updateType, data);
        break;
    }
  };
}
