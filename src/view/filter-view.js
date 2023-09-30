import AbstractView from '../framework/view/abstract-view';

function createTemplate(filters, activeFilters, currentFilterType) {
  return `<div class="trip-controls__filters">
            <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">

                ${filters.map((filter) => createFilterTemplate(filter, activeFilters, currentFilterType)).join('')}

                <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
          </div>`;
}

function createFilterTemplate(filter, activeFilters, currentFilterType) {
  const isDisabled = !activeFilters.includes(filter);
  const isChecked = filter === currentFilterType;

  return `<div class="trip-filters__filter">
            <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
          </div>`;
}

export default class FilterView extends AbstractView {
  #filters = [];
  #activeFilters = [];
  #currentFilterType = null;
  #onFilterTypeChange = null;

  constructor({filters, activeFilters, currentFilterType, onFilterTypeChange}) {
    super();

    this.#filters = filters;
    this.#activeFilters = activeFilters;
    this.#currentFilterType = currentFilterType;
    this.#onFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTemplate(this.#filters, this.#activeFilters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onFilterTypeChange(evt.target.value);
  };
}
