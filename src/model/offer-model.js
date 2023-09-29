import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class OfferModel extends Observable {
  #offers = [];
  #offerApiService = null;

  constructor({offerApiService}) {
    super();
    this.#offerApiService = offerApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#offerApiService.offers;
    } catch (error) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT, OfferModel.name);
  }
}
