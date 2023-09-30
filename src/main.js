import AppPresenter from './presenter/app-presenter';
import TripEventModel from './model/trip-event-model';
import DestinationModel from './model/destination-model';
import OfferModel from './model/offer-model';
import FilterModel from './model/filter-model';
import SortModel from './model/sort-model';
import PointsApiService from './service/points-api-service';
import DestinationsApiService from './service/destinations-api-service';
import OffersApiService from './service/offers-api-service';
import {AUTHORIZATION, HOST_API} from './const';

const tripEventModel = new TripEventModel({tripEventApiService: new PointsApiService(HOST_API, AUTHORIZATION)});
const destinationModel = new DestinationModel({destinationApiService: new DestinationsApiService(HOST_API, AUTHORIZATION)});
const offerModel = new OfferModel({offerApiService: new OffersApiService(HOST_API, AUTHORIZATION)});
const filterModel = new FilterModel();
const sortModel = new SortModel();
const appPresenter = new AppPresenter({tripEventModel, destinationModel, offerModel, filterModel, sortModel});

appPresenter.init();
tripEventModel.init();
destinationModel.init();
offerModel.init();
