import { Button, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

const ButtonRow = observer(({ 
    cardsStore,
    gameStore,
    setSelection
}) => {

    const clearSelections = () => {
        gameStore.updateStage(1);
        cardsStore.resetCards();
    }

    const chooseRandom = () => {
        const index = Math.floor(Math.random() * cardsStore.TOTAL_COMMANDER_POOL);
        const stage = gameStore.stage;
        let cardSet = false;
        if (stage < 5) {
            cardSet = cardsStore.disableCard(index, stage);
        } else if (stage < 9) {
            cardSet = cardsStore.selectCard(index, stage - 4);
        }
        if (cardSet) {
            gameStore.updateStage(stage + 1);
        } else {
            chooseRandom();
        }
    }

    const undoSelection = () => {
        cardsStore.undo();
        gameStore.updateStage(gameStore.stage - 1);
    }

    return (
        <Row>
            <Button 
                variant="warning"
                onClick={() => clearSelections()}
            >
                Reset
            </Button>
            <Button
                variant="secondary"
                onClick={() => chooseRandom()}
            >
                Random
            </Button>
            <Button
                variant="danger"
                onClick={() => undoSelection()}
            >
                Undo
            </Button>
            <Button
                variant="primary"
                onClick={() => gameStore.nextStage()}
                disabled={!gameStore.canAdvance}
            >
                Advance to stage past: {gameStore.stageName}
            </Button>
            <Button
                variant="success"
                onClick={() => setSelection(false)}
            >
                Submit
            </Button>
        </Row>
    )
});

ButtonRow.propTypes = {
    cardsStore: PropTypes.object.isRequired,
    gameStore: PropTypes.object.isRequired,
    setSelection: PropTypes.func.isRequired
}

export default ButtonRow;