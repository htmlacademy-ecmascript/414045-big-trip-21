import Observable from '../framework/observable';
import {SortType} from '../const';

export default class SortModel extends Observable {
  #sort = SortType.DAY;

  get sort() {
    return this.#sort;
  }

  setSort(updateType, sort) {
    this.#sort = sort;
    this._notify(updateType, sort);
  }
}
