import AbstractView from '../framework/view/abstract-view';

function createTemplate() {
  return '<ul class="trip-events__list"></ul>';
}
export default class TripEventsListView extends AbstractView {
  get template() {
    return createTemplate();
  }
}
