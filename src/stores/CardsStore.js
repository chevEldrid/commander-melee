import { makeAutoObservable } from "mobx";
import { fetchCards } from "../api/scryfall";

export default class CardsStore {
    cards = [];
    cardsLoaded = false;
    undoStack = [];

    TOTAL_COMMANDER_POOL = 24;

    constructor() {
        makeAutoObservable(this);
    }

    async populateCards() {
        //fetches all possible Scryfall options
        const fetchedOptions = await fetchCards();
        //grabs a subset of returned Commanders
        let commanderPool = this.getRandomSample(fetchedOptions, this.TOTAL_COMMANDER_POOL);
        //transforms subset into smaller data format
        commanderPool = commanderPool.map(card => {
            return this.poolCard(card);
        });

        this.setCards(commanderPool);
        this.setCardsLoaded(true);
    }

    //changes card at given index to given newCard
    //stackIndex - adds index of card to "undo stack"
    updateCard(index, newCard, stackIndex=true) {
        if (index - 1 > this.cards.length) return;

        const newCards = this.cards.map((card, i) =>
            index === i
                ? newCard
                : card
        );
        this.setCards(newCards);
        if(stackIndex) this.undoStack.push(index);
    }

    //Adds a given player to 'selectedBy' array on Card
    selectCard(index, player) {
        if (index - 1 > this.cards.length) return false;

        let card = this.cards[index];
        if (card.disabledBy !== 0) return false;

        card.selectedBy.push(player);
        this.updateCard(index, card);
        return true;
    }

    //Adds a given player to 'disabledBy' on a card
    //multiple players can choose to disable the same card
    disableCard(index, player) {
        if (index - 1 > this.cards.length) return false;

        let card = this.cards[index];
        card = { ...card, disabledBy: player};
        this.updateCard(index, card);
        return true;
    }

    //removes the last added player to card's 'selectedBy'
    //removes current player from card 'disabledBy'
    resetCard(index) {
        if (index - 1 > this.cards.length) return;

        let card = this.cards[index];
        card.selectedBy.pop();
        card = { ...card, disabledBy: 0};
        this.updateCard(index, card, false);
    }

    //removes all players from all cards
    resetCards() {
        const reset = this.cards.map(card => {
            return { ...card, selectedBy: [], disabledBy: 0};
        });
        this.setCards(reset);
    }

    //resets the card at the last index saved to the undo stack
    undo() {
        if(this.undoStack.length === 0) return;

        const index = this.undoStack.pop();
        this.resetCard(index);
    }

    setCards(newCards) {
        this.cards = newCards;
    }

    setCardsLoaded(cardsLoaded) {
        this.cardsLoaded = cardsLoaded;
    }

    setUndoStack(newStack) {
        this.undoStack = newStack;
    }

    get selectedCards() {
        return this.cards.filter(card => card.selectedBy.length !== 0);
    }

    //private
    poolCard(card) {
        const imgLink = card.image_uris?.art_crop 
        || card.card_faces[0]?.image_uris?.art_crop;

        return {
            name: card.name,
            img: imgLink,
            disabledBy: 0,
            selectedBy: [],
            url: this.generateDeckUrl(card.name)
        }
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

    //generates the EDHRec Avg Deck url from a Scryfall Name
    generateDeckUrl(name) {
        let cardName = name;
        //Avg decks are only the first half of a DFC
        cardName = cardName.split(" // ")[0];
        const regex = /[\s,]+/g;
        const edhRecUrl = 'https://edhrec.com/average-decks/';
        //EDHRec changes all characters between words to hyphens
        cardName = cardName.replaceAll(regex,'-').toLocaleLowerCase();
        return `${edhRecUrl}${cardName}`;
    }
}