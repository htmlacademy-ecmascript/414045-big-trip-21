import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH-mm';
const DATE_WITH_TIME_FORMAT = 'DD/MM/YY HH:mm';

const MILLISECOND_IN_DAY = 86400000;
const MILLISECOND_IN_HOUR = 3600000;
const MILLISECOND_IN_MINUTE = 60000;

dayjs.extend(duration);

function getRandomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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

  if (diff >= MILLISECOND_IN_DAY) {
    return dayjs.duration(dateEnd.diff(dateStart)).format('D[D] H[H] m[M]');
  }

  if (diff >= MILLISECOND_IN_HOUR) {
    return dayjs.duration(dateEnd.diff(dateStart)).format('H[H] m[M]');
  }

  if (diff >= MILLISECOND_IN_MINUTE) {
    return dayjs.duration(dateEnd.diff(dateStart)).format('m[M]');
  }
  return '';
}

export {getRandomElementFromArray, humanizeDate, getTime, getDiffTime, getDateWithTime};
