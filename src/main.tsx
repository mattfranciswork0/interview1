import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Social from "./Social.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Social />
  </StrictMode>,
);
