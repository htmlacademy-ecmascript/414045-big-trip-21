import EditFormView from '../view/edit-form-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view';
import TripEventView from '../view/trip-event-view';
import TripEventsListView from '../view/trip-events-list-view';
import EventTypeView from '../view/event-type-view';
import EventTypeListView from '../view/event-type-list-view';
import EventOfferView from '../view/event-offer-view';
import {render} from '../render';

export default class AppPresenter {
  filterContainer = document.querySelector('.trip-controls__filters');
  tripEventsContainer = document.querySelector('.trip-events');
  tripEventsList = new TripEventsListView();
  editFormView = new EditFormView();
  eventTypeList = new EventTypeListView();

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.tripEventsContainer);
    render(this.editFormView, this.tripEventsContainer);
    render(this.eventTypeList, this.editFormView.getElement().querySelector('.event__type-wrapper'));
    render(this.tripEventsList, this.tripEventsContainer);

    for (let i = 0; i < 6; i++) {
      render(new EventTypeView(), this.eventTypeList.getElement());
    }

    for (let i = 0; i < 3; i++) {
      render(new TripEventView(), this.tripEventsList.getElement());
    }

    for (let i = 0; i < 5; i++) {
      render(new EventOfferView(), this.editFormView.getElement().querySelector('.event__available-offers'));
    }
  }
}
