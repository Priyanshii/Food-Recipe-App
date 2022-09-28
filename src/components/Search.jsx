import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <FaSearch />
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
        type="text"
        value={input}
      />
    </FormStyle>
  );
}

const FormStyle = styled.form`
  position: relative;
  margin: auto;
  margin-top: 4rem;
  margin-bottom: 0rem;
  width: 100%;

  input {
    border: none;
    padding: 1rem;
    padding-left: 2.4rem;
    color: white;
    background: linear-gradient(35deg, #5e5b5b, #1b1a1a);
    border-radius: 2rem;
    outline: none;
    width: 100%;
  }

  svg {
    position: absolute;
    left: 0%;
    top: 50%;
    transform: translate(100%, -50%);
    color: white;
  }
`;
export default Search;
