import {getIdGenerator, getRandomDate, getRandomElementFromArray, getRandomNumber} from '../utils/common';
import {
  COUNT_OFFERS_IN_EVENT_TYPE,
  DESTINATION_NAMES,
  EVENT_TYPES,
  MILLISECOND_IN_MINUTE, MINUTES_IN_DAY
} from '../const';

const MIN_BASE_PRICE = 50;
const MAX_BASE_PRICE = 2000;

function getTripEvents(count) {
  const idGenerator = getIdGenerator();
  const tripEvents = [];

  for (let i = 0; i < count; i++) {
    const dateFrom = getRandomDate(new Date(2023, 1, 1,), new Date());

    tripEvents.push({
      id: idGenerator(),
      basePrice: getRandomNumber(MIN_BASE_PRICE, MAX_BASE_PRICE),
      dateFrom: dateFrom,
      dateTo: new Date(dateFrom.getTime() + (getRandomNumber(15, 3 * MINUTES_IN_DAY) * MILLISECOND_IN_MINUTE)),
      destination: getRandomNumber(1, DESTINATION_NAMES.length),
      isFavorite: getRandomBool(),
      offers: getEventOffers(),
      type: getRandomElementFromArray(EVENT_TYPES)
    });
  }

  return tripEvents;
}

function getEventOffers() {
  const offerCount = getRandomNumber(0, 4);
  const resultOffers = [];

  for (let i = 0; i < offerCount; i++) {
    resultOffers.push(getRandomNumber(1, COUNT_OFFERS_IN_EVENT_TYPE));
  }

  return resultOffers;
}

function getRandomBool() {
  return Math.random() < 0.5;
}

export {getTripEvents};
