const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// ======//
const rootDr = require("./utils/rootDr");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");

const app = express();

// =======//
app.set("view engine", "ejs");
app.set("views", path.join(rootDr, "views"));
app.use(express.static(path.join(rootDr, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// =======//
app.use(
  "/bootstrap",
  express.static(path.join(rootDr, "node_modules/bootstrap/dist"))
);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    },
  })
);

// Pass session info to all views
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});

// =======//
app.use("/", storeRouter);
app.use("/", authRouter);
app.use("/", hostRouter);

// ====404====//
app.use((req, res, next) => {
  res.status(404).render("404", { title: "404", path: "404" });
});
// ====500====//
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500");
});

const port = process.env.PORT || 3002;
app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`)
);

