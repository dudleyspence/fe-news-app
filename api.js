import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-news-api-2ebb.onrender.com/api/",
});

export const getArticles = (topic) => {
  const queries = {
    params: {
      topic,
    },
  };
  return newsApi.get("/Articles", queries);
};
