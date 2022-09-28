import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const params = useParams();

  const getSearchedRecipes = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();

    setSearchedRecipes(recipes.results);
    console.log(data);
  };

  useEffect(() => {
    getSearchedRecipes(params.search);
    console.log(params);
  }, [params.search]);

  const SearchedItems = searchedRecipes.map((item) => {
    return (
      <Card key={item.id}>
        <Link to={"/recipe/" + item.id}>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
        </Link>
      </Card>
    );
  });
  return <Grid>{SearchedItems}</Grid>;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 1.5rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    font-size: 0.9rem;
    padding: 1rem;
  }
`;

export default Searched;
