import AbstractView from '../framework/view/abstract-view';

export default class EmptyListWithMessageView extends AbstractView {
  #message = '';

  constructor({message}) {
    super();

    this.#message = message;
  }

  get template() {
    return `<p class="trip-events__msg">${this.#message}</p>`;
  }
}
