import {getRandomTripEvent} from '../mock/trip-event';


const TRIP_EVENTS_COUNT = 5;

export default class TripEventsModel {
  getTripEvents() {
    return Array.from({length: TRIP_EVENTS_COUNT}, getRandomTripEvent);
  }
}
