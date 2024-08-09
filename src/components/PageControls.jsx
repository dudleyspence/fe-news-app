export default function PageControls({
  pageNo,
  setPageNo,
  elementsPerPage,
  element_count,
}) {
  const lowerElementIndex = (pageNo - 1) * elementsPerPage;
  let upperElementIndex = pageNo * elementsPerPage;

  const isLastPage = pageNo === Math.floor(element_count / elementsPerPage) + 1;
  console.log(isLastPage);

  if (isLastPage) {
    upperElementIndex = element_count;
  }

  function handleNextPageClick() {
    setPageNo(pageNo + 1);
  }

  function handleNextPreviousClick() {
    setPageNo(pageNo - 1);
  }
  return (
    <div className="pageControls">
      <button
        onClick={handleNextPageClick}
        disabled={isLastPage}
        className="nextPage"
      >
        <img
          className="nextButtonImg"
          src="src/assets/next.png"
          alt="next page arrow"
        />
        <p>Next</p>
      </button>
      <p className="totalResults">
        Showing {lowerElementIndex}-{upperElementIndex} of {element_count + " "}
        comments
      </p>
      <button
        className="previousPage"
        onClick={handleNextPreviousClick}
        disabled={pageNo === 1}
      >
        <img
          className="previousButtonImg"
          src="src/assets/previous.png"
          alt="previous page arrow"
        />
        <p>Previous</p>
      </button>
    </div>
  );
}
