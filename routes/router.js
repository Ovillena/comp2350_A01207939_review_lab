const router = require("express").Router();
const database = include("databaseConnection");
const dbModel = include("databaseAccessLayer");
//const dbModel = include('staticData');

router.get("/", (req, res) => {
  console.log("page hit");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      dbModel.getAllRestaurants((err, result) => {
        if (err) {
          res.render("error", { message: "Error reading from MySQL" });
          console.log("Error reading from mysql");
          console.log(err);
        } else {
          //success
          res.render("index", { allRestaurants: result });

          //Output the results of the query to the Heroku Logs
          console.log(result);
        }
      });
      dbConnection.release();
    }
  });
});

router.post("/addRestaurant", (req, res) => {
  console.log("form submit");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.body);
      dbModel.addRestaurant(req.body, (err, result) => {
        if (err) {
          res.render("error", { message: "Error writing to MySQL" });
          console.log("Error writing to mysql");
          console.log(err);
        } else {
          //success
          res.redirect("/");

          //Output the results of the query to the Heroku Logs
          console.log(result);
        }
      });

      dbConnection.release();
    }
  });
});

router.get("/deleteRestaurant", (req, res) => {
  console.log("delete restaurant");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.query);

      let restaurantId = req.query.id;
      if (restaurantId) {
        //delete from person_skill where person_id = :person_id;
        dbModel.deleteAllReviews(restaurantId, (err, result) => {
          if (err) {
            res.render("error", { message: "Error writing to MySQL" });
            console.log("Error writing to mysql");
            console.log(err);
          } else {
            //success
            //delete from person where person_id = :person_id;
            dbModel.deleteRestaurant(restaurantId, (err, result) => {
              if (err) {
                res.render("error", { message: "Error writing to MySQL" });
                console.log("Error writing to mysql");
                console.log(err);
              } else {
                //success
                res.redirect("/");

                //Output the results of the query to the Heroku Logs
                console.log(result);
              }
            });
          }
        });
      } else {
        res.render("error", { message: "Error on Delete" });
      }

      dbConnection.release();
    }
  });
});

router.get("/showReviews", (req, res) => {
  console.log("show restaurant reviews");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.query);

      let restaurantId = req.query.id;
      if (restaurantId === "undefined") {
        res.redirect("/");
      }
      if (restaurantId) {
        //delete from person_skill where person_id = :person_id;
        dbModel.showReviews(restaurantId, (err, result) => {
          if (err) {
            res.render("error", { message: "Error writing to MySQL" });
            console.log("Error writing to mysql");
            console.log(err);
          } else {
            //success
            //delete from person where person_id = :person_id;
            //success
            res.render("review", {
              restaurant: result,
              restaurantID: restaurantId,
            });

            //Output the results of the query to the Heroku Logs
            console.log(result);
          }
        });
      } else {
        res.render("review", { message: "Error on Show Review" });
      }

      dbConnection.release();
    }
  });
});

router.post("/addReview", (req, res) => {
  console.log("form submit");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.body);
      dbModel.addReview(req.body, (err, result) => {
        if (err) {
          res.render("error", { message: "Error writing to MySQL" });
          console.log("Error writing to mysql");
          console.log(err);
        } else {
          //success
          const currentPage = `showReviews?id=${req.body.id}`;
          console.log(
            "current page URL-------------------------------" + currentPage
          );
          res.redirect(currentPage);

          //Output the results of the query to the Heroku Logs
          console.log(result);
        }
      });

      dbConnection.release();
    }
  });
});

router.get("/deleteReview", (req, res) => {
  console.log("delete review");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.query);

      let review = req.query;
      if (review) {
        //delete from person_skill where person_id = :person_id;
        dbModel.deleteOneReview(review, (err, result) => {
          if (err) {
            res.render("error", { message: "Error writing to MySQL" });
            console.log("Error writing to mysql");
            console.log(err);
          } else {
            //success

            const currentPage = `showReviews?id=${req.query.id}`;

            res.redirect(currentPage);

            //Output the results of the query to the Heroku Logs
            console.log(result);
          }
        });
      } else {
        res.render("error", { message: "Error on Delete" });
      }

      dbConnection.release();
    }
  });
});

module.exports = router;
