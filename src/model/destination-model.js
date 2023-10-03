import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class DestinationModel extends Observable {
  #destinations = [];
  #destinationApiService = null;

  constructor({destinationApiService}) {
    super();
    this.#destinationApiService = destinationApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationApiService.destinations;
    } catch {
      this.#destinations = [];
      this._notify(UpdateType.LOADING_ERROR);
    }

    this._notify(UpdateType.INIT, DestinationModel.name);
  }
}
