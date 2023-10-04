import dayjs from 'dayjs';
import {sortByDate} from './sort';

const MAX_TRIP_EVENT_COUNT_IN_TITLE = 3;

function getItinerary(tripEvents, destinations) {
  if (tripEvents.length === 0 || destinations.length === 0) {
    return '';
  }

  const tripEventsSortedByDate = [...tripEvents].sort(sortByDate);
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

  const tripEventsSortedByDate = [...tripEvents].sort(sortByDate);
  const startDate = dayjs(tripEventsSortedByDate[0].dateFrom).format('DD MMM');
  const endDate = dayjs(tripEventsSortedByDate[tripEventsSortedByDate.length - 1].dateTo).format('DD MMM');

  return `${startDate} — ${endDate}`;
}

function getEventTypeIconSrc(type) {
  return `/img/icons/${type}.png`;
}

function updateItem(items, updatedItem) {
  return items.map((item) => item.id === updatedItem.id ? updatedItem : item);
}

export {
  getItinerary,
  getItineraryTotalPrice,
  getItineraryDates,
  getEventTypeIconSrc,
  updateItem
};
