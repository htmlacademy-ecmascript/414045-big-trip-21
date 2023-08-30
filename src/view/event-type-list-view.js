import AbstractView from '../framework/view/abstract-view';

export default class EventTypeListView extends AbstractView {
  get template() {
    return (
      `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
      </fieldset>
    </div>`
    );
  }
}
