import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";

const ExchangeCurrency = () => {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("UAH");

  const [allCurrency, setAllCurrency] = useState({});

  const [isFirstInput, setIsFirstInput] = useState(true);

  const [exchangeRate, setExchangeRate] = useState(0);

  const [inputCurrencyFrom, setInputCurrencyFrom] = useState();
  const [inputCurrencyTo, setInputCurrencyTo] = useState(1);

  useEffect(() => {
    const fetchExchangeRate = () => {
      axios.get(`${process.env.REACT_APP_CURRENCY_API}${currencyFrom}`)
        .then(result => {
          const parsedData = (result.data.data.rates[currencyTo]);
          setExchangeRate(+parsedData);
          setAllCurrency(result.data.data.rates);
        });
    }
    fetchExchangeRate();
  }, [currencyFrom, currencyTo]);

  const changeCurrencyFromInput = e => {
    setInputCurrencyFrom(e.target.value);
  }

  const changeCurrencyToInput = e => {
    setInputCurrencyTo(e.target.value);
  }

  const firstInputValue = () => {
    return !isFirstInput ? Number(inputCurrencyTo / exchangeRate).toFixed(2) : inputCurrencyFrom;
  }

  const secondInputValue = () => {
    return isFirstInput ? Number(inputCurrencyFrom * exchangeRate).toFixed(2) : inputCurrencyTo;
  }

  const createOptions = () => {
    const options = [];
    for (const currencyKey in allCurrency) {
      options.push(<Option value={currencyKey}>{currencyKey}</Option>)
    }
    return options;
  }

  return (
    <PairWrapper>
        <CashInput type={"number"} value={firstInputValue()} onChange={changeCurrencyFromInput} onFocus={() => setIsFirstInput(true)} />
        <SelectCurrency value={currencyFrom} onChange={e => setCurrencyFrom(e.target.value)}>
          <Option value={"EUR"}>EUR</Option>
          <Option value={"USD"}>USD</Option>
          <Option value={"UAH"}>UAH</Option>
        </SelectCurrency>
      <EqualBlock>=</EqualBlock>
        <CashInput type={"number"} value={secondInputValue()} onChange={changeCurrencyToInput} onFocus={() => setIsFirstInput(false)} />
        <SelectCurrency value={currencyTo} onChange={e => setCurrencyTo(e.target.value)}>
          {createOptions()}
        </SelectCurrency>
    </PairWrapper>
  );
}

const EqualBlock = styled.div`
  align-self: center;
  height: 100%;
  font-size: 30px;
  padding: 0 40px;
`;

const SelectCurrency = styled.select`
  background-color: #0563af;
  color: white;
  margin: 0 20px;
  padding: 12px;
  border: none;
  font-size: 20px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  -webkit-appearance: button;
  outline: none;
  border-radius: 10px;
  ::before {
    height: 100%;
    text-align: center;
    font-size: 28px;
    line-height: 45px;
    color: rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }
`;

const Option = styled.option`
  padding: 30px;
`;

const PairWrapper = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;

const CashInput = styled.input`
  width: 200px;
  height: 100%;
  font-size: 30px;
  outline: none;
  border: 1px solid #ccc; 
  padding: 7px 14px 9px; 
  transition: 0.4s;
  border-radius: 20px;
  margin: 0 20px;
`;

export default ExchangeCurrency;
