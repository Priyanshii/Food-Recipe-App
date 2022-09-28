import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Recipe from "./Recipe";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();
  const getCuisine = async (name) => {
    const check = localStorage.getItem(name);

    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=12&cuisine=${name}`
      );
      const data = await api.json();
      console.log(data);
      localStorage.setItem(name, JSON.stringify(data.results));
      setCuisine(data.results);
    }
  };

  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);

  const CuisineItems = cuisine.map((item) => {
    return (
      <Card key={item.id}>
        <Link to={"/recipe/" + item.id}>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
        </Link>
      </Card>
    );
  });
  return <Grid>{CuisineItems}</Grid>;
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

export default Cuisine;
