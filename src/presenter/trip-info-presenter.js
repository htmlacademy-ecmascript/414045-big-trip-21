import TripInfoView from '../view/trip-info-view';
import {remove, render, RenderPosition} from '../framework/render';
import {getItinerary, getItineraryDates, getItineraryTotalPrice} from '../utils/trip-event';
import TripEventModel from '../model/trip-event-model';
import OfferModel from '../model/offer-model';
import DestinationModel from '../model/destination-model';
import {UpdateType} from '../const';

export default class TripInfoPresenter {
  #container = document.querySelector('.trip-main');
  #tripEventModel = null;
  #offerModel = null;
  #destinationModel = null;
  #tripInfoComponent = null;
  #isLoading = true;
  #isLoadingTripEvents = true;
  #isLoadingDestinations = true;
  #isLoadingOffers = true;

  constructor({tripEventModel, offerModel, destinationModel}) {
    this.#tripEventModel = tripEventModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;

    this.#tripEventModel.addObserver(this.#handleModelEvent);
    this.#offerModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = (updateType, data) => {
    if (updateType === UpdateType.INIT) {
      this.#updateLoadingStatus(data);
      this.#isLoading = this.#isLoadingTripEvents || this.#isLoadingDestinations || this.#isLoadingOffers;
    }

    this.destroy();
    this.init();
  };

  #updateLoadingStatus = (modelClassName) => {
    switch (modelClassName) {
      case TripEventModel.name:
        this.#isLoadingTripEvents = false;
        break;
      case OfferModel.name:
        this.#isLoadingOffers = false;
        break;
      case DestinationModel.name:
        this.#isLoadingDestinations = false;
        break;
    }
  };

  init() {
    if (this.#isLoading) {
      return;
    }

    const tripEvents = this.#tripEventModel.tripEvents;

    if (tripEvents.length === 0) {
      return;
    }

    const offers = this.#offerModel.offers;
    const destinations = this.#destinationModel.destinations;

    const title = getItinerary(tripEvents, destinations);
    const price = getItineraryTotalPrice(tripEvents, offers);
    const dates = getItineraryDates(tripEvents);

    this.#tripInfoComponent = new TripInfoView({
      title,
      price,
      dates
    });

    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  destroy = () => {
    remove(this.#tripInfoComponent);
  };
}
