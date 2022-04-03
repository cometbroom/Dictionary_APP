import fetchData from "../lib/fetchData.js"
import log from "../lib/logger.js";

const DICTIONARY_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const fetchDefinition = async (word) => {
	try {
		const data = await fetchData(DICTIONARY_URL + word);
		return data;
	} catch (error) {
		log.error(error.message, "from ", DICTIONARY_URL);
	}
}

