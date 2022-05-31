const BASE_COMMANDER_QUERY = 'q=t%3Alegendary+t%3Acreature+legal%3Acommander'

export async function fetchCards(queryString = BASE_COMMANDER_QUERY) {
    const response = await fetch(`https://api.scryfall.com/cards/search?${queryString}`);
    const res = await response.json();
    return res.data;
}

