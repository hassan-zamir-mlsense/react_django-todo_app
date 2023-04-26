import React, { useState } from "react";
import useFetch from "./useFetch";
import NewsList from "./NewsList";
const Home = () => {
  const [page, setPage] = useState(5)
  const handleClick = () => {
    setPage(page + 5)
  }
  const {
    error,
    isPending,
    data: newsList,
  } = useFetch("https://django-reddit-dot-cloud-work-314310.ew.r.appspot.com/news?per_page=" + page);
  return (
    <div className="container m-5">
      <div className="row justify-content-center">
        <div className="col col-6">
          {error && <div>{error}</div>}
          {isPending && <div>Loading ...</div>}
          {newsList && <NewsList newsList={newsList["news"]} title="Recent Posts" />}
          <button className="btn btn-outline-dark w-75" onClick={handleClick}>Load More</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
