import {getAllEventTypes} from '../mock/event-type';

export default class EventTypesModel {
  getEventTypes() {
    return getAllEventTypes();
  }
}
