import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select =styled.select`
width:100%;
display:block;
padding:1rem;
-webkit-appearance:none;
border-radius:10px;
border:none;
font-size:1.2rem;
`;

const useMoneda = (label, options) => {
  //state del hook

  const [state, actualizarState] = useState("");

  const Seleccionar = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select onChange={(e) => actualizarState(e.target.value)} value={state}>
        {options.map((opc) => (
          <option key={opc.codigo} value={opc.codigo}>
            {opc.nombre}
          </option>
        ))}
      </Select>
    </Fragment>
  );
  return [state, Seleccionar, actualizarState];
};

export default useMoneda;
