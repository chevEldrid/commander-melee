import { makeAutoObservable } from "mobx";

export default class CardsStore {
    cards = []

    constructor() {
        makeAutoObservable(this);
        this.populateCards();
    }

    //update to fetch actual data
    populateCards() {
        //required card data
        const card = {
            name: 'Test123',
            img: 'image-link',
            disabledBy: 0,
            selectedBy: 0
        }
    
        this.cards = Array(24).fill(card);
    }

    updateCard(index, newCard) {
        const newCards = this.cards.map((card, i) =>
            index === i
                ? newCard
                : card
        );
        this.setCards(newCards);
    }

    setCards(newCards) {
        this.cards = newCards;
    }
}