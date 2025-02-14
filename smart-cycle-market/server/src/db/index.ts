import { connect } from "mongoose";

const uri = "mongodb://localhost:27017/smart-cycle-market";

connect(uri)
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Db Connection error", err.message);
  });
