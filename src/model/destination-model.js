import {getDestinations} from '../mock/destinations';
import Observable from '../framework/observable';

export default class DestinationModel extends Observable {
  #destinations = [];

  constructor() {
    super();
    this.#destinations = getDestinations();
  }

  get destinations() {
    return this.#destinations;
  }
}
