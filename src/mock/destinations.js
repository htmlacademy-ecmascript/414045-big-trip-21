import {getIdGenerator, getLorem, getRandomElementFromArray, getRandomNumber} from '../utils';
import {DESTINATION_NAMES} from '../const';

const RANDOM_PICTURE_API_URL = 'http://picsum.photos/300/200?r=';

function getDestinations() {
  const destinations = [];
  const idGenerator = getIdGenerator();

  for (let i = 0; i < DESTINATION_NAMES.length; i++) {
    const photoCount = getRandomNumber(0, 5);

    destinations.push({
      id: idGenerator(),
      destinations: getLorem(getRandomNumber(1, 3)),
      name: getRandomElementFromArray(DESTINATION_NAMES),
      pictures: getPictures(photoCount)
    });
  }

  return destinations;
}

function getPictures(count) {
  const pictures = [];

  for (let i = 0; i < count; i++) {
    pictures.push({
      src: RANDOM_PICTURE_API_URL + getRandomNumber(1, 200),
      destination: getLorem(1)
    });
  }

  return pictures;
}

export {getDestinations};
