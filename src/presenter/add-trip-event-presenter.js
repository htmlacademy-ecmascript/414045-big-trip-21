import EditFormView from '../view/edit-form-view';
import {remove, render, RenderPosition} from '../framework/render';
import {TripEventUserAction, UpdateType} from '../const';

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
      onClose: this.#onClickCancelButton
    });

    render(this.#createTripEventComponent, this.#container.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDown);
  }

  destroy() {
    document.removeEventListener('keydown', this.#escKeyDown);
    remove(this.#createTripEventComponent);
  }

  #handleFormSubmit = (tripEvent) => {
    this.#handleViewAction(TripEventUserAction.CREATE, UpdateType.MAJOR, tripEvent);
    this.#onClose();
  };

  #escKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#onClose();
      this.destroy();
    }
  };

  #onClickCancelButton = () => {
    this.#onClose();
    this.destroy();
  };

  setSaving() {
    this.#createTripEventComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#createTripEventComponent.updateElement({
        isDisabled: false,
        isSaving: false
      });
    };

    this.#createTripEventComponent.shake(resetFormState);
  }
}
