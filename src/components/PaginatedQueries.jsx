import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchFruits = (pageId) => {
  return axios.get(`http://localhost:4000/fruits?_limit=4&_page=${pageId}`);
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    placeholderData: keepPreviousData
  });

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  
  return (
    <div className="container">
      {data?.data?.map((item) => (
        <div className="fruit-label" key={item.id}>
          {item.name}
        </div>
      ))}

      <button onClick={() => setPage((prev) => prev-1)} disabled={page === 1}>
        Prev Page
      </button>
      <button onClick={() => setPage((prev) => prev+1)} disabled={page === 5}>Next Page</button>
    </div>
  );
};

export default PaginatedQueries;
