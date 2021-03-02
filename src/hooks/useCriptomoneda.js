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

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCriptomoneda = (label, options) => {
  const [state, actualizarState] = useState("");

  const SelectCripto = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select onChange={(e) => actualizarState(e.target.value)} value={state}>
        <option value="">Seleccione una Criptomoneda</option>
        {options &&
          options.length &&
          options.map((opc) => (
            <option key={opc.CoinInfo.Id} value={opc.CoinInfo.Name}>
              {opc.CoinInfo.FullName}
            </option>
          ))}
      </Select>
    </Fragment>
  );
  return [state, SelectCripto, actualizarState];
};

export default useCriptomoneda;
