import AppPresenter from './presenter/app-presenter';
import TripEventsModel from './model/trip-events-model';
import DestinationsModel from './model/destinations-model';
import EventTypesModel from './model/event-types-model';
import OffersModel from './model/offers-model';

const tripEventModel = new TripEventsModel();
const destinationsModel = new DestinationsModel();
const eventTypesModel = new EventTypesModel();
const offersModel = new OffersModel();
const appPresenter = new AppPresenter({tripEventModel, destinationsModel, eventTypesModel, offersModel});

appPresenter.init();
