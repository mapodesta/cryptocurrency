import React, { useState, useEffect } from "react";
import imagen from "../src/cryptomonedas.png";
import styled from "@emotion/styled";
import Formulario from "../src/components/Formulario";
import axios from "axios";
import Resultado from "../src/components/Resultado";
import Spinner from "../src/components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCrypto = async () => {
      if (moneda === "") return;
      console.log("cotizando....");
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      guardarCargando(true);
      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };
    cotizarCrypto();
  }, [moneda, criptomoneda]);

  const componente = cargando ? (
    <Spinner />
  ) : (
    <Resultado resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarCriptomoneda={guardarCriptomoneda}
          guardarMoneda={guardarMoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
