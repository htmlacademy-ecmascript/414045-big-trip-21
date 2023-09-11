import AbstractView from '../framework/view/abstract-view';
import {DEFAULT_FILTER_ACTIVE, FILTERS} from '../const';

function createTemplate(filterItems) {
  return `<div class="trip-controls__filters">
            <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
                ${filterItems}
                <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
          </div>`;
}

function createFilterTemplate(filter) {
  return `<div class="trip-filters__filter">
            <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === DEFAULT_FILTER_ACTIVE ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
          </div>`;
}

export default class FilterView extends AbstractView {
  get template() {
    return createTemplate(this.#getFilterItems());
  }

  #getFilterItems() {
    return FILTERS.map((filter) => createFilterTemplate(filter)).join('');
  }
}
