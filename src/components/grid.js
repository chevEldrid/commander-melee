import React, { useState } from "react";
import { observer } from "mobx-react";
import { Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import CommanderCard from "./commanderCard";

const Grid = observer(({ cardsStore }) => {
    const [stage, setStage] = useState(1);

    const cardSelected = (index, card) => {
        //different Card updates based on stage
        //Stage 0 - 3 -> removing particular options
        //Stage 4 - 7 -> Selected Champions
        let updatedCard = card;
        if (stage < 5) {
            updatedCard = { ...card, disabledBy: stage };
            setStage(stage + 1);
        } else if (stage < 9) {
            updatedCard = { ...card, selectedBy: stage - 4 };
            setStage(stage + 1);
        }
        cardsStore.updateCard(index, updatedCard);
    }

    return (
        <Container>
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
    cardsStore: PropTypes.object.isRequired
}

export default Grid;