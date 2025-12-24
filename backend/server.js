const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");
require('dotenv').config();
const PORT = 3000;

connectDB();
app.listen(PORT, () => {
  console.log(`server run is on port ${PORT}`);
});
