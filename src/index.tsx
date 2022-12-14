import * as ReactDOM from "react-dom/client";
import * as React from "react";
import {
  StyledEngineProvider,
  createTheme,
  ThemeProvider
} from "@mui/material/styles";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Demo from "./demo";

const container = document.querySelector("#shadow-root");
const shadowContainer = container.attachShadow({ mode: "open" });
const emotionRoot = document.createElement("style");
const shadowRootElement = document.createElement("div");
shadowContainer.appendChild(emotionRoot);
shadowContainer.appendChild(shadowRootElement);

const cache = createCache({
  key: "css",
  prepend: true,
  container: emotionRoot
});

const shadowTheme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: shadowRootElement
      }
    },
    MuiPopper: {
      defaultProps: {
        container: shadowRootElement
      }
    },
    MuiModal: {
      defaultProps: {
        container: shadowRootElement
      }
    }
  }
});

ReactDOM.createRoot(shadowRootElement).render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={shadowTheme}>
        <Typography>Shadow DOM</Typography>
        <Demo />
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Typography>Outside of Shadow DOM</Typography>
        <Demo />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
