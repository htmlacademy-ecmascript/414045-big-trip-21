import {getRandomElementFromArray} from '../utils';

const tripEvents = [
  {
    typeId: 1,
    destinationId: 1,
    date: new Date('2023-09-23'),
    schedule: {
      start: new Date('2023-09-23 21:00'),
      end: new Date('2023-09-23 22:35'),
    },
    price: 120,
    offerIds: [1, 0],
    isFavorite: true
  },
  {
    typeId: 2,
    destinationId: 0,
    date: new Date('2023-09-23'),
    schedule: {
      start: new Date('2023-09-23 21:00'),
      end: new Date('2023-09-23 23:10'),
    },
    price: 180,
    offerIds: [],
    isFavorite: false
  },
  {
    typeId: 5,
    destinationId: 2,
    date: new Date('2023-06-10'),
    schedule: {
      start: new Date('2023-06-10 17:00'),
      end: new Date('2023-06-13 22:00'),
    },
    price: 200,
    offerIds: [],
    isFavorite: true
  },
];

function getRandomTripEvent() {
  return getRandomElementFromArray(tripEvents);
}

export {getRandomTripEvent};
