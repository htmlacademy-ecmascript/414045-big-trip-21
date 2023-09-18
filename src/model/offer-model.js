import {getOffers} from '../mock/offers';
import Observable from '../framework/observable';

export default class OfferModel extends Observable {
  #offers = [];

  constructor() {
    super();
    this.#offers = getOffers();
  }

  get offers() {
    return this.#offers;
  }
}
