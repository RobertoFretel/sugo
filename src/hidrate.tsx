/// <reference lib="DOM" />
import { hydrateRoot } from "react-dom/client";
import App from "../template";

hydrateRoot(
  document.querySelector("#app") as HTMLElement,
  <App />
)