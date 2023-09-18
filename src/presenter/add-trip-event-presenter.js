import EditFormView from '../view/edit-form-view';
import {remove, render, RenderPosition} from '../framework/render';
import {UpdateType, UserAction} from '../const';

export default class AddTripEventPresenter {
  #offers = [];
  #destinations = [];
  #container = null;
  #onClose = null;
  #createTripEventComponent = null;
  #handleViewAction = null;

  constructor({offers, destinations, container, onClose, handleViewAction}) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#container = container;
    this.#onClose = onClose;
    this.#handleViewAction = handleViewAction;
  }

  init() {
    this.#createTripEventComponent = new EditFormView({
      offers: this.#offers,
      destinations: this.#destinations,
      onSubmit: this.#handleFormSubmit,
      onClickCancelButton: this.#onClickCancelButton
    });

    render(this.#createTripEventComponent, this.#container.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDown);
  }

  destroy() {
    remove(this.#createTripEventComponent);
  }

  #handleFormSubmit = (tripEvent) => {
    this.#handleViewAction(UserAction.CREATE_TRIP_EVENT, UpdateType.MAJOR, tripEvent);
    this.#onClose();
    this.destroy();
  };

  #escKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#onClose();
      this.destroy();
      document.removeEventListener('keydown', this.#escKeyDown);
    }
  };

  #onClickCancelButton = () => {
    this.#onClose();
    this.destroy();
    document.removeEventListener('keydown', this.#escKeyDown);
  };
}
