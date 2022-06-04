import { useState } from "react";
import { observer } from "mobx-react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Grid from "./grid";
import ButtonRow from "./buttonRow";
import SelectedCommanders from "./selectedCommanders";

const Frame = observer(({ cardsStore }) => {
    const [stage, setStage] = useState(1);
    const [selection, setSelection] = useState(true);

    return (
        selection
        ? <Container>
            <Grid
                cardsStore={cardsStore}
                stage={stage}
                setStage={setStage}
            />
            <ButtonRow
                cardsStore={cardsStore}
                setSelection={setSelection}
                setStage={setStage}
                stage={stage}
            />
        </Container>
        : <SelectedCommanders 
            selectedCards={cardsStore.selectedCards}
        />
    )
});

Frame.proptypes = {
    cardsStore: PropTypes.object.isRequired
}

export default Frame;