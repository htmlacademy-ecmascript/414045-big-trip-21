import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view';
import TripEventsListView from '../view/trip-events-list-view';
import EmptyTripEventsListView from '../view/empty-trip-events-list-view';
import {render} from '../framework/render';
import TripEventPresenter from './trip-event-presenter';
import {updateItem} from '../utils/common';
import {SortType} from '../const';
import {sortByPrice, sortByTime} from '../utils/trip-event';

export default class AppPresenter {
  #tripEvents = [];
  #defaultSortedTripEvents = [];
  #destinations = [];
  #offers = [];
  #sorts = [];
  #tripEventModel = null;
  #destinationModel = null;
  #offerModel = null;
  #filterContainer = document.querySelector('.trip-controls__filters');
  #tripEventsContainer = document.querySelector('.trip-events');
  #tripEventsList = new TripEventsListView();
  #tripEventPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor({tripEventModel, destinationModel, offerModel, sorts}) {
    this.#tripEventModel = tripEventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#sorts = [...sorts];
  }

  init() {
    this.#tripEvents = [...this.#tripEventModel.getTripEvents()];
    this.#defaultSortedTripEvents = [...this.#tripEvents];
    this.#destinations = [...this.#destinationModel.getDestinations()];
    this.#offers = [...this.#offerModel.getOffers()];

    render(new FilterView(), this.#filterContainer);

    if (this.#tripEvents.length > 0) {
      render(new SortView({sorts: this.#sorts, onSortChange: this.#handleSortChange}), this.#tripEventsContainer);
      this.#renderTripEventsList();
    } else {
      render(new EmptyTripEventsListView(), this.#tripEventsContainer);
    }
  }

  #renderTripEventsList() {
    render(this.#tripEventsList, this.#tripEventsContainer);

    for (const tripEvent of this.#tripEvents) {
      const tripEventPresenter = new TripEventPresenter({
        offers: this.#offers,
        destinations: this.#destinations,
        eventsListContainer: this.#tripEventsList,
        onClickFavoriteButton: this.#handleTripEventChange,
        onOpenEditForm: this.#handleOpenEditEvent
      });
      this.#tripEventPresenter.set(tripEvent.id, tripEventPresenter);
      tripEventPresenter.init(tripEvent);
    }
  }

  #handleTripEventChange = (updatedTripEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedTripEvent);
    this.#defaultSortedTripEvents = updateItem(this.#defaultSortedTripEvents, updatedTripEvent);
    this.#tripEventPresenter.get(updatedTripEvent.id).init(updatedTripEvent);
  };

  #handleOpenEditEvent = () => {
    this.#tripEventPresenter.forEach((tripEventPresenter) => tripEventPresenter.reset());
  };

  #handleSortChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#sortTripEvents(sortType);
    this.#clearTripEventsList();
    this.#renderTripEventsList();
  };

  #sortTripEvents = (sortType) => {
    switch (sortType) {
      case 'sort-day':
        this.#tripEvents = [...this.#defaultSortedTripEvents];
        break;
      case 'sort-time':
        this.#tripEvents.sort(sortByTime);
        break;
      case 'sort-price':
        this.#tripEvents.sort(sortByPrice);
        break;
    }

    this.#currentSortType = sortType;
  };

  #clearTripEventsList() {
    this.#tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenter.clear();
  }
}
