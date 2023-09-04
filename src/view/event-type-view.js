import AbstractView from '../framework/view/abstract-view';

export default class EventTypeView extends AbstractView {
  constructor({type}) {
    super();
    this.type = type;
  }

  get template() {
    return this.#createTemplate(this.type);
  }

  #createTemplate(type) {
    return (
      `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`
    );
  }
}
