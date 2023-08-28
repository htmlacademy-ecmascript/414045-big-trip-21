import {getTripEvents} from '../mock/trip-events';


const TRIP_EVENTS_COUNT = 5;

export default class TripEventsModel {
  getTripEvents() {
    return getTripEvents(TRIP_EVENTS_COUNT);
  }
}
