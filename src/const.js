const COUNT_OFFERS_IN_EVENT_TYPE = 5;

const MINUTES_IN_DAY = 1440;
const MILLISECOND_IN_MINUTE = 60000;
const MILLISECOND_IN_HOUR = MILLISECOND_IN_MINUTE * 60;
const MILLISECOND_IN_DAY = MILLISECOND_IN_HOUR * 24;

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

const FILTERS = [
  'everything',
  'future',
  'present',
  'past'
];

const DEFAULT_FILTER_ACTIVE = 'past';

const DEFAULT_SORT_ACTIVE = 'day';

const SortType = {
  DEFAULT: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price'
};

export {
  COUNT_OFFERS_IN_EVENT_TYPE,
  EVENT_TYPES,
  DESTINATION_NAMES,
  MILLISECOND_IN_DAY,
  MILLISECOND_IN_HOUR,
  MILLISECOND_IN_MINUTE,
  MINUTES_IN_DAY,
  DEFAULT_SORT_ACTIVE,
  FILTERS,
  DEFAULT_FILTER_ACTIVE,
  SortType
};