import AbstractView from '../framework/view/abstract-view';

function createTemplate(sortItems, currentSort) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItems.map((sort) => createSortTemplate(sort, currentSort)).join('')}
          </form>`;
}

function createSortTemplate(sort, currentSort) {
  return `<div class="trip-sort__item  trip-sort__item--${sort.name}">
            <input id="${sort.id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sort.id}" ${sort.isEnabled ? '' : 'disabled'} ${sort.id === currentSort ? 'checked' : ''}>
            <label class="trip-sort__btn" for="${sort.id}">${sort.name}</label>
          </div>`;
}

export default class SortView extends AbstractView {
  #sorts = [];
  #onSortChange = null;
  #currentSort = null;

  constructor({sorts, onSortChange, currentSort}) {
    super();
    this.#sorts = sorts;
    this.#onSortChange = onSortChange;
    this.#currentSort = currentSort;

    this.element.addEventListener('change', this.#onSortChangeHandler);
  }

  get template() {
    return createTemplate(this.#sorts, this.#currentSort);
  }

  #onSortChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#onSortChange(evt.target.value);
  };
}
