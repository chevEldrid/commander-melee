//legal:commander is:commander - shorthand for all legal commanders on Scryfall
const BASE_COMMANDER_QUERY = 'q=legal%3Acommander+is%3Acommander'

//hacky testing variable to avoid too many scryfall requests
const GET_MORE = true;

export async function fetchCards(queryString = BASE_COMMANDER_QUERY) {
    const response = await fetch(`https://api.scryfall.com/cards/search?${queryString}`);
    const res = await response.json();
    let cards = res.data;
    if(res.has_more && GET_MORE) {
        const moreCards = await nextPage(res.next_page);
        cards = [ ...cards, ...moreCards];
    }
    return cards;
}

async function nextPage(url) {
    const response = await fetch(url);
    const res = await response.json();
    let cards = res.data;
    if(res.has_more) {
        const moreCards = await nextPage(res.next_page);
        cards = [ ...cards, ...moreCards];
    }
    return cards;
}

