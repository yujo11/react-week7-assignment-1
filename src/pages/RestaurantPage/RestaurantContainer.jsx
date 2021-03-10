import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

import {
  loadRestaurant,
  updateReview,
} from '../../actions';

import { get } from '../../utils';

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const restaurant = useSelector(get('restaurant'));
  const review = useSelector(get('review'));

  if (!restaurant) {
    return (
      <p>Loading...</p>
    );
  }

  function handleChange(event) {
    const { target: { name, value } } = event;
    dispatch(updateReview(name, value));
  }

  function handleSubmit() {
    dispatch();
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      <ReviewForm
        review={review}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <ReviewList reviews={restaurant.reviews} />
    </>
  );
}
