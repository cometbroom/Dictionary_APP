import { createElement } from "../tools/DOMCreate.js";

function createErrorView(props) {
  const root = createElement("section", { class: "error" });
  const status = props?.status ? props.status : "";
  root.innerHTML = String.raw`
    <h1>Error ${status}: </h1>
    <h2>${props.content}</h2>
  `;

  return { root };
}

export default createErrorView;
