import { useState } from "react";
import { observer } from "mobx-react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Grid from "./grid";
import ButtonRow from "./buttonRow";
import SelectedCommanders from "./selectedCommanders";
import GameStore from "../stores/GameStore";

const Frame = observer(({ cardsStore }) => {
    const [stage, setStage] = useState(1);
    const [selection, setSelection] = useState(true);
    const gameStore = new GameStore();

    return (
        selection
        ? <Container>
            <Grid
                cardsStore={cardsStore}
                gameStore={gameStore}
            />
            <ButtonRow
                cardsStore={cardsStore}
                gameStore={gameStore}
                setSelection={setSelection}
            />
        </Container>
        : <SelectedCommanders
            selectedCards={cardsStore.selectedCards}
            setSelection={setSelection}
        />
    )
});

Frame.proptypes = {
    cardsStore: PropTypes.object.isRequired
}

export default Frame;