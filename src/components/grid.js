import React from "react";
import { observer } from "mobx-react";
import { Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import CommanderCard from "./commanderCard";

const Grid = observer(({ 
    cardsStore,
    gameStore
}) => {
    const cardSelected = (index) => {
        const stage = gameStore.stage;
        //different Card updates based on stage
        //Stage 0 - 3 -> removing particular options
        //Stage 4 - 7 -> Selected Champions
        let cardSet = false;
        if (stage < 5) {
            cardSet = cardsStore.disableCard(index, stage);
        } else if (stage < 9) {
            cardSet = cardsStore.selectCard(index, stage - 4);
        }
        if (cardSet) gameStore.updateStage(stage + 1);
    }

    return (
        !cardsStore.cardsLoaded 
        ? <p>loading</p>
        : <Container>
            <Row>
                {cardsStore.cards.slice(0, 6).map((card, index) => (
                    <CommanderCard 
                        card={card}
                        number={index}
                        onClick={cardSelected} 
                    />
                ))}
            </Row>
            <Row>
                {cardsStore.cards.slice(6, 12).map((card, index) => (
                    <CommanderCard 
                        card={card}
                        number={index+6}
                        onClick={cardSelected} 
                    />
                ))}
            </Row>
            <Row>
                {cardsStore.cards.slice(12, 18).map((card, index) => (
                    <CommanderCard 
                        card={card}
                        number={index+12}
                        onClick={cardSelected} 
                    />
                ))}
            </Row>
            <Row>
                {cardsStore.cards.slice(18).map((card, index) => (
                    <CommanderCard 
                        card={card}
                        number={index+18}
                        onClick={cardSelected} 
                    />
                ))}
            </Row>
        </Container>
    );
})

Grid.proptypes = {
    cardsStore: PropTypes.object.isRequired,
    gameStore: PropTypes.object.isRequired
}

export default Grid;