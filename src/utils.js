import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {MILLISECOND_IN_DAY} from './const';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH-mm';
const DATE_WITH_TIME_FORMAT = 'DD/MM/YY HH:mm';

const LOREM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. ' +
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ' +
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ' +
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. ' +
  'In rutrum ac purus sit amet tempus.';

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
  const durationTime = dayjs.duration(dateEnd.diff(dateStart));

  let format = '';

  if (diff >= MILLISECOND_IN_DAY) {
    format = 'D[D]';
  }

  if (durationTime.hours()) {
    format += format.length !== 0 ? ' H[H]' : 'H[H]';
  }

  if (durationTime.minutes()) {
    format += format.length !== 0 ? ' m[M]' : 'm[M]';
  }

  return format.length !== 0 ? durationTime.format(format) : '';
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getIdGenerator() {
  let currentId = 0;

  return function () {
    currentId++;

    return currentId;
  };
}

function getLorem(countSentences) {
  const sentences = LOREM_TEXT.split('.');
  let newLorem = '';

  for (let i = 0; i < countSentences; i++) {
    newLorem += i === 0 ? `${getRandomElementFromArray(sentences)}.` : ` ${getRandomElementFromArray(sentences)}.`;
  }

  return newLorem;
}

function getEventTypeIconSrc(type) {
  return `/img/icons/${type}.png`;
}

export {
  getRandomElementFromArray,
  humanizeDate,
  getTime,
  getDiffTime,
  getDateWithTime,
  getRandomDate,
  getRandomNumber,
  getIdGenerator,
  getLorem,
  getEventTypeIconSrc
};
