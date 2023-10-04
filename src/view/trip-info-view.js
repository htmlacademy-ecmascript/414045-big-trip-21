import AbstractView from '../framework/view/abstract-view';

function createTemplate(title, price, dates) {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${title}</h1>
              <p class="trip-info__dates">${dates}</p>
            </div>
            <p class="trip-info__cost">Total: &euro;&nbsp<span class="trip-info__cost-value">${price}</span></p>
          </section>`;
}

export default class TripInfoView extends AbstractView {
  #title = null;
  #price = null;
  #dates = null;

  constructor({title, price, dates}) {
    super();

    this.#title = title;
    this.#price = price;
    this.#dates = dates;
  }

  get template() {
    return createTemplate(this.#title, this.#price, this.#dates);
  }
}
