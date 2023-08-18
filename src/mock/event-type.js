const eventTypes = [
  {
    name: 'taxi',
    title: 'Taxi',
    iconSrc: '/img/icons/taxi.png',
    price: 10
  },
  {
    name: 'bus',
    title: 'Bus',
    iconSrc: '/img/icons/bus.png',
    price: 20
  },
  {
    name: 'train',
    title: 'Train',
    iconSrc: '/img/icons/train.png',
    price: 30
  },
  {
    name: 'ship',
    title: 'Ship',
    iconSrc: '/img/icons/ship.png',
    price: 45
  },
  {
    name: 'drive',
    title: 'Drive',
    iconSrc: '/img/icons/drive.png',
    price: 35
  },
  {
    name: 'flight',
    title: 'Flight',
    iconSrc: '/img/icons/flight.png',
    price: 100
  },
  {
    name: 'checkIn',
    title: 'Check-in',
    iconSrc: '/img/icons/check-in.png',
    price: 50
  },
  {
    name: 'sightseeing',
    title: 'Sightseeing',
    iconSrc: '/img/icons/sightseeing.png',
    price: 70
  },
  {
    name: 'restaurant',
    title: 'Restaurant',
    iconSrc: '/img/icons/restaurant.png',
    price: 65
  }
];

function getAllEventTypes() {
  return eventTypes;
}

export {getAllEventTypes};
