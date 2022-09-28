import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <SLink to={"/cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"/cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"/cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={"/cuisine/Chinese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </List>
  );
}
const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 0rem;
`;
const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 1rem;
  text-decoration: none;
  background: linear-gradient(35deg, #727472, #1a1717);
  width: 4rem;
  height: 4rem;
  /* transform: scale(0.9); */
  h4 {
    color: white;
    font-size: 0.7rem;
    font-weight: 300;
  }

  svg {
    color: white;
    font-size: 1.2rem;
  }

  &.active {
    background: linear-gradient(35deg, #b3591e, #d64545);
    h4{
      color: white;
    }
    svg{
      color: white;
    }
  }
`;
export default Category;
