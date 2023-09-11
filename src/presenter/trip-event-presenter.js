import TripEventView from '../view/trip-event-view';
import EditFormView from '../view/edit-form-view';
import {remove, render, replace} from '../framework/render';

export default class TripEventPresenter {
  #tripEvent = null;
  #offers = [];
  #destinations = [];
  #eventsListContainer = null;
  #onClickFavoriteButton = null;
  #tripEventComponent = null;
  #editTripEventComponent = null;
  #onOpenEditForm = null;
  #isOpenEdit = false;

  constructor({offers, destinations, eventsListContainer, onClickFavoriteButton, onOpenEditForm}) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#eventsListContainer = eventsListContainer;
    this.#onClickFavoriteButton = onClickFavoriteButton;
    this.#onOpenEditForm = onOpenEditForm;
  }

  init(tripEvent) {
    this.#tripEvent = tripEvent;

    const prevTripEventComponent = this.#tripEventComponent;
    const prevEditTripEventComponent = this.#editTripEventComponent;

    const eventDestination = this.#destinations.find((destination) => destination.id === this.#tripEvent.destination);
    const eventsContainer = this.#eventsListContainer.element;

    this.#tripEventComponent = new TripEventView({
      tripEvent: this.#tripEvent,
      offers: this.#offers,
      destination: eventDestination,
      onClick: this.#openEdit,
      onClickFavoriteButton: this.#toggleFavoriteState
    });

    this.#editTripEventComponent = new EditFormView({
      tripEvent: this.#tripEvent,
      offers: this.#offers,
      destinations: this.#destinations,
      onSubmit: this.#closeEdit,
      onClickRollupButton: this.#closeEdit
    });

    if (prevTripEventComponent === null || prevEditTripEventComponent === null) {
      render(this.#tripEventComponent, eventsContainer);

      return;
    }

    replace(this.#tripEventComponent, prevTripEventComponent);
    remove(prevTripEventComponent);
    remove(prevEditTripEventComponent);
  }

  #escKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeEdit();
      document.removeEventListener('keydown', this.#escKeyDown);
    }
  };

  #toggleFavoriteState = () => {
    this.#onClickFavoriteButton({...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite});
  };

  #openEdit = () => {
    this.#onOpenEditForm();
    replace(this.#editTripEventComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#escKeyDown);
    this.#isOpenEdit = true;
  };

  #closeEdit = () => {
    replace(this.#tripEventComponent, this.#editTripEventComponent);
    document.removeEventListener('keydown', this.#escKeyDown);
    this.#isOpenEdit = false;
  };

  reset = () => {
    if (this.#isOpenEdit) {
      this.#closeEdit();
    }
  };

  destroy() {
    remove(this.#tripEventComponent);
    remove(this.#editTripEventComponent);
  }
}
