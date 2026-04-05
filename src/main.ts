import { renderLandingPage } from "./app";
import "./styles.css";

const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new Error("Missing #app root element");
}

renderLandingPage(app);
