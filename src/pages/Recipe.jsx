import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  const [details, setDetails] = useState({});
  const [ingredientsList, setIngredientsList] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  const FetchDetails = async (id) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );

    const detailData = await data.json();
    console.log(detailData);
    setDetails(detailData);
    setIngredientsList(detailData.extendedIngredients);
  };
  useEffect(() => {
    FetchDetails(params.id);
  }, [params.id]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" ? (
          <div>
            {/* <p dangerouslySetInnerHTML={{ __html: details.summary }}></p> */}
            <inst
              dangerouslySetInnerHTML={{ __html: details.instructions }}
            ></inst>
          </div>
        ) : (
          <List>
            {ingredientsList.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.name}</li>;
            })}
          </List>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #5e5c5c, #252525);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    border-radius: 2rem;
    width: 20rem;
  }
`;

const Button = styled.button`
  padding: 1rem 1rem;
  color: #2c2828;
  background-color: white;
  border: 1px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
  .active {
    background: linear-gradient(35deg, #5e5c5c, #252525);
    color: white;
  }
`;

const Info = styled.div`
  margin-left: 2rem;
`;

const List = styled.ul`
  padding-left: 2rem;

  li {
    font-size: 15px;
    padding: 0.1rem;
    color: black;
  }
`;

const inst = styled.p`
  font-size: 12px;
`;
export default Recipe;
