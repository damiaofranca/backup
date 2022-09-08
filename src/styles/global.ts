import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  html, body, #root {
    font-family: Barlow, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *::-webkit-scrollbar {
    width : 4px;
    height: 4px;
  }

  *::-webkit-scrollbar-thumb {
    background   : rgb(155 165 174 / 22%);
    border-radius: 30px;
    width        : 4px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  .w-f {
    width: 100% !important;
  }
`;
