import styled from "styled-components";
import {useState} from "react";
import axios from "axios";
import useSWR from "swr";

const CurrencyBlock = (props) => {
  const url = `${process.env.REACT_APP_CURRENCY_API}${props.from}`;
  const [price, setPrice] = useState(0);
  useSWR(url, fetcher);

  async function fetcher(url) {
    const result = await axios.get(url);
    const parsedData = Number(result.data.data.rates[props.to]);
    setPrice(+parsedData.toFixed(2));
  }

  return (
    <CurrencyWrapper>
      <CurrencyLabel>
        {props.currencyName}={price}₴
      </CurrencyLabel>
    </CurrencyWrapper>
  );
}

const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80%;
`;

const CurrencyLabel = styled.div`
  font-family: 'Montserrat', monospace;
  font-size: 40px;
  color: #D3D0CB;
`;

export default CurrencyBlock;
