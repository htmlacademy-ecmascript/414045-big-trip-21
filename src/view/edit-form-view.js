import {getDateWithTime, getEventTypeIconSrc} from '../utils/common';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const DEFAULT_TYPE = 'taxi';
const TRIP_EVENT_DEFAULT = {
  id: 1,
  basePrice: null,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};

function createTemplate(tripEvent, destinations, offers) {
  const eventDestination = destinations.find((destination) => destination.id === tripEvent.destination);

  return (
    `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${tripEvent.id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="${getEventTypeIconSrc(tripEvent.type)}" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${tripEvent.id}" type="checkbox">

                    ${createEventTypeListTemplate(offers, tripEvent.id)}

                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${tripEvent.id}">
                      ${tripEvent.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${tripEvent.id}" type="text" name="event-destination" value="${tripEvent.destination ? eventDestination.name : ''}" list="destination-list-${tripEvent.id}">
                    <datalist id="destination-list-${tripEvent.id}">
                      ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${tripEvent.id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${tripEvent.id}" type="text" name="event-start-time" value="${getDateWithTime(tripEvent.dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${tripEvent.id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${tripEvent.id}" type="text" name="event-end-time" value="${getDateWithTime(tripEvent.dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${tripEvent.id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${tripEvent.id}" type="text" name="event-price" value="${tripEvent.basePrice ?? ''}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                        ${createOffersTemplate(tripEvent, offers)}
                    </div>
                  </section>

                  ${tripEvent.destination ? `<section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${eventDestination.name}</p>

                        ${eventDestination.pictures.length > 0 ? createDestinationPhotosTemplate(eventDestination.pictures) : ''}

                       </section>` : ''}

                </section>
              </form>`
  );
}

function createOffersTemplate(tripEvent, offers) {
  const currentTypeOffers = offers.find((typeOffers) => typeOffers.type === tripEvent.type).offers;
  return currentTypeOffers.map((offer) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="${offer.id}"
                ${tripEvent.offers.has(offer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join('');
}

function createDestinationPhotosTemplate(photos) {
  return `<div class="event__photos-container">
            <div class="event__photos-tape">
                ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)}
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
        <input id="event-type-${type}${tripEventId ? `-${tripEventId}` : ''}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}${tripEventId ? `-${tripEventId}` : ''}">${type}</label>
    </div>`
  );
}

export default class EditFormView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #onSubmit = null;
  #onClickRollupButton = null;
  #datepickerDateFrom = null;
  #datepickerDateTo = null;

  constructor({tripEvent, offers, destinations, onSubmit, onClickRollupButton = TRIP_EVENT_DEFAULT}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onSubmit = onSubmit;
    this.#onClickRollupButton = onClickRollupButton;

    this._setState(EditFormView.parseTripEventToState(tripEvent));
    this._restoreHandlers();
  }

  #getDatepicker(dateElement, defaultDate, onChange) {
    return flatpickr(
      dateElement,
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: defaultDate,
        onChange: onChange
      }
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmit(EditFormView.parseStateToTripEvent(this._state));
    this.element.removeEventListener('submit', this.#onSubmit);
  };

  #onClickRollupButtonHandler = () => {
    this.#onClickRollupButton();
    this.element.removeEventListener('submit', this.#onSubmit);
  };

  #onChangeTipEventTypeHandler = (evt) => {
    this.updateElement({type: evt.target.value, offers: new Set()});
  };

  #onChangeDestinationHandler = (evt) => {
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({destination: selectedDestination.id});
  };

  #onChangePrice = (evt) => {
    this._setState({basePrice: evt.target.value});
  };

  #onChangeOffer = (evt) => {
    const offers = this._state.offers;
    const offerId = evt.target.name;

    if (offers.has(offerId)) {
      offers.delete(offerId);
    } else {
      offers.add(Number(evt.target.name));
    }

    this._setState({offers: offers});
  };

  #onChangeDateFrom = (newDate) => {
    this._setState({dateFrom: newDate});
  };

  #onChangeDateTo = (newDate) => {
    this._setState({dateTo: newDate});
  };

  get template() {
    return createTemplate(this._state, this.#destinations, this.#offers);
  }

  static parseTripEventToState(tripEvent) {
    const state = {...tripEvent};

    state.offers = new Set(state.offers);

    return state;
  }

  static parseStateToTripEvent(state) {
    const tripEvent = {...state};

    tripEvent.offers = Array.from(tripEvent.offers);

    return tripEvent;
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onClickRollupButtonHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onChangeTipEventTypeHandler);
    this.element.querySelector(`#event-destination-${this._state.id}`).addEventListener('change', this.#onChangeDestinationHandler);
    this.element.querySelector(`#event-price-${this._state.id}`).addEventListener('change', this.#onChangePrice);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#onChangeOffer);

    this.#datepickerDateFrom = this.#getDatepicker(
      this.element.querySelector(`#event-start-time-${this._state.id}`),
      this._state.dateFrom,
      this.#onChangeDateFrom
    );
    this.#datepickerDateTo = this.#getDatepicker(
      this.element.querySelector(`#event-end-time-${this._state.id}`),
      this._state.dateTo,
      this.#onChangeDateTo
    );
  }

  reset(tripEvent) {
    this.updateElement(EditFormView.parseTripEventToState(tripEvent));
  }

  removeElement() {
    super.removeElement();
    this.#datepickerDateFrom.destroy();
    this.#datepickerDateTo.destroy();
    this.#datepickerDateFrom = null;
    this.#datepickerDateTo = null;
  }
}
