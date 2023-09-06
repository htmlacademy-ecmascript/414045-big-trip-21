import AppPresenter from './presenter/app-presenter';
import TripEventModel from './model/trip-event-model';
import DestinationModel from './model/destination-model';
import OfferModel from './model/offer-model';
import {getSorts} from './mock/sorts';

const tripEventModel = new TripEventModel();
const destinationModel = new DestinationModel();
const offerModel = new OfferModel();
const sorts = getSorts();
const appPresenter = new AppPresenter({tripEventModel, destinationModel, offerModel, sorts});

appPresenter.init();
