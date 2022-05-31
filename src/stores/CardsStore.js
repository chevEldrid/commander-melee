import { makeAutoObservable } from "mobx";
import { fetchCards } from "../api/scryfall";

export default class CardsStore {
    cards = [];
    cardsLoaded = false;

    TOTAL_COMMANDER_POOL = 24;
    
    constructor() {
        makeAutoObservable(this);
    }

    //update to fetch actual data
    async populateCards() {
        //fetches all possible Scryfall options
        const fetchedOptions = await fetchCards();
        //grabs a subset
        let commanderPool = this.getRandomSample(fetchedOptions, this.TOTAL_COMMANDER_POOL);
        //transforms subset to match data format
        commanderPool.map(card => {
            return {
                name: card.name,
                img: 'image',
                disabledBy: 0,
                selectedBy: 0
            }
        });

        this.setCards(commanderPool);
        this.setCardsLoaded(true);
        //required card data
        // const card = {
        //     name: 'Test123',
        //     img: 'image-link',
        //     disabledBy: 0,
        //     selectedBy: 0
        // }
    
        // this.cards = Array(this.TOTAL_COMMANDER_POOL).fill(card);
    }

    updateCard(index, newCard) {
        const newCards = this.cards.map((card, i) =>
            index === i
                ? newCard
                : card
        );
        this.setCards(newCards);
    }

    //private
    setCards(newCards) {
        this.cards = newCards;
    }

    setCardsLoaded(cardsLoaded) {
        this.cardsLoaded = cardsLoaded;
    }

    getRandomSample(cardList, count) {
        let indexList = [];
        let cardPool = [];
        const cardListLength = cardList.length;
        //random sampling of indexes
        for(let i = 0; i < count; i++) {
            let index = Math.floor(Math.random() * cardListLength);
            indexList.push(index);
        }
        //fetch the random cards
        for(let i = 0; i < count; i++) {
            cardPool.push(cardList.at(indexList[i]));
        }
        return cardPool;
    }
}