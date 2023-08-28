import {createElement} from '../render.js';
import {getDateWithTime, getEventTypeIconSrc} from '../utils';

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
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${tripEvent.id}">
                      ${tripEvent.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${tripEvent.destination}" type="text" name="event-destination" value="${tripEvent.destinationId ? destinations[tripEvent.destinationId].name : ''}" list="destination-list-1">
                    <datalist id="destination-list-${tripEvent.id}">
                      ${destinations.map((destination) => `<option value="${destination.name}">${destination.name}</option>`).join('')}
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
                    <input class="event__input  event__input--price" id="event-price-${tripEvent.id}" type="text" name="event-price" value="${tripEvent.price ?? ''}">
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
                        ${createOffersTemplate(tripEvent, offers, tripEvent.offerIds)}
                    </div>
                  </section>

                  ${tripEvent.destination ? `<section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${eventDestination.name}</p>

                        ${eventDestination.pictures.length ? createDestinationPhotosTemplate(eventDestination.pictures) : ''}

                       </section>` : ''}

                </section>
              </form>`
  );
}

function createOffersTemplate(tripEvent, offers) {
  const currentTypeOffers = offers.find((typeOffers) => typeOffers.type === tripEvent.type).offers;
  return currentTypeOffers.map((offer) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${tripEvent.id}" type="checkbox" name="event-offer-luggage"
                ${tripEvent.offers.includes(offer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-luggage-${tripEvent.id}">
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

export default class EditFormView {
  constructor({destinations, offers, tripEvent = TRIP_EVENT_DEFAULT}) {
    this.tripEvent = tripEvent;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createTemplate(this.tripEvent, this.destinations, this.offers);
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
