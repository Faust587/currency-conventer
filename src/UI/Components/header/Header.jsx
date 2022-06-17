import styled from "styled-components";
import CurrencyBlock from "../currencyBlock/CurrencyBlock";

const Header = () => {
  return (
    <HeaderWrapper>
      <CurrencyBlock currencyName={"$USD"} from={"USD"} to={"UAH"} />
      <CurrencyBlock currencyName={"€EUR"} from={"EUR"} to={"UAH"} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 200px;
  background-color: #393E41;
`;

export default Header;
