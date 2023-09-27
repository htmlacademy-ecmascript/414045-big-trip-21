import TripEventView from '../view/trip-event-view';
import EditFormView from '../view/edit-form-view';
import {remove, render, replace} from '../framework/render';
import {TripEventUserAction, UpdateType} from '../const';

export default class TripEventPresenter {
  #tripEvent = null;
  #offers = [];
  #destinations = [];
  #eventsListContainer = null;
  #onUpdateTripEvent = null;
  #tripEventComponent = null;
  #editTripEventComponent = null;
  #onOpenEditForm = null;
  #handleViewAction = null;
  #isOpenEdit = false;

  constructor({offers, destinations, eventsListContainer, onUpdateTripEvent, onOpenEditForm, handleViewAction}) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#eventsListContainer = eventsListContainer;
    this.#onUpdateTripEvent = onUpdateTripEvent;
    this.#onOpenEditForm = onOpenEditForm;
    this.#handleViewAction = handleViewAction;
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
      onSubmit: this.#onSubmit,
      onClickRollupButton: this.#closeEdit,
      onCLickDeleteButton: this.#handleTripEventDelete
    });

    if (prevTripEventComponent === null || prevEditTripEventComponent === null) {
      render(this.#tripEventComponent, eventsContainer);

      return;
    }

    if (this.#isOpenEdit) {
      replace(this.#editTripEventComponent, prevEditTripEventComponent);
    } else {
      replace(this.#tripEventComponent, prevTripEventComponent);
    }

    remove(prevTripEventComponent);
    remove(prevEditTripEventComponent);
  }

  #escKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.reset();
      document.removeEventListener('keydown', this.#escKeyDown);
    }
  };

  #toggleFavoriteState = () => {
    this.#onUpdateTripEvent({...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite});
  };

  #openEdit = () => {
    this.#onOpenEditForm();
    replace(this.#editTripEventComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#escKeyDown);
    this.#isOpenEdit = true;
  };

  #closeEdit = () => {
    replace(this.#tripEventComponent, this.#editTripEventComponent);
    this.#isOpenEdit = false;
  };

  #onSubmit = (tripEvent) => {
    this.#handleViewAction(TripEventUserAction.UPDATE, UpdateType.MAJOR, tripEvent);
  };

  #handleTripEventDelete = (tripEventId) => {
    this.#handleViewAction(TripEventUserAction.DELETE, UpdateType.MAJOR, tripEventId);
  };

  reset = () => {
    if (this.#isOpenEdit) {
      this.#editTripEventComponent.reset(this.#tripEvent);
      this.#closeEdit();
    }
  };

  destroy() {
    document.removeEventListener('keydown', this.#escKeyDown);
    remove(this.#tripEventComponent);
    remove(this.#editTripEventComponent);
  }

  setSaving() {
    if (this.#isOpenEdit) {
      this.#editTripEventComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if (this.#isOpenEdit) {
      this.#editTripEventComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    const resetFormState = () => {
      this.#editTripEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#editTripEventComponent.shake(resetFormState);
  }
}
