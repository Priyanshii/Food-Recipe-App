import { useEffect, useState } from "react";
import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

function Veggie() {
  const [Veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("Veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15&tags=vegetarian`
      );
      const data = await api.json();

      localStorage.setItem("Veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data);
    }
  };

  const VeggieItems = Veggie.map((recipe) => {
    return (
      <React.Fragment key={recipe.id}>
        <Card>
          <Link to={"/recipe/" + recipe.id}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
            <Gradient />
          </Link>
        </Card>
      </React.Fragment>
    );
  });
  return (
    <div>
      <h3>Vegetarian Recipes</h3>
      <Wrapper>{VeggieItems}</Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
  margin: 2rem 0rem;
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  margin: 1rem;
  width: 21%;
  min-width: 10rem;
  height: 12rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 0%;
    bottom: 0%;
    // transform: translate(-50%,0%);
    color: white;
    width: 100%;
    // height : 100%;
    border-radius: 2rem;
    text-align: center;
    font-weight: 400;
    font-size: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0.5rem;
  }
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
`;

export default Veggie;
