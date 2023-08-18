const offers = {
  taxi: [
    {
      title: 'Add luggage',
      price: 10
    },
  ],
  bus: [
    {
      title: 'Switch to comfort class',
      price: 10
    },
    {
      title: 'Choose seats',
      price: 5
    }
  ],
  train: [
    {
      title: 'Choose seats',
      price: 5
    }
  ],
  ship: [
    {
      title: 'Add luggage',
      price: 10
    },
    {
      title: 'Switch to comfort class',
      price: 10
    },
  ],
  drive: [
    {
      title: 'Add luggage',
      price: 10
    },
  ],
  flight: [
    {
      title: 'Add luggage',
      price: 10
    },
    {
      title: 'Choose seats',
      price: 5
    },
    {
      title: 'Switch to comfort class',
      price: 10
    },
  ],
  checkIn: [
    {
      title: 'Vip service',
      price: 20
    },
  ],
  sightseeing: [
    {
      title: 'Add a tour guide',
      price: 10
    },
  ],
  restaurant: [
    {
      title: 'Add meal',
      price: 15
    },
  ]
};

function getAllOffers() {
  return offers;
}

export {getAllOffers};
