import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";
import Error from "../components/Error"

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;
const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

  const [error,guardarError]=useState(false)

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  const [listaCripto, guardarCripto] = useState([]);
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", MONEDAS);

  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elije tu criptomoneda",
    listaCripto
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);

      guardarCripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const cotizarMoneda=e =>{
    e.preventDefault()

    if(moneda === '' || criptomoneda === ''){
      guardarError(true)
      return
    }else{

      guardarError(false)
      guardarMoneda(moneda)
      guardarCriptomoneda(criptomoneda)

    }

  }

  return (
    <form
    onSubmit={cotizarMoneda}
    >
      {error ? <Error mensaje="Se produjo un error"/>:null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
