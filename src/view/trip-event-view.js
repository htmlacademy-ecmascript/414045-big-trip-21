import AbstractView from '../framework/view/abstract-view';
import he from 'he';
import {getDiffTime, getISODate, getTime, humanizeDate} from '../utils/date';
import {getEventTypeIconSrc} from '../utils/trip-event';

function createTemplate({tripEvent, destination, offers}) {
  return (
    `<li class="trip-events__item">
        <div class="event">
        <time class="event__date" datetime="${he.encode(getISODate(tripEvent.dateFrom))}">${he.encode(humanizeDate(tripEvent.dateFrom))}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${he.encode(getEventTypeIconSrc(tripEvent.type))}" alt="Event type icon">
        </div>
        <h3 class="event__title">${he.encode(tripEvent.type)} ${he.encode(destination.name)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${he.encode(getISODate(tripEvent.dateFrom))}">${he.encode(getTime(tripEvent.dateFrom))}</time>
              &mdash;
            <time class="event__end-time" datetime="${he.encode(getISODate(tripEvent.dateTo))}">${he.encode(getTime(tripEvent.dateTo))}</time>
          </p>
          <p class="event__duration">${he.encode(getDiffTime(tripEvent.dateFrom, tripEvent.dateTo))}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${he.encode(tripEvent.basePrice.toString())}</span>
        </p>

        ${offers}

        <button class="event__favorite-btn ${tripEvent.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
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

function createOffersTemplate({tripEvent, offers}) {
  const eventTypeOffers = offers.find((typeOffers) => typeOffers.type === tripEvent.type).offers;
  const eventOffers = eventTypeOffers.filter((offer) => tripEvent.offers.includes(offer.id));

  return eventOffers.length > 0 ? `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${eventOffers.map((offer) => `<li class="event__offer">
                <span class="event__offer-title">${he.encode(offer.title)}</span> &plus;&euro;&nbsp;
                <span class="event__offer-price">${he.encode(offer.price.toString())}</span>
             </li>`).join('')}
        </ul>` : '';
}

export default class TripEventView extends AbstractView {
  #tripEvent = null;
  #offers = [];
  #destination = null;
  #onClick = null;
  #onClickFavoriteButton = null;

  constructor({tripEvent, offers, destination, onClick, onClickFavoriteButton}) {
    super();
    this.#tripEvent = tripEvent;
    this.#offers = offers;
    this.#destination = destination;
    this.#onClick = onClick;
    this.#onClickFavoriteButton = onClickFavoriteButton;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onClickFavoriteButtonHandler);
  }

  #onClickHandler = () => {
    this.#onClick();
  };

  #onClickFavoriteButtonHandler = () => {
    this.#onClickFavoriteButton();
  };

  get template() {
    const offerItems = createOffersTemplate({tripEvent: this.#tripEvent, offers: this.#offers});

    return createTemplate({tripEvent: this.#tripEvent, destination: this.#destination, offers: offerItems});
  }
}
