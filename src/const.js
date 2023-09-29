const COUNT_OFFERS_IN_EVENT_TYPE = 5;

const MINUTES_IN_DAY = 1440;
const MILLISECOND_IN_MINUTE = 60000;
const MILLISECOND_IN_HOUR = MILLISECOND_IN_MINUTE * 60;
const MILLISECOND_IN_DAY = MILLISECOND_IN_HOUR * 24;

const AUTHORIZATION = 'Basic hf92hf92yh498hr89h';
const HOST_API = 'https://21.objects.pages.academy/big-trip';

const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const DESTINATION_NAMES = [
  'Geneva',
  'Chamonix',
  'Paris',
  'Milano'
];

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const TripEventUserAction = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export {
  AUTHORIZATION,
  HOST_API,
  COUNT_OFFERS_IN_EVENT_TYPE,
  EVENT_TYPES,
  DESTINATION_NAMES,
  MILLISECOND_IN_DAY,
  MILLISECOND_IN_HOUR,
  MILLISECOND_IN_MINUTE,
  MINUTES_IN_DAY,
  HTTP_METHOD,
  SortType,
  TripEventUserAction,
  UpdateType,
  FilterType
};
