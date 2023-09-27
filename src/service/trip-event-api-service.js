import ApiService from '../framework/api-service';
import {HTTP_METHOD} from '../const';

export default class TripEventApiService extends ApiService {
  get tripEvents() {
    return this._load({
      url: 'points'
    }).then(ApiService.parseResponse);
  }

  async updateTripEvent(tripEvent) {
    const response = await this._load({
      url: `points/${tripEvent.id}`,
      method: HTTP_METHOD.PUT,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  async addTripEvent(tripEvent) {
    const response = await this._load({
      url: 'points',
      method: HTTP_METHOD.POST,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  async deleteTripEvent(tripEventId) {
    return await this._load({
      url: `points/${tripEventId}`,
      method: HTTP_METHOD.DELETE
    });
  }

  #adaptToServer(tripEvent) {
    return {
      id: tripEvent.id,
      type: tripEvent.type,
      'base_price': tripEvent.basePrice,
      'date_from': tripEvent.dateFrom instanceof Date ? tripEvent.dateFrom.toISOString() : null,
      'date_to': tripEvent.dateTo instanceof Date ? tripEvent.dateTo.toISOString() : null,
      destination: tripEvent.destination,
      'is_favorite': tripEvent.isFavorite,
      offers: tripEvent.offers
    };
  }
}
