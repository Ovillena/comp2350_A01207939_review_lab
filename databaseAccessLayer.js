const database = include("/databaseConnection");

const passwordPepper = "SeCretPeppa4MySal+";

function getAllRestaurants(callback) {
  let sqlQuery = "select restaurant_id, name, description from restaurant;";
  database.query(sqlQuery, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function addRestaurant(postData, callback) {
  let sqlInsert =
    "INSERT INTO restaurant (name, description) VALUES (:name, :description);";
  let params = {
    name: postData.name,
    description: postData.description,
  };
  console.log(sqlInsert);
  database.query(sqlInsert, params, (err, results, fields) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function deleteAllReviews(restaurantId, callback) {
  let sqlDeleteReview =
    "delete from review where restaurant_id = :restaurantID";
  let Params = {
    restaurantID: restaurantId,
  };

  console.log(sqlDeleteReview);
  database.query(sqlDeleteReview, Params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function deleteOneReview(review, callback) {
  let sqlDeleteReview =
    "delete from review where restaurant_id = :restaurantID and details = :details and reviewer_name= :reviewerName and rating = :rating limit 1";
  let Params = {
    restaurantID: review.id,
    details: review.review,
    reviewerName: review.reviewerName,
    rating: review.rating,
    //href="/deleteReview?id=<%= restaurantID %>&review=<%= restaurant[i].details %>&reviewerName=<%= restaurant[i].reviewer_name %>&rating=<%= restaurant[i].rating %>"
  };

  console.log(sqlDeleteReview);
  database.query(sqlDeleteReview, Params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function deleteRestaurant(restaurantId, callback) {
  let sqlDeleteRestaurant =
    "delete from restaurant where restaurant_id = :restaurantID";
  let params = {
    restaurantID: restaurantId,
  };
  console.log(sqlDeleteRestaurant);
  database.query(sqlDeleteRestaurant, params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function showReviews(restaurantId, callback) {
  let sqlRestaurantReviews =
    "select rest.restaurant_id, name, review_id, reviewer_name, details, rating from restaurant as rest join review as rev  on rest.restaurant_id = rev.restaurant_id where rest.restaurant_id= :restaurantID;";
  let params = {
    restaurantID: restaurantId,
  };
  console.log(sqlRestaurantReviews);
  database.query(sqlRestaurantReviews, params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function addReview(postData, callback) {
  let sqlInsert =
    "INSERT INTO review (restaurant_id, reviewer_name, details, rating) VALUES (:restaurantID ,:reviewerName, :details, :rating);";
  let params = {
    restaurantID: postData.id,
    reviewerName: postData.name,
    details: postData.review,
    rating: parseInt(postData.rating),
  };
  console.log(sqlInsert);
  database.query(sqlInsert, params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

module.exports = {
  getAllRestaurants,
  addRestaurant,
  deleteAllReviews,
  deleteRestaurant,
  showReviews,
  addReview,
  deleteOneReview,
};
