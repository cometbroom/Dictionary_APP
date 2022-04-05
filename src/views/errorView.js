import { createElement } from "../tools/DOMCreate.js";

function createErrorView(props) {
  const root = createElement("section", { class: "error" });

  const title = createElement("h2", props);
  root.appendChild(title);
  return { root };
}

export default createErrorView;
