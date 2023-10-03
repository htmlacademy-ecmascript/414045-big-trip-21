const MILLISECOND_IN_MINUTE = 60000;
const MILLISECOND_IN_HOUR = MILLISECOND_IN_MINUTE * 60;
const MILLISECOND_IN_DAY = MILLISECOND_IN_HOUR * 24;

const AUTHORIZATION = 'Basic hf92hf92yh498hr89h';
const HOST_API = 'https://21.objects.pages.academy/big-trip';

const SortName = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const SortType = {
  DAY: `sort-${SortName.DAY}`,
  EVENT: `sort-${SortName.EVENT}`,
  TIME: `sort-${SortName.TIME}`,
  PRICE: `sort-${SortName.PRICE}`,
  OFFER: `sort-${SortName.OFFER}`,
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
  INIT: 'INIT',
  LOADING_ERROR: 'LOADING_ERROR'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export {
  AUTHORIZATION,
  HOST_API,
  MILLISECOND_IN_DAY,
  MILLISECOND_IN_HOUR,
  MILLISECOND_IN_MINUTE,
  HttpMethod,
  SortName,
  SortType,
  TripEventUserAction,
  UpdateType,
  FilterType
};
