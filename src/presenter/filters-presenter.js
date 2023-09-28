import {remove, render, replace} from '../framework/render';
import FilterView from '../view/filter-view';
import {FilterType, UpdateType} from '../const';
import {getActiveFilters} from '../utils/trip-event';

export default class FiltersPresenter {
  #container = null;
  #filterModel = null;
  #tripEventModel = null;
  #filterComponent = null;

  constructor({tripEventModel, filterModel, container}) {
    this.#tripEventModel = tripEventModel;
    this.#filterModel = filterModel;
    this.#container = container;

    this.#tripEventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const filters = Object.values(FilterType);
    const activeFilters = getActiveFilters(filters, this.#tripEventModel.tripEvents);
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      activeFilters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
