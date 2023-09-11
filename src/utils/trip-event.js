import dayjs from 'dayjs';

function sortByPrice(eventB, eventA) {
  return eventA.basePrice - eventB.basePrice;
}

function sortByTime(eventA, eventB) {
  const eventADuration = getEventDuration(eventA);
  const eventBDuration = getEventDuration(eventB);

  return eventBDuration - eventADuration;
}

function getEventDuration(event) {
  return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
}

export {sortByPrice, sortByTime};
