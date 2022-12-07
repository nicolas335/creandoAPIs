const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const { request } = require("express");

const getURL = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;

const moviesController = {
  list: async (req, res) => {
    try {
      let movies = await db.Movie.findAll({
        include: ["genre"],
      });
      let response = {
        ok: true, 
        meta: {
          status: 200,
          total: movies.length,
        },
        data: genres,
      };
      return res.status(200).json(response);
    } catch (error) {}
  },
  detail: (req, res) => {
    if (checkID(req.params.id)) {
      return res.status(400).json(checkID(req.params.id));
    }

    db.Movie.findByPk(req.params.id, {
      include: ["genre"],
    }).then((movie) => {
      res.render("moviesDetail.ejs", { movie });
    });
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then((movies) => {
      res.render("newestMovies", { movies });
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      include: ["genre"],
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    }).then((movies) => {
      res.render("recommendedMovies.ejs", { movies });
    });
  },
  create: function (req, res) {
    Movies.create({
      title: req.body.title,
      rating: req.body.rating,
      awards: req.body.awards,
      release_date: req.body.release_date,
      length: req.body.length,
      genre_id: req.body.genre_id,
    })
      .then(() => {
        return res.redirect("/movies");
      })
      .catch((error) => res.send(error));
  },
  update: function (req, res) {
    let movieId = req.params.id;
    Movies.update(
      {
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id,
      },
      {
        where: { id: movieId },
      }
    )
      .then(() => {
        return res.redirect("/movies");
      })
      .catch((error) => res.send(error));
  },
  destroy: function (req, res) {
    let movieId = req.params.id;
    Movies.destroy({ where: { id: movieId }, force: true }) 
      .then(() => {
        return res.redirect("/movies");
      })
      .catch((error) => res.send(error));
  },
};

module.exports = moviesController;