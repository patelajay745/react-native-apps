import swaggerAutogen from "swagger-autogen";
import "dotenv/config";

const doc = {
  info: {
    title: "Smart Cycle market",
    description: "Description",
  },
  host: process.env.BASE_URL,
};

const outputFile = "./swagger-output.json";
const routes = ["./index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
