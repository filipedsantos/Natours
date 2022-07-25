const stripe = Stripe(
  'pk_test_51L6XROJFV3DrxMdJQtVD0WatumIkRXYayRAC1RLAa28KVBFoHABQStgc8OCpvau0O8a9SBd4YVrosMcfZ8UGBIV200uUuoPzsj'
);

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2. Create checkout form +
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (error) {
    console.error(error);
  }
};
