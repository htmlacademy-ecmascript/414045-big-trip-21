import AbstractView from '../framework/view/abstract-view';

function createTemplate({type, tripEventId}) {
  return (
    `<div class="event__type-item">
        <input id="event-type-${type}${tripEventId ? `-${tripEventId}` : ''}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}${tripEventId ? `-${tripEventId}` : ''}">${type}</label>
    </div>`
  );
}

export default class EventTypeView extends AbstractView {
  #type = null;
  #tripEventId = null;

  constructor({type, tripEventId}) {
    super();
    this.#type = type;
    this.#tripEventId = tripEventId;
  }

  get template() {
    return createTemplate({type: this.#type, tripEventId: this.#tripEventId});
  }
}
