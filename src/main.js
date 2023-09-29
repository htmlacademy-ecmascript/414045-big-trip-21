import AppPresenter from './presenter/app-presenter';
import TripEventModel from './model/trip-event-model';
import DestinationModel from './model/destination-model';
import OfferModel from './model/offer-model';
import FilterModel from './model/filter-model';
import SortModel from './model/sort-model';
import TripEventApiService from './service/trip-event-api-service';
import DestinationApiService from './service/destination-api-service';
import OfferApiService from './service/offer-api-service';
import {AUTHORIZATION, HOST_API} from './const';

const tripEventModel = new TripEventModel({tripEventApiService: new TripEventApiService(HOST_API, AUTHORIZATION)});
const destinationModel = new DestinationModel({destinationApiService: new DestinationApiService(HOST_API, AUTHORIZATION)});
const offerModel = new OfferModel({offerApiService: new OfferApiService(HOST_API, AUTHORIZATION)});
const filterModel = new FilterModel();
const sortModel = new SortModel();
const appPresenter = new AppPresenter({tripEventModel, destinationModel, offerModel, filterModel, sortModel});

appPresenter.init();
tripEventModel.init();
destinationModel.init();
offerModel.init();
