import createErrorPage from "./errorPage.js";
import createHomePage from "./homePage.js";
import createRhymesPage from "./rhymesPage.js";

const routes = [
  { path: "home", page: createHomePage, default: true },
  { path: "rhymes", page: createRhymesPage },
  { path: "error", page: createErrorPage },
];

export default routes;
