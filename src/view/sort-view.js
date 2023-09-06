import AbstractView from '../framework/view/abstract-view';
import {DEFAULT_SORT_ACTIVE} from '../const';

function createTemplate(sortItems) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItems}
          </form>`;
}

function createSortTemplate(sort) {
  return `<div class="trip-sort__item  trip-sort__item--${sort.name}">
            <input id="sort-${sort.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort.name}" ${sort.isEnabled ? '' : 'disabled'} ${sort.name === DEFAULT_SORT_ACTIVE ? 'checked' : ''}>
            <label class="trip-sort__btn" for="sort-${sort.name}">${sort.name}</label>
          </div>`;
}

export default class SortView extends AbstractView {
  #sorts = [];
  #onSortChange = null;

  constructor({sorts, onSortChange}) {
    super();
    this.#sorts = sorts;
    this.#onSortChange = onSortChange;

    this.element.addEventListener('click', this.#onSortChangeHandler);
  }

  get template() {
    return createTemplate(this.#getSortItems());
  }

  #getSortItems = () => this.#sorts.map((sort) => createSortTemplate(sort)).join('');

  #onSortChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#onSortChange(evt.target.value);
  };
}
