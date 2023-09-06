import EventTypeListView from '../view/event-type-list-view';
import TripEventView from '../view/trip-event-view';
import EditFormView from '../view/edit-form-view';
import {remove, render, replace} from '../framework/render';
import EventTypeView from '../view/event-type-view';

export default class TripEventPresenter {
  #tripEvent = null;
  #offers = null;
  #destinations = null;
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
    const eventTypeList = new EventTypeListView();

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
      render(eventTypeList, this.#editTripEventComponent.element.querySelector('.event__type-wrapper'));

      for (const offersByTypes of this.#offers) {
        render(new EventTypeView({
          type: offersByTypes.type,
          tripEventId: this.#tripEvent.id
        }), eventTypeList.element.querySelector('.event__type-group'));
      }

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
    this.#eventsListContainer.element.replaceChild(this.#editTripEventComponent.element, this.#tripEventComponent.element);
    document.addEventListener('keydown', this.#escKeyDown);
    this.#isOpenEdit = true;
  };

  #closeEdit = () => {
    this.#eventsListContainer.element.replaceChild(this.#tripEventComponent.element, this.#editTripEventComponent.element);
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
