import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';
import ReviewForm from './ReviewForm';
import Reviews from './Reviews';

import {
  loadRestaurant,
  changeReviewField,
  sendReview,
} from './actions';

import { get } from './utils';

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  const restaurant = useSelector(get('restaurant'));
  const accessToken = useSelector(get('accessToken'));

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  if (!restaurant) {
    return (
      <p>Loading...</p>
    );
  }

  function handleChange({ name, value }) {
    dispatch(changeReviewField({ name, value }));
  }

  function handleSubmit() {
    dispatch(sendReview({ restaurantId }));
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      {accessToken && (
        <ReviewForm
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
      <Reviews reviews={restaurant.reviews} />
    </>
  );
}
