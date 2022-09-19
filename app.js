const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

data = {
  title: "Bio",
  email: "akhil@gmail.com",
  profileImg: "https://sample-img.png",
};

//All Players

app.get("/players/", (request, response) => {
  response.send(data);
});

app.listen(process.env.PORT || 3004, () => {
  console.log("Server Running at http://localhost:3004/");
});
//single Player

module.exports = app;
