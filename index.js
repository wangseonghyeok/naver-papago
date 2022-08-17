const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const NAVER_ID = process.env.NAVER_ID;
const NAVER_SECRET_ID = process.env.NAVER_SECRET_ID;
app.set("port", process.env.PORT || 8099);
const port = app.get("port");
app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello express");
});
app.post("/papago", (req, res) => {
  const txt = req.body.txt;
  const language = req.body.language;
  axios({
    url: "https://openapi.naver.com/v1/papago/n2mt",
    method: "POST",
    params: {
      source: "ko",
      target: language,
      text: txt,
    },
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": NAVER_SECRET_ID,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then((response) => {
      //console.log(response.data.message.result.translatedText);
      res.json({ result: response.data.message.result.translatedText });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});
app.listen(port, () => {
  console.log(`${port}번에서 서버 대기중`);
});
