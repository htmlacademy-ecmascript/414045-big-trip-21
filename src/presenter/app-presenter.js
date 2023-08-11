import EditFormView from '../view/edit-form-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view';
import WaypointView from '../view/waypoint-view';
import {render} from '../render';
import WaypointListView from '../view/waypoint-list-view';

export default class AppPresenter {
  filterContainer = document.querySelector('.trip-controls__filters');
  eventsContainer = document.querySelector('.trip-events');
  waypointList = new WaypointListView();

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.eventsContainer);
    render(new EditFormView(), this.eventsContainer);
    render(this.waypointList, this.eventsContainer);

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.waypointList.getElement());
    }
  }
}
