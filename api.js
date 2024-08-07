import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-news-api-2ebb.onrender.com/api/",
});

export const fetchArticles = (topic) => {
  const queries = {
    params: {
      topic,
    },
  };
  return newsApi.get("/articles", queries);
};

export const fetchArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`);
};

export const updateArticleVotes = (article_id, voteChange) => {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes: voteChange });
};

export const fetchCommentsByArticleId = (
  article_id,
  pageNo,
  commentsPerPage
) => {
  const queries = {
    params: {
      limit: commentsPerPage,
      p: pageNo,
    },
  };
  return newsApi.get(`/articles/${article_id}/comments`, queries);
};

export const updateCommentVotes = (comment_id, voteChange) => {
  return newsApi.patch(`/comments/${comment_id}`, { inc_votes: voteChange });
};
