import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view';
import TripEventsListView from '../view/trip-events-list-view';
import EmptyTripEventsListView from '../view/empty-trip-events-list-view';
import {render} from '../framework/render';
import TripEventPresenter from './trip-event-presenter';
import {updateItem} from '../utils';

export default class AppPresenter {
  #tripEvents = [];
  #destinations = [];
  #offers = [];
  #sorts = [];
  #filterContainer = document.querySelector('.trip-controls__filters');
  #tripEventsContainer = document.querySelector('.trip-events');
  #tripEventsList = new TripEventsListView();
  #tripEventPresenter = new Map();

  constructor({tripEventModel, destinationsModel, offersModel, sorts}) {
    this.#tripEvents = [...tripEventModel.getTripEvents()];
    this.#destinations = [...destinationsModel.getDestinations()];
    this.#offers = [...offersModel.getOffers()];
    this.#sorts = [...sorts];
  }

  init() {
    render(new FilterView(), this.#filterContainer);

    if (this.#tripEvents.length > 0) {
      render(new SortView({sorts: this.#sorts}), this.#tripEventsContainer);
      render(this.#tripEventsList, this.#tripEventsContainer);
    } else {
      render(new EmptyTripEventsListView(), this.#tripEventsContainer);
    }

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
    this.#tripEventPresenter.get(updatedTripEvent.id).init(updatedTripEvent);
  };

  #handleOpenEditEvent = () => {
    this.#tripEventPresenter.forEach((tripEventPresenter) => tripEventPresenter.reset());
  };
}
