import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import he from 'he';
import Pristine from 'pristinejs/dist/pristine';
import {
  destinationValidate,
  diffDateValidate,
  ERROR_MESSAGE_DATE_INVALID,
  ERROR_MESSAGE_DESTINATION_NOT_SELECTED,
  ERROR_MESSAGE_PRICE_INVALID
} from '../utils/validation';
import {getEventTypeIconSrc} from '../utils/trip-event';
import {getDateWithTime} from '../utils/date';

import 'flatpickr/dist/flatpickr.min.css';

const DEFAULT_TYPE = 'flight';
const TRIP_EVENT_DEFAULT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};

function createTemplate(tripEvent, destinations, offers, isCreateTripEvent) {
  const availableOffers = offers.find((offerByType) => offerByType.type === tripEvent.type).offers;
  const eventDestination = destinations.find((destination) => destination.id === tripEvent.destination);
  const deleteButtonText = tripEvent.isDeleting ? 'Deleting...' : 'Delete';

  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
            <header class="event__header">
                <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${he.encode(getTripEventId(tripEvent))}">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src="${he.encode(getEventTypeIconSrc(tripEvent.type))}" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${he.encode(getTripEventId(tripEvent))}" type="checkbox" ${tripEvent.isDisabled ? 'disabled' : ''}>
                        ${createEventTypeListTemplate(offers, tripEvent.id)}
                </div>
                <div class="event__field-group-container">
                    <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-${he.encode(getTripEventId(tripEvent))}">
                            ${he.encode(tripEvent.type)}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-${he.encode(getTripEventId(tripEvent))}" type="text" name="event-destination" value="${tripEvent.destination ? he.encode(eventDestination.name) : ''}" list="destination-list-${he.encode(getTripEventId(tripEvent))}" ${tripEvent.isDisabled ? 'disabled' : ''}>
                        <datalist id="destination-list-${he.encode(getTripEventId(tripEvent))}">
                            ${destinations.map((destination) => `<option value="${he.encode(destination.name)}"></option>`).join('')}
                        </datalist>
                    </div>
                </div>
                <div class="event__field-group-container">
                    <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-${he.encode(getTripEventId(tripEvent))}">From</label>
                        <input class="event__input  event__input--time" id="event-start-time-${he.encode(getTripEventId(tripEvent))}" type="text" name="event-start-time" value="${he.encode(getDateWithTime(tripEvent.dateFrom))}" ${tripEvent.isDisabled ? 'disabled' : ''}>
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-${he.encode(getTripEventId(tripEvent))}">To</label>
                        <input class="event__input  event__input--time" id="event-end-time-${he.encode(getTripEventId(tripEvent))}" type="text" name="event-end-time" value="${he.encode(getDateWithTime(tripEvent.dateTo))}" ${tripEvent.isDisabled ? 'disabled' : ''}>
                    </div>
                </div>
                <div class="event__field-group-container">
                    <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-${he.encode(getTripEventId(tripEvent))}">
                            <span class="visually-hidden">Price</span>
                            &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-${he.encode(getTripEventId(tripEvent))}" type="number" name="event-price" value="${he.encode(tripEvent.basePrice.toString()) ?? ''}" ${tripEvent.isDisabled ? 'disabled' : ''}>
                    </div>
                </div>
                <button class="event__save-btn  btn  btn--blue" type="submit" ${tripEvent.isDisabled ? 'disabled' : ''}>${tripEvent.isSaving ? 'Saving...' : 'Save'}</button>
                <button class="event__reset-btn" type="reset" ${tripEvent.isDisabled ? 'disabled' : ''}>${isCreateTripEvent ? 'Cancel' : deleteButtonText}</button>
                    ${isCreateTripEvent ? '' : '<button class="event__rollup-btn" type="button">\n <span class="visually-hidden">Open event</span>\n </button>'}
            </header>
            <section class="event__details">
            ${availableOffers.length > 0 ? `<section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${createOffersTemplate(tripEvent, offers, tripEvent.isDisabled)}
                  </div>
                </section>` : ''}

                ${eventDestination?.description.length > 0 || eventDestination?.pictures.length > 0 ? `<section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${he.encode(eventDestination.description)}</p>
                    ${eventDestination.pictures.length > 0 ? createDestinationPhotosTemplate(eventDestination.pictures) : ''}
                </section>` : ''}
            </section>
        </form>
    </li>`
  );
}

function createOffersTemplate(tripEvent, offers, isDisabled) {
  const currentTypeOffers = offers.find((typeOffers) => typeOffers.type === tripEvent.type).offers;
  return currentTypeOffers.map((offer) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${he.encode(offer.id)}" type="checkbox" name="${he.encode(offer.id)}"
                ${tripEvent.offers.has(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
            <label class="event__offer-label" for="event-offer-luggage-${he.encode(offer.id)}">
                <span class="event__offer-title">${he.encode(offer.title)}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${he.encode(offer.price.toString())}</span>
            </label>
          </div>`).join('');
}

function createDestinationPhotosTemplate(photos) {
  return `<div class="event__photos-container">
            <div class="event__photos-tape">
                ${photos.map((photo) => `<img class="event__photo" src="${he.encode(photo.src)}" alt="${he.encode(photo.description)}">`)}
            </div>
          </div>`;
}

function createEventTypeListTemplate(offers, tripEventId) {
  return `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        ${offers.map((offersByTypes) => createEventTypeTemplate(offersByTypes.type, tripEventId)).join('')}

      </fieldset>
    </div>`;
}

function createEventTypeTemplate(type, tripEventId) {
  return (
    `<div class="event__type-item">
        <input id="event-type-${he.encode(type)}${tripEventId ? `-${he.encode(tripEventId)}` : ''}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${he.encode(type)}">
        <label class="event__type-label  event__type-label--${he.encode(type)}" for="event-type-${he.encode(type)}${tripEventId ? `-${he.encode(tripEventId)}` : ''}">${he.encode(type.charAt(0).toUpperCase() + type.slice(1))}</label>
    </div>`
  );
}

function getTripEventId(tripEvent) {
  return tripEvent.id ?? 'new';
}

export default class EditFormView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #onSubmit = null;
  #onCloseForm = null;
  #onClickDeleteButton = null;
  #datepickerDateFrom = null;
  #datepickerDateTo = null;
  #isCreateTripEvent = false;
  #pristine = null;

  constructor({
    tripEvent = null,
    offers,
    destinations,
    onSubmit,
    onClose,
    onCLickDeleteButton
  }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onSubmit = onSubmit;
    this.#onCloseForm = onClose;
    this.#onClickDeleteButton = onCLickDeleteButton;

    if (!tripEvent) {
      this.#isCreateTripEvent = true;
      tripEvent = TRIP_EVENT_DEFAULT;
    }

    this._setState(EditFormView.parseTripEventToState(tripEvent));
    this._restoreHandlers();
  }

  #addValidator = () => {
    this.#pristine = new Pristine(this.element, {
      classTo: 'event__field-group-container',
      errorTextParent: 'event__field-group-container',
      errorTextTag: 'P',
      errorTextClass: 'event__field-group-error'
    });

    this.#pristine.addValidator(
      this.element.querySelector('.event__input--destination'),
      () => destinationValidate(this._state.destination, this.#destinations),
      ERROR_MESSAGE_DESTINATION_NOT_SELECTED
    );
    this.#pristine.addValidator(
      this.element.querySelector('input[name=\'event-start-time\']'),
      () => diffDateValidate(this._state.dateFrom, this._state.dateTo),
      ERROR_MESSAGE_DATE_INVALID
    );
    this.#pristine.addValidator(
      this.element.querySelector('input[name=\'event-end-time\']'),
      () => diffDateValidate(this._state.dateFrom, this._state.dateTo),
      ERROR_MESSAGE_DATE_INVALID
    );
    this.#pristine.addValidator(
      this.element.querySelector('.event__input--price'),
      () => this._state.basePrice > 0,
      ERROR_MESSAGE_PRICE_INVALID
    );

  };

  #getDatepicker(dateElement, defaultDate, onChange) {
    return flatpickr(
      dateElement,
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: defaultDate,
        onValueUpdate: onChange,
        appendTo: this.element
      }
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    if (!this.#pristine.validate()) {
      return;
    }

    this.#onSubmit(EditFormView.parseStateToTripEvent(this._state));
    this.element.removeEventListener('submit', this.#onSubmit);
  };

  #onCloseHandler = () => {
    this.#onCloseForm();
    this.element.removeEventListener('submit', this.#onSubmit);
  };

  #onChangeTipEventTypeHandler = (evt) => {
    this.updateElement({type: evt.target.value, offers: new Set()});
  };

  #onChangeDestinationHandler = (evt) => {
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    if (!selectedDestination) {
      evt.target.value = '';

      return;
    }

    this.updateElement({destination: selectedDestination.id});
  };

  #onChangePrice = (evt) => {
    this._setState({basePrice: Number(evt.target.value)});
  };

  #onChangeOffer = (evt) => {
    const offers = this._state.offers;
    const offerId = evt.target.name;

    if (offers.has(offerId)) {
      offers.delete(offerId);
    } else {
      offers.add(offerId);
    }

    this.updateElement({offers: offers});
  };

  #onChangeDateFrom = ([newDate]) => {
    this._setState({dateFrom: newDate});
  };

  #onChangeDateTo = ([newDate]) => {
    this._setState({dateTo: newDate});
  };

  #onDelete = () => {
    this.#onClickDeleteButton(EditFormView.parseStateToTripEvent(this._state));
  };

  get template() {
    return createTemplate(this._state, this.#destinations, this.#offers, this.#isCreateTripEvent);
  }

  static parseTripEventToState(tripEvent) {
    return {
      ...tripEvent,
      offers: new Set(tripEvent.offers),
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToTripEvent(state) {
    const tripEvent = {...state, offers: Array.from(state.offers)};

    delete tripEvent.isDisabled;
    delete tripEvent.isSaving;
    delete tripEvent.isDeleting;

    return tripEvent;
  }

  _restoreHandlers() {
    const offersSectionElement = this.element.querySelector('.event__available-offers');

    this.element.addEventListener('submit', this.#formSubmitHandler);

    if (this.#isCreateTripEvent) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCloseHandler);
    } else {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCloseHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDelete);
    }

    this.element.querySelector('.event__type-group').addEventListener('change', this.#onChangeTipEventTypeHandler);
    this.element.querySelector(`#event-destination-${getTripEventId(this._state)}`).addEventListener('change', this.#onChangeDestinationHandler);
    this.element.querySelector(`#event-price-${getTripEventId(this._state)}`).addEventListener('input', this.#onChangePrice);

    if (offersSectionElement) {
      offersSectionElement.addEventListener('change', this.#onChangeOffer);
    }

    this.#datepickerDateFrom = this.#getDatepicker(
      this.element.querySelector(`#event-start-time-${getTripEventId(this._state)}`),
      this._state.dateFrom,
      this.#onChangeDateFrom
    );
    this.#datepickerDateTo = this.#getDatepicker(
      this.element.querySelector(`#event-end-time-${getTripEventId(this._state)}`),
      this._state.dateTo,
      this.#onChangeDateTo
    );
    this.#addValidator();
  }

  reset(tripEvent) {
    this.updateElement(EditFormView.parseTripEventToState(tripEvent));
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerDateFrom) {
      this.#datepickerDateFrom.destroy();
      this.#datepickerDateFrom = null;
    }

    if (this.#datepickerDateTo) {
      this.#datepickerDateTo.destroy();
      this.#datepickerDateTo = null;
    }
  }
}
