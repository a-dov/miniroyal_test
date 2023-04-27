import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  :root {
    --color-primary-main: #F0A500;
    --color-dark-500: #2A2926;
    --color-dark-800: rgb(27, 26, 23);
    --color-dark-900: rgb(19, 19, 19);
  }
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media 
  (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    font-size: 16px;
    color: #F5F5F5;
    background-color: #1B1A17;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, textarea, select, button {
    font: 400 1rem "Poppins", sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @keyframes slidein {
    from {
      transform: scaleX(0.1);
    }
  
    to {
      transform: scaleX(1);
    }
  }

  @keyframes rotating {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
`;
