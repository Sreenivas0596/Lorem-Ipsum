const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

data = {
  title: "Bio",
  email: "akhil@gmail.com",
  profileImg:
    "https://res.cloudinary.com/sree7771/image/upload/v1663578589/1586875685330_1_j0fpjd.jpg",

  bannerImg:
    "https://res.cloudinary.com/sree7771/image/upload/v1663578831/Banner_ovlbrg.png",
  callImg:
    "https://res.cloudinary.com/sree7771/image/upload/v1663579109/24hoursavailable_apowkf.png",
  logoImg:
    "https://res.cloudinary.com/sree7771/image/upload/v1663580401/logo_placeholder_c5xwdi.png",

  skinCareGlassImg:
    "https://res.cloudinary.com/sree7771/image/upload/v1663579355/cosmetic-spa-medical-skin-care-glass-serum-bottle-micellar-tonic-with-collagen-blue-water-with-waves-advertising-medical-serum-anti-aging-care-moisturizing-cleansing_296062-517_1_nepf4q.jpg",
  skinCareBoxImg:
    "https://res.cloudinary.com/sree7771/image/upload/v1663579338/istockphoto-1212690842-612x612_mrjndk.jpg",

  glassesImg:
    "https://res.cloudinary.com/sree7771/image/upload/v1663579325/sunglasses-1170x800_mfwzjb.jpg",
  waterProductsImg:
    "https://res.cloudinary.com/sree7771/image/upload/v1663579243/waterProduct_e601bs.jpg",
  fourCosmeticsImg:
    "https://res.cloudinary.com/sree7771/image/upload/v1663579262/These-four-habits-will-dramatically-improve-yours-and-your-family_s-overall-oral-health.-1024x585_fe64yh.jpg",
};

//All Players

app.get("/", (request, response) => {
  response.send(data);
});

app.listen(process.env.PORT || 3004, () => {
  console.log("Server Running at http://localhost:3004/");
});
//single Player

module.exports = app;
