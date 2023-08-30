import {getDateWithTime, getEventTypeIconSrc} from '../utils';
import AbstractView from '../framework/view/abstract-view';

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

export default class EditFormView extends AbstractView {
  #tripEvent;
  #destinations;
  #offers;
  #onSubmit;
  #onClickRollupButton;

  constructor({tripEvent, offers, destinations, onSubmit, onClickRollupButton = TRIP_EVENT_DEFAULT}) {
    super();
    this.#tripEvent = tripEvent;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onSubmit = onSubmit;
    this.#onClickRollupButton = onClickRollupButton;

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onClickRollupButtonHandler);
  }

  #createTemplate() {
    const eventDestination = this.#destinations.find((destination) => destination.id === this.#tripEvent.destination);

    return (
      `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${this.#tripEvent.id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="${getEventTypeIconSrc(this.#tripEvent.type)}" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this.#tripEvent.id}" type="checkbox">
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${this.#tripEvent.id}">
                      ${this.#tripEvent.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${this.#tripEvent.destination}" type="text" name="event-destination" value="${this.#tripEvent.destinationId ? this.#destinations[this.#tripEvent.destinationId].name : ''}" list="destination-list-1">
                    <datalist id="destination-list-${this.#tripEvent.id}">
                      ${this.#destinations.map((destination) => `<option value="${destination.name}">${destination.name}</option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${this.#tripEvent.id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${this.#tripEvent.id}" type="text" name="event-start-time" value="${getDateWithTime(this.#tripEvent.dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${this.#tripEvent.id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${this.#tripEvent.id}" type="text" name="event-end-time" value="${getDateWithTime(this.#tripEvent.dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${this.#tripEvent.id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${this.#tripEvent.id}" type="text" name="event-price" value="${this.#tripEvent.price ?? ''}">
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
                        ${this.#createOffersTemplate()}
                    </div>
                  </section>

                  ${this.#tripEvent.destination ? `<section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${eventDestination.name}</p>

                        ${eventDestination.pictures.length ? this.#createDestinationPhotosTemplate(eventDestination.pictures) : ''}

                       </section>` : ''}

                </section>
              </form>`
    );
  }

  #createOffersTemplate() {
    const currentTypeOffers = this.#offers.find((typeOffers) => typeOffers.type === this.#tripEvent.type).offers;
    return currentTypeOffers.map((offer) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${this.#tripEvent.id}" type="checkbox" name="event-offer-luggage"
                ${this.#tripEvent.offers.includes(offer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-luggage-${this.#tripEvent.id}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join('');
  }

  #createDestinationPhotosTemplate(photos) {
    return `<div class="event__photos-container">
            <div class="event__photos-tape">
                ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)}
            </div>
          </div>`;
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmit();
    this.element.removeEventListener('submit', this.#onSubmit);
  };

  #onClickRollupButtonHandler = () => {
    this.#onClickRollupButton();
    this.element.removeEventListener('submit', this.#onSubmit);
  };

  get template() {
    return this.#createTemplate(this.#tripEvent, this.#destinations, this.#offers);
  }
}
