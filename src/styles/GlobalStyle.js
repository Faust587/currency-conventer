import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: visible;
    background-color: #E7E5DF;
  }

  @font-face {
    font-family: "Montserrat";
    src: local("Montserrat"),
    url("/assets/fonts/Montserrat-VariableFont_wght.ttf") format("truetype");
    font-weight: normal;
  }
`;

export default GlobalStyle;
