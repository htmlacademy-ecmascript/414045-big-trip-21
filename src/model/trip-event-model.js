import {getTripEvents} from '../mock/trip-events';
import Observable from '../framework/observable';
import {updateItem} from '../utils/common';


const TRIP_EVENTS_COUNT = 5;

export default class TripEventModel extends Observable {
  #tripEvents = [];

  constructor() {
    super();

    this.#tripEvents = getTripEvents(TRIP_EVENTS_COUNT);
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  addTripEvent(updateType, tripEvent) {
    tripEvent.id = this.#tripEvents.length + 1;

    this.#tripEvents = [
      tripEvent,
      ...this.#tripEvents
    ];

    this._notify(updateType, tripEvent);
  }

  updateTripEvent(updateType, tripEvent) {
    this.#tripEvents = updateItem(this.#tripEvents, tripEvent);
    this._notify(updateType, tripEvent);
  }

  deleteTripEvent(updateType, tripEventId) {
    this.#tripEvents = this.#tripEvents.filter((tripEvent) => tripEvent.id !== tripEventId);
    this._notify(updateType);
  }
}
