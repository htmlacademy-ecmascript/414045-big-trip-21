import Observable from '../framework/observable';
import {updateItem} from '../utils/common';
import {UpdateType} from '../const';

export default class TripEventModel extends Observable {
  #tripEvents = [];
  #tripEventApiService = null;

  constructor({tripEventApiService}) {
    super();

    this.#tripEventApiService = tripEventApiService;
  }

  #adaptToClient(tripEvent) {
    return {
      id: tripEvent['id'],
      type: tripEvent['type'],
      basePrice: tripEvent['base_price'],
      dateFrom: tripEvent['date_from'] ? new Date(tripEvent['date_from']) : tripEvent['date_from'],
      dateTo: tripEvent['date_to'] ? new Date(tripEvent['date_to']) : tripEvent['date_to'],
      destination: tripEvent['destination'],
      isFavorite: tripEvent['is_favorite'],
      offers: tripEvent['offers']
    };
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  async init() {
    try {
      const tripEvents = await this.#tripEventApiService.tripEvents;
      this.#tripEvents = tripEvents.map(this.#adaptToClient);
    } catch {
      this.#tripEvents = [];
    }

    this._notify(UpdateType.INIT, TripEventModel.name);
  }

  async addTripEvent(updateType, tripEvent) {
    try {
      const response = await this.#tripEventApiService.addTripEvent(tripEvent);

      this.#tripEvents = [
        this.#adaptToClient(response),
        ...this.#tripEvents
      ];

      this._notify(updateType, tripEvent);
    } catch {
      throw new Error('Can\'t add trip event');
    }
  }

  async updateTripEvent(updateType, tripEvent) {
    try {
      const response = await this.#tripEventApiService.updateTripEvent(tripEvent);
      const updatedTripEvent = this.#adaptToClient(response);
      this.#tripEvents = updateItem(this.#tripEvents, updatedTripEvent);
      this._notify(updateType, updatedTripEvent);
    } catch {
      throw new Error('Can\'t update trip event');
    }
  }

  async deleteTripEvent(updateType, deleteTripEvent) {
    try {
      await this.#tripEventApiService.deleteTripEvent(deleteTripEvent.id);
      this.#tripEvents = this.#tripEvents.filter((tripEvent) => tripEvent.id !== deleteTripEvent.id);
      this._notify(updateType);
    } catch {
      throw new Error('Can\'t delete trip event');
    }
  }
}
