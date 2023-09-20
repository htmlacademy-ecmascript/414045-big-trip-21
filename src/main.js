import AppPresenter from './presenter/app-presenter';
import TripEventModel from './model/trip-event-model';
import DestinationModel from './model/destination-model';
import OfferModel from './model/offer-model';
import FilterModel from './model/filter-model';
import SortModel from './model/sort-model';

const tripEventModel = new TripEventModel();
const destinationModel = new DestinationModel();
const offerModel = new OfferModel();
const filterModel = new FilterModel();
const sortModel = new SortModel();
const appPresenter = new AppPresenter({tripEventModel, destinationModel, offerModel, filterModel, sortModel});

appPresenter.init();
