const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const port = 3000;

const routes = require("./routes/index.routes");
const connect = require("./db");

connect()
  .then((db) => {
    // console.log({db})
    app.use(express.json());
    app.use(helmet());
    app.use(cors());

    app.use("/v1", routes);

    app.use((req, res, next) => {
      const error = new Error('Not Found')
      error.status = 404
      next(error)
    })

    app.use((error, req, res, next) => {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: false,
        data: error
      })
    })
    // set response headers
    app.use((req, res, next) => {
      res.header("Content-Type", "application/json");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header(
        "Access-Control-Allow-Method",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS"
      );
      res.header("X-XSS-Protection", "1; mode=block");
      res.header("X-Frame-Options", "deny");
      res.header("X-Content-Type-Options", "nosniff");
      next();
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1)
  });
