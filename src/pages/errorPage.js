import createNavComponent, { LOGO_INDEX } from "../components/navbar.js";
import createErrorView from "../views/errorView.js";

function createErrorPage(message) {
  const errorView = renderViewWithNav({ content: message });

  return errorView;
}

function renderViewWithNav(props) {
  const navbarHeight = createNavComponent(LOGO_INDEX);
  const errorView = createErrorView(props);

  errorView.root.style.top = `${navbarHeight}px`;
  return errorView;
}

export default createErrorPage;
