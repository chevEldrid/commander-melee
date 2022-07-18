import { makeAutoObservable } from "mobx";

export default class GameStore {
    stage = 1;

    MAX_STAGE = 8;

    constructor() {
        makeAutoObservable(this);
    }

    updateStage(newStage) {
        this.stage = newStage;
    }

    nextStage() {
        if(this.stage < this.MAX_STAGE) {
            this.updateStage(this.stage + 1);
        }
        
    }

    get canAdvance() {
        return this.stage <= this.MAX_STAGE;
    }

    get stageName() {
        switch (this.stage) {
            case 1:
                return "First Ban"
            case 2:
                return "Second Ban"
            case 3:
                return "Third Ban"
            case 4:
                return "Fourth Ban"
            case 5:
                return "Player 1 Pick"
            case 6:
                return "Player 2 Pick"
            case 7:
                return "Player 3 Pick"
            case 8:
                return "Player 4 Pick"
        }
        return "Final stage"
    }

    
}