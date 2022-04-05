import createHomePage from "./homePage.js";
import createRhymesPage from "./rhymesPage.js";

const routes = [
  { path: "home", page: createHomePage, default: true },
  { path: "rhymes", page: createRhymesPage },
];

export default routes;
