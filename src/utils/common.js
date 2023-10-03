import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {MILLISECOND_IN_DAY} from '../const';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_WITH_TIME_FORMAT = 'DD/MM/YY HH:mm';

dayjs.extend(duration);

function humanizeDate(date) {
  return getDateByFormat(date, DATE_FORMAT);
}

function getTime(date) {
  return getDateByFormat(date, TIME_FORMAT);
}

function getDateWithTime(date) {
  return getDateByFormat(date, DATE_WITH_TIME_FORMAT);
}

function getDateByFormat(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDiffTime(dateStart, dateEnd) {
  if (!dateStart || !dateEnd) {
    return '';
  }

  dateStart = dayjs(dateStart);
  dateEnd = dayjs(dateEnd);
  const diff = dateEnd.diff(dateStart);
  const durationTime = dayjs.duration(dateEnd.diff(dateStart));

  let format = '';

  if (diff >= MILLISECOND_IN_DAY) {
    format = 'DD[D] ';
  }

  if (durationTime.hours() || diff >= MILLISECOND_IN_DAY) {
    format += 'HH[H] ';
  }

  format += 'mm[M]';

  return durationTime.format(format);
}

function getEventTypeIconSrc(type) {
  return `/img/icons/${type}.png`;
}

function updateItem(items, updatedItem) {
  return items.map((item) => item.id === updatedItem.id ? updatedItem : item);
}

export {
  humanizeDate,
  getTime,
  getDiffTime,
  getDateWithTime,
  getEventTypeIconSrc,
  updateItem
};
