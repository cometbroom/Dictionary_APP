import fetchData from "../lib/fetchData.js";
import log from "../lib/logger.js";

const RHYMES_API_URL = "https://rhymebrain.com/talk?function=getRhymes&word=";

export const fetchRhymes = async (word) => {
  try {
    const data = await fetchData(RHYMES_API_URL + word + "&maxResults=20");
    return data;
  } catch (error) {
    log.error(error.message, "from ", RHYMES_API_URL);
  }
};
