import dayjs from 'dayjs';
import {FilterType} from '../const';

function sortByPrice(eventB, eventA) {
  return eventA.basePrice - eventB.basePrice;
}

function sortByTime(eventA, eventB) {
  const eventADuration = getEventDuration(eventA);
  const eventBDuration = getEventDuration(eventB);

  return eventBDuration - eventADuration;
}

function getEventDuration(event) {
  return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
}

function filterTripEvents(filterType, tripEvents) {
  switch (filterType) {
    case FilterType.PAST:
      return getPastTripEvents(tripEvents);
    case FilterType.FUTURE:
      return getFutureTripEvent(tripEvents);
    case FilterType.PRESENT:
      return getPresentTripEvents(tripEvents);
    default:
      return [...tripEvents];
  }
}

function getFutureTripEvent(tripEvents) {
  return tripEvents.filter((tripEvent) => dayjs().isBefore(tripEvent.dateFrom));
}

function getPastTripEvents(tripEvents) {
  return tripEvents.filter((tripEvent) => dayjs().isAfter(tripEvent.dateTo));
}

function getPresentTripEvents(tripEvents) {
  return tripEvents.filter((tripEvent) => dayjs().isAfter(tripEvent.dateFrom) && dayjs().isBefore(tripEvent.dateTo));
}

export {sortByPrice, sortByTime, filterTripEvents};
