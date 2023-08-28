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

  constructor({tripEventModel, destinationsModel, offersModel}) {
    this.tripEvents = [...tripEventModel.getTripEvents()];
    this.destinations = [...destinationsModel.getDestinations()];
    this.offers = offersModel.getOffers();
  }

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.tripEventsContainer);
    render(new EditFormView({
      destinations: this.destinations,
      offers: this.offers
    }),
    this.tripEventsContainer);
    render(this.eventTypeList, document.querySelector('.event__type-wrapper'));
    render(this.tripEventsList, this.tripEventsContainer);

    for (const offersByTypes of this.offers) {
      render(new EventTypeView({type: offersByTypes.type}), this.eventTypeList.getElement());
    }

    for (const tripEvent of this.tripEvents) {
      const eventDestination = this.destinations.find((destination) => destination.id === tripEvent.destination);
      const eventOffers = this.offers.find((typeOffers) => typeOffers.type === tripEvent.type).offers.filter((offer) => tripEvent.offers.includes(offer.id));

      render(new TripEventView({
        tripEvent: tripEvent,
        offers: eventOffers,
        destination: eventDestination
      }), this.tripEventsList.getElement());
    }
  }
}
