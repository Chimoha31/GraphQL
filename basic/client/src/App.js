import React from "react";
import { gql, useQuery } from "@apollo/client";

const BOOKS = gql`
  query {
    test {
      title
      author
    }
  }
`;
console.log(BOOKS);

function Books() {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error..</p>;

  return data.test.map(({ title, author }) => (
    <div key={title}>
      <p>
        Author: {author},,,,,,  Title: {title}
      </p>
    </div>
  ));
}

const App = () => {
  return (
    <div>
      <h2>GraphQL Client</h2>
      <Books />
    </div>
  );
};

export default App;
