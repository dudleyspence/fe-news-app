import axios from "axios";
import Article from "./src/components/ArticleCard";

const newsApi = axios.create({
  baseURL: "https://be-news-api-2ebb.onrender.com/api/",
});

export const fetchArticles = (topic) => {
  const queries = {
    params: {
      topic,
    },
  };
  return newsApi.get("/Articles", queries);
};

export const fetchArticleById = (article_id) => {
  return newsApi.get(`/Articles/${article_id}`);
};

export const updateArticleVotes = (article_id, voteChange) => {
  return newsApi.patch(`/Articles/${article_id}`, { inc_votes: voteChange });
};
