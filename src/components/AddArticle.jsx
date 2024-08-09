import { useState, useEffect } from "react";
import { getTopics } from "../../api";

export default function AddArticle() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currTopics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then(({ data: { topics } }) => {
        console.log(topics);
        setIsLoading(false);
        setTopics(topics);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return isError ? (
    "error"
  ) : isLoading ? (
    "loading"
  ) : (
    <div className="AddArticle">
      <form>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" />
        <label htmlFor="img">Article Image URL: </label>
        <input type="url" name="img" id="img" />
        <label htmlFor="img">Topic: </label>
        <select type="" name="topic" id="topic">
          {currTopics.map((topic) => (
            <option key={topic.slug} value="topic.slug">
              {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
            </option>
          ))}
        </select>
        <label htmlFor="article">Article: </label>
        <textarea name="article" id="article"></textarea>
      </form>
    </div>
  );
}
