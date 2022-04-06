import { createElement } from "../tools/DOMCreate.js";

function createErrorView(props) {
  const root = createElement("section", { class: "error" });
  root.innerHTML = String.raw`
  <div class="error-card">
    <i class="fa-solid fa-bug"> </i>
    <h2>${props.content}</h2>
  </div>
  `;

  return { root };
}

export default createErrorView;
