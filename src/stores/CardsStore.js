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

    //update to fetch actual data
    async populateCards() {
        //fetches all possible Scryfall options
        const fetchedOptions = await fetchCards();
        //grabs a subset
        let commanderPool = this.getRandomSample(fetchedOptions, this.TOTAL_COMMANDER_POOL);
        //transforms subset to match data format
        commanderPool = commanderPool.map(card => {
            return this.poolCard(card);
        });

        this.setCards(commanderPool);
        this.setCardsLoaded(true);
    }

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

    selectCard(index, player) {
        if (index - 1 > this.cards.length) return false;

        let card = this.cards[index];
        if (card.disabledBy !== 0) return false;

        card.selectedBy.push(player);
        this.updateCard(index, card);
        return true;
    }

    disableCard(index, player) {
        if (index - 1 > this.cards.length) return false;

        let card = this.cards[index];
        card = { ...card, disabledBy: player};
        this.updateCard(index, card);
        return true;
    }

    resetCard(index) {
        if (index - 1 > this.cards.length) return;

        let card = this.cards[index];
        card.selectedBy.pop();
        card = { ...card, disabledBy: 0};
        this.updateCard(index, card, false);
    }

    resetCards() {
        const reset = this.cards.map(card => {
            return { ...card, selectedBy: [], disabledBy: 0};
        });
        this.setCards(reset);
    }

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

    generateDeckUrl(name) {
        let cardName = name;
        const regex = /[\s,]+/g;
        const edhRecUrl = 'https://edhrec.com/average-decks/';

        cardName = cardName.replaceAll(regex,'-').toLocaleLowerCase();
        return `${edhRecUrl}${cardName}`;
    }
}