import {createElement} from '../render.js';
import {getDiffTime, getTime, humanizeDate} from '../utils';

function createTemplate(tripEvent, offers, eventType, destination) {
  const {date, schedule, price, isFavorite} = tripEvent;

  return (
    `<li class="trip-events__item">
        <div class="event">
        <time class="event__date" datetime="2019-03-18">${humanizeDate(date)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${eventType.iconSrc}" alt="Event type icon">
        </div>
        <h3 class="event__title">${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getTime(schedule.start)}</time>
              &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${getTime(schedule.end)}</time>
          </p>
          <p class="event__duration">${getDiffTime(schedule.start, schedule.end)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        ${createOffersTemplate(offers)}

        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

function createOffersTemplate (offers) {
  return offers.length ? `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((offer) => `<li class="event__offer">
                <span class="event__offer-title">${offer.title}</span> &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
             </li>`).join('')}
        </ul>` : '';
}

export default class TripEventView {
  constructor({tripEvent, offers, eventType, destination}) {
    this.tripEvent = tripEvent;
    this.offers = offers;
    this.eventType = eventType;
    this.destination = destination;
  }

  getTemplate() {
    return createTemplate(this.tripEvent, this.offers, this.eventType, this.destination);
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
