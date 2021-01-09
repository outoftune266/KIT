const express = require("express");
const LocalStrategy = require("passport-local").Strategy;

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("../../config/passport");
const userController = require("../../controller/userController");
const User = require("../../models/users");
const { forwardAuthenticated } = require("../../config/auth");

// Matches with "/api/users"
//router.route("/").get(userController.findAll);
//router.route("/").post(userController.create);

router
  .route("/")
  //.get(userController.login)
  .post(userController.register);

  router.route("/").post(userController.login, (req, res, next) => {
    console.log(req.body)
    passport.authenticate("local", {
      successRedirect: "/user/:id" ,
      failureRedirect: "/"
    }) (req, res, next);
  })

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findOne)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
