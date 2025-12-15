require("dotenv").config();
const app = require("./src/app");

app.listen(3000, () => {
  console.log("Server local en http://localhost:3000");
});
