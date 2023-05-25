const asyncHandler = require("express-async-handler");
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const getGptResponse = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt} 
    Find the Summary of this news`,
    max_tokens: 64,
    temperature: 0,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  });
  if (!response) {
    res.status(400);
    throw new Error("There was an issue on the server");
  }
  res.status(200).json({
    success: true,
    data: response.data.choices[0].text,
  });
});

module.exports = { getGptResponse };
