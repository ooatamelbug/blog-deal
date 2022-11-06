const app = require("./src/app");

require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`app is run on port ${process.env.PORT}`);
});
