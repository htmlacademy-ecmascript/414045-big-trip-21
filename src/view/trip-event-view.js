import {getDiffTime, getEventTypeIconSrc, getTime, humanizeDate} from '../utils';
import AbstractView from '../framework/view/abstract-view';

export default class TripEventView extends AbstractView {
  #tripEvent;
  #offers;
  #destination;
  #onClick;

  constructor({tripEvent, offers, destination, onClick}) {
    super();
    this.#tripEvent = tripEvent;
    this.#offers = offers;
    this.#destination = destination;
    this.#onClick = onClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onClickHandler);
  }

  #createOffersTemplate() {
    const eventTypeOffers = this.#offers.find((typeOffers) => typeOffers.type === this.#tripEvent.type).offers;
    const eventOffers = eventTypeOffers.filter((offer) => this.#tripEvent.offers.includes(offer.id));

    return eventOffers.length ? `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${eventOffers.map((offer) => `<li class="event__offer">
                <span class="event__offer-title">${offer.title}</span> &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
             </li>`).join('')}
        </ul>` : '';
  }

  #createTemplate() {
    return (
      `<li class="trip-events__item">
        <div class="event">
        <time class="event__date" datetime="2019-03-18">${humanizeDate(this.#tripEvent.dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${getEventTypeIconSrc(this.#tripEvent.type)}" alt="Event type icon">
        </div>
        <h3 class="event__title">${this.#destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getTime(this.#tripEvent.dateFrom)}</time>
              &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${getTime(this.#tripEvent.dateTo)}</time>
          </p>
          <p class="event__duration">${getDiffTime(this.#tripEvent.dateFrom, this.#tripEvent.dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this.#tripEvent.basePrice}</span>
        </p>

        ${this.#createOffersTemplate()}

        <button class="event__favorite-btn ${this.#tripEvent.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
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

  #onClickHandler = () => {
    this.#onClick();
  };

  get template() {
    return this.#createTemplate();
  }
}
