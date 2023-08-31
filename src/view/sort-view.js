import AbstractView from '../framework/view/abstract-view';
import {DEFAULT_SORT_ACTIVE} from '../const';

export default class SortView extends AbstractView {
  #sorts;

  constructor({sorts}) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${this.#getSortItems()}
      </form>`
    );
  }

  #getSortItems = () => this.#sorts.map((sort) => this.#createSortTemplate(sort)).join('');

  #createSortTemplate(sort) {
    return `<div class="trip-sort__item  trip-sort__item--${sort.name}">
              <input id="sort-${sort.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort.name}" ${sort.isEnabled ? '' : 'disabled'} ${sort.name === DEFAULT_SORT_ACTIVE ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-${sort.name}">${sort.name}</label>
            </div>`;
  }
}
