const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");

require("./services/passport");

mongoose.connect(keys.mongoURI);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb");
});
mongoose.connection.on("error", err => {
  console.log("error in connection to mongodb", err);
});

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoute")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up prodduction assest like our main.js file of main.css file
  app.use(express.static("client/build"));

  //Express will serve up the index.html file if it deosn'nt recongnize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
