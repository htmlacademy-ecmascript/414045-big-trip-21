import EditFormView from '../view/edit-form-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view';
import TripEventView from '../view/trip-event-view';
import TripEventsListView from '../view/trip-events-list-view';
import EventTypeView from '../view/event-type-view';
import EventTypeListView from '../view/event-type-list-view';
import {render} from '../render';

export default class AppPresenter {
  filterContainer = document.querySelector('.trip-controls__filters');
  tripEventsContainer = document.querySelector('.trip-events');
  tripEventsList = new TripEventsListView();
  eventTypeList = new EventTypeListView();

  constructor({tripEventModel, destinationsModel, eventTypesModel, offersModel}) {
    this.tripEvents = [...tripEventModel.getTripEvents()];
    this.destinations = [...destinationsModel.getDestinations()];
    this.eventTypes = [...eventTypesModel.getEventTypes()];
    this.offers = offersModel.getOffers();
  }

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.tripEventsContainer);
    render(new EditFormView({
      destinations: this.destinations,
      offers: this.offers,
      eventTypes: this.eventTypes,
    }),
    this.tripEventsContainer);
    render(this.eventTypeList, document.querySelector('.event__type-wrapper'));
    render(this.tripEventsList, this.tripEventsContainer);

    for (const eventType of this.eventTypes) {
      render(new EventTypeView({type: eventType}), this.eventTypeList.getElement());
    }

    for (const tripEvent of this.tripEvents) {
      const eventType = this.eventTypes[tripEvent.typeId];
      const destination = this.destinations[tripEvent.destinationId];
      const eventOffers = this.offers[eventType.name].filter((offer, index) => tripEvent.offerIds.includes(index));

      render(new TripEventView({
        tripEvent: tripEvent,
        offers: eventOffers,
        eventType: eventType,
        destination: destination
      }), this.tripEventsList.getElement());
    }
  }
}
