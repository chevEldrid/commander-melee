import { Button, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const ButtonRow = ({ 
    cardsStore,
    setSelection,
    setStage, 
    stage
}) => {

    const clearSelections = () => {
        setStage(1);
        cardsStore.resetCards();
    }

    const chooseRandom = () => {
        const index = Math.floor(Math.random() * cardsStore.TOTAL_COMMANDER_POOL);
        let cardSet = false;
        if (stage < 5) {
            cardSet = cardsStore.disableCard(index, stage);
        } else if (stage < 9) {
            cardSet = cardsStore.selectCard(index, stage - 4);
        }
        if (cardSet) {
            setStage(stage + 1);
        } else {
            chooseRandom();
        }
    }

    const undoSelection = () => {
        cardsStore.undo();
        setStage(stage - 1);
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
                variant="success"
                onClick={() => setSelection(false)}
            >
                Submit
            </Button>
        </Row>
    )
};

ButtonRow.propTypes = {
    cardsStore: PropTypes.object.isRequired,
    setSelection: PropTypes.func.isRequired,
    setStage: PropTypes.func.isRequired,
    stage: PropTypes.number.isRequired
}

export default ButtonRow;