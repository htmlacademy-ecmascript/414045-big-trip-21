import {createElement} from '../render.js';
import {getDateWithTime} from '../utils';

const TRIP_EVENT_BLANC = {
  typeId: 0,
  destinationId: null,
  date: new Date(),
  schedule: {
    start: new Date(),
    end: new Date(),
  },
  price: null,
  offerIds: [],
  isFavorite: false
};

function createTemplate(tripEvent, destinations, offers, eventTypes) {
  return (
    `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="${eventTypes[tripEvent.typeId].iconSrc}" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${eventTypes[tripEvent.typeId].title}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripEvent.destinationId ? destinations[tripEvent.destinationId].name : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinations.map((destination) => `<option value="${destination.name}">${destination.name}</option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateWithTime(tripEvent.schedule.start)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateWithTime(tripEvent.schedule.end)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripEvent.price ?? ''}">
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
                        ${createOffersTemplate(tripEvent.typeId, eventTypes, offers, tripEvent.offerIds)}
                    </div>
                  </section>

                  ${tripEvent.destinationId ? `<section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${destinations[tripEvent.destinationId].description}</p>

                        ${destinations[tripEvent.destinationId].photos.length ? createDestinationPhotosTemplate(destinations[tripEvent.destinationId].photos) : ''}

                       </section>` : ''}

                </section>
              </form>`
  );
}

function createOffersTemplate(typeId, eventTypes, offers, eventOfferIds) {
  const typeOffers = offers[eventTypes[typeId].name];

  return typeOffers.map((offer, offerId) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage"
                ${eventOfferIds.includes(offerId) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">${offer.name}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join('');
}

function createDestinationPhotosTemplate(photos) {
  return `<div class="event__photos-container">
            <div class="event__photos-tape">
                ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`)}
            </div>
          </div>`;
}

export default class EditFormView {
  constructor({destinations, offers, eventTypes, tripEvent = TRIP_EVENT_BLANC}) {
    this.tripEvent = tripEvent;
    this.destinations = destinations;
    this.offers = offers;
    this.eventTypes = eventTypes;
  }

  getTemplate() {
    return createTemplate(this.tripEvent, this.destinations, this.offers, this.eventTypes);
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
