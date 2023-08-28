import {createElement} from '../render.js';

function createTemplate(type) {
  return (
    `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`
  );
}

export default class EventTypeView {
  constructor({type}) {
    this.type = type;
  }

  getTemplate() {
    return createTemplate(this.type);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
