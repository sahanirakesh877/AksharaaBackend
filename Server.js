const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const PORT = process.env.PORT || 5000;

// databases connections
const ConnectDB = require("./DataBase/ConnectDb");
ConnectDB();
// middleware
app.use(errorHandler);
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());

// google login process
app.use(
  session({
    secret: "kjhgju7658gfgh123456",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 1000 * 86400),
    },
  })
);

require("./service/passport");
// setup passport instance
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.get("/login/success", async (req, res) => {
  console.log("request data", req.user);
  res.status(200).send("Login successful!");
});

// user routes defined
const userrouter = require("./Routes/UserRoutes");
app.use("/api/v1", userrouter);

// blogs  routes defined
const blogrouter = require("./Routes/BlogRoute");
app.use("/api/v1/blog", blogrouter);

app.listen(PORT, () => {
  console.log(` Server listening on ${PORT}`);
});
