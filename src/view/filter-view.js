import AbstractView from '../framework/view/abstract-view';

function createTemplate(filters, currentFilterType) {
  return `<div class="trip-controls__filters">
            <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">

                ${filters.map((filter) => createFilterTemplate(filter, currentFilterType)).join('')}

                <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
          </div>`;
}

function createFilterTemplate(filter, currentFilterType) {
  return `<div class="trip-filters__filter">
            <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === currentFilterType ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
          </div>`;
}

export default class FilterView extends AbstractView {
  #filters = [];
  #currentFilterType = null;
  #onFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();

    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#onFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onFilterTypeChange(evt.target.value);
  };
}
