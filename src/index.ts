import dotenv from "dotenv";
dotenv.config({path: "./.env"});

import app from "./app";

const createApp = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`app is run on port ${process.env.PORT}`);
  });
};

createApp().catch((error) => {
  console.log(error);
});
