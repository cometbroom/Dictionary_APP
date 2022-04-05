import createErrorView from "../views/errorView.js";

function createErrorPage(message) {
  const errorView = createErrorView({ content: message });

  return errorView;
}

export default createErrorPage;
