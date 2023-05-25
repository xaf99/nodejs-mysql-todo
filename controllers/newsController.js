const asyncHandler = require("express-async-handler");
const axios = require("axios");
// const fetchData = asyncHandler(async function () {
//   const response = await axios.get(
//     "https://newsapi.org/v2/everything?q=tesla&from=2023-04-23&sortBy=publishedAt&apiKey=953be13b07d7465db380385d2cf436bff"
//   );
//   console.log(response);
//   // if (Object.keys(response).length === 0) {
//   //   res.status(400);
//   //   throw new Error("Error retreiving Data");
//   // }
//   const data = response.data;
//   return data;
// });

const newsApi = asyncHandler(async (req, res) => {
  const { data } = await axios.get(
    "https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=953be13b07d7465db380385d2cf436bf"
  );
  if (!data) {
    res.status(400);
    throw new Error("Error getting news");
  }
  res.status(200).json({
    message: "Success",
    data,
  });
});

module.exports = {
  newsApi,
};
