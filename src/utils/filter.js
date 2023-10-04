import {FilterType} from '../const';
import dayjs from 'dayjs';

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

function getActiveFilters(filters, tripEvents) {
  const activeFilters = [];

  filters.forEach((filter) => {
    if (filterTripEvents(filter, tripEvents).length > 0) {
      activeFilters.push(filter);
    }
  });

  return activeFilters;
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

export {getActiveFilters, filterTripEvents};
