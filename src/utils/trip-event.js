import dayjs from 'dayjs';
import {FilterType} from '../const';

const MAX_TRIP_EVENT_COUNT_IN_TITLE = 3;

function sortByPrice(eventB, eventA) {
  return eventA.basePrice - eventB.basePrice;
}

function sortByTime(eventA, eventB) {
  const eventADuration = getEventDuration(eventA);
  const eventBDuration = getEventDuration(eventB);

  return eventBDuration - eventADuration;
}

function sortByDate(eventA, eventB) {
  return dayjs(eventA.dateFrom).isAfter(eventB.dateFrom);
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

function getItinerary(tripEvents, destinations) {
  if (tripEvents.length === 0 || destinations.length === 0) {
    return '';
  }

  const tripEventsSortedByDate = [...tripEvents].sort(sortByPrice);
  const startDestination = destinations.find((destination) => destination.id === tripEventsSortedByDate[0].destination);
  const endDestination = destinations.find((destination) => destination.id === tripEventsSortedByDate[tripEventsSortedByDate.length - 1].destination);

  let itinerary;

  if (tripEvents.length > MAX_TRIP_EVENT_COUNT_IN_TITLE) {
    itinerary = `${startDestination.name} — ... — ${endDestination.name}`;
  }

  if (tripEvents.length <= MAX_TRIP_EVENT_COUNT_IN_TITLE) {
    const destinationNames = [];

    tripEventsSortedByDate.forEach((tripEvent) => {
      destinationNames.push(destinations.find((destination) => destination.id === tripEvent.destination).name);
    });

    itinerary = destinationNames.join(' — ');
  }

  return itinerary;
}

function getItineraryTotalPrice(tripEvents, offers) {
  return tripEvents.reduce((totalPrice, tripEvent) => {
    totalPrice += tripEvent.basePrice;

    const offersByTripEventType = offers.find((offerItems) => offerItems.type === tripEvent.type);

    offersByTripEventType.offers.forEach((offer) => {
      if (tripEvent.offers.includes(offer.id)) {
        totalPrice += offer.price;
      }
    });

    return totalPrice;
  }, 0);
}

function getItineraryDates(tripEvents) {
  if (tripEvents.length === 0) {
    return '';
  }

  const tripEventsSortedByDate = [...tripEvents].sort(sortByPrice);
  const startDate = dayjs(tripEventsSortedByDate[0].dateFrom).format('MMM DD');
  const endDate = dayjs(tripEventsSortedByDate[tripEventsSortedByDate.length - 1].dateTo).format('MMM DD');

  return `${startDate} — ${endDate}`;
}

export {
  sortByPrice,
  sortByDate,
  sortByTime,
  filterTripEvents,
  getActiveFilters,
  getItinerary,
  getItineraryTotalPrice,
  getItineraryDates
};
