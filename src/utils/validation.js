import dayjs from 'dayjs';

const ERROR_MESSAGE_DESTINATION_NOT_SELECTED = 'Выберите пункт назначения из списка';
const ERROR_MESSAGE_DATE_INVALID = 'Дата начала должна быть раньше даты окончания';
const ERROR_MESSAGE_PRICE_INVALID = 'Введите стоимость';

function destinationValidate(destinationId, destinations) {
  return destinations.some((destination) => destinationId === destination.id);
}

function diffDateValidate(dateFrom, dateTo) {
  return dayjs(dateFrom).isBefore(dateTo);
}

export {
  destinationValidate,
  diffDateValidate,
  ERROR_MESSAGE_DESTINATION_NOT_SELECTED,
  ERROR_MESSAGE_DATE_INVALID,
  ERROR_MESSAGE_PRICE_INVALID
};
