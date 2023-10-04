import {remove, render, replace} from '../framework/render';
import {SortName, SortType, UpdateType} from '../const';
import SortView from '../view/sort-view';

const SORTS = [
  {
    id: SortType.DAY,
    name: SortName.DAY,
    isEnabled: true
  },
  {
    id: SortType.EVENT,
    name: SortName.EVENT,
    isEnabled: false
  },
  {
    id: SortType.TIME,
    name: SortName.TIME,
    isEnabled: true
  },
  {
    id: SortType.PRICE,
    name: SortName.PRICE,
    isEnabled: true
  },
  {
    id: SortType.OFFER,
    name: SortName.OFFER,
    isEnabled: false
  }
];

export default class SortsPresenter {
  #container = null;
  #sortModel = null;
  #tripEventModel = null;
  #sortComponent = null;

  constructor({tripEventModel, sortModel, container}) {
    this.#tripEventModel = tripEventModel;
    this.#sortModel = sortModel;
    this.#container = container;

    this.#sortModel.addObserver(this.#handleModelEvent);
    this.#tripEventModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleSortChange = (sortType) => {
    if (this.#sortModel.sort === sortType) {
      return;
    }

    this.#sortModel.setSort(UpdateType.MINOR, sortType);
  };

  get sorts() {
    return SORTS;
  }

  init() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      sorts: this.sorts,
      onSortChange: this.#handleSortChange,
      currentSort: this.#sortModel.sort
    });

    if (prevSortComponent === null) {
      render(this.#sortComponent, this.#container);
      return;
    }

    replace(this.#sortComponent, prevSortComponent);
    remove(prevSortComponent);
  }
}
