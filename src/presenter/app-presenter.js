import EditFormView from '../view/edit-form-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view';
import TripEventView from '../view/trip-event-view';
import TripEventsListView from '../view/trip-events-list-view';
import EventTypeView from '../view/event-type-view';
import EventTypeListView from '../view/event-type-list-view';
import EmptyTripEventsListView from '../view/empty-trip-events-list-view';
import {render} from '../framework/render';

export default class AppPresenter {
  #tripEvents;
  #destinations;
  #offers;
  #sorts;
  #filterContainer = document.querySelector('.trip-controls__filters');
  #tripEventsContainer = document.querySelector('.trip-events');
  #tripEventsList = new TripEventsListView();
  #eventTypeList = new EventTypeListView();

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

    for (const offersByTypes of this.#offers) {
      render(new EventTypeView({type: offersByTypes.type}), this.#eventTypeList.element);
    }

    for (const tripEvent of this.#tripEvents) {
      this.#renderTripEvent(tripEvent);
    }
  }

  #renderTripEvent(tripEvent) {
    const eventDestination = this.#destinations.find((destination) => destination.id === tripEvent.destination);
    const eventsContainer = this.#tripEventsList.element;

    const tripEventView = new TripEventView({
      tripEvent: tripEvent,
      offers: this.#offers,
      destination: eventDestination,
      onClick: openEdit
    });
    const editTripEventView = new EditFormView({
      tripEvent: tripEvent,
      offers: this.#offers,
      destinations: this.#destinations,
      onSubmit: closeEdit,
      onClickRollupButton: closeEdit
    });

    const escKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeEdit();
        document.removeEventListener('keydown', escKeyDown);
      }
    };

    function openEdit() {
      eventsContainer.replaceChild(editTripEventView.element, tripEventView.element);
      document.addEventListener('keydown', escKeyDown);
    }

    function closeEdit() {
      eventsContainer.replaceChild(tripEventView.element, editTripEventView.element);
      document.removeEventListener('keydown', escKeyDown);
    }

    render(tripEventView, eventsContainer);
  }
}
