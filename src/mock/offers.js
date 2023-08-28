import {getIdGenerator, getRandomElementFromArray, getRandomNumber} from '../utils';
import {COUNT_OFFERS_IN_EVENT_TYPE, EVENT_TYPES} from '../const';

const TITLES = [
  'Upgrade to a business class',
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city'
];

const MIN_OFFER_PRICE = 10;
const MAX_OFFER_PRICE = 200;

const idGenerator = getIdGenerator();

function getOffers() {
  const offers = [];

  EVENT_TYPES.map((type) => {
    const offersByType = [];

    for (let j = 0; j < COUNT_OFFERS_IN_EVENT_TYPE; j++) {
      offersByType.push(getOffer());
    }

    offers.push({
      type: type,
      offers: offersByType
    });
  });

  return offers;
}

function getOffer() {
  return {
    id: idGenerator(),
    title: getRandomElementFromArray(TITLES),
    price: getRandomNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
  };
}

export {getOffers};
