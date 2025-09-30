const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Sessions
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// View Engine
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/tasks"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



