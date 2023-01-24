// dependencies
const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const PORT = process.env.PORT || 3000;

const helpers = require("./utils/helpers")

const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

// express sessions
const session = require("express-session");
const sessionSequelize = require("connect-session-sequelize");
const SequelizeStore = sessionSequelize(session.Store);
const sessionOptions = {
  secret: process.env.DB_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// express function call
const app = express();

// set Handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT);
  console.log(`Server listening on PORT ${PORT}`);
});