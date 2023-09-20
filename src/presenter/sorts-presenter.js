import {remove, render, replace} from '../framework/render';
import {SortType, UpdateType} from '../const';
import SortView from '../view/sort-view';

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

  init() {
    const sorts = this.#getSorts();
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      sorts,
      onSortChange: this.#handleSortChange
    });

    if (prevSortComponent === null) {
      render(this.#sortComponent, this.#container);
      return;
    }

    replace(this.#sortComponent, prevSortComponent);
    remove(prevSortComponent);
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

  #getSorts() {
    return [
      {
        name: SortType.DAY,
        isEnabled: true
      },
      {
        name: SortType.EVENT,
        isEnabled: false
      },
      {
        name: SortType.TIME,
        isEnabled: true
      },
      {
        name: SortType.PRICE,
        isEnabled: true
      },
      {
        name: SortType.OFFER,
        isEnabled: false
      }
    ];
  }
}
