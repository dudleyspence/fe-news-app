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
        className="styled-button"
      >
        Next Page
      </button>
      <p className="totalResults">
        Showing {lowerElementIndex}-{upperElementIndex} of {element_count + " "}
        comments
      </p>
      <button
        className="styled-button"
        onClick={handleNextPreviousClick}
        disabled={pageNo === 1}
      >
        Previous Page
      </button>
    </div>
  );
}
