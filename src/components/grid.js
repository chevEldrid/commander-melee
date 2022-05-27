import { Container, Row } from "react-bootstrap";
import CommanderCard from "./commanderCard";

function Grid() {
    //this will move to a store. 
    //- store populates from fetch, then iterate through for each card
    const card = {
        name: 'Test123',
    }

    const cards = Array(24).fill(card);

    const cardClicked = (index) => {
        console.log(`you clicked card #${index}`);
    }

    return (
        <Container>
            <Row>
                {cards.map((card, index) => (
                    <CommanderCard 
                        card={card}
                        number={index}
                        onClick={cardClicked} 
                    />
                ))}
            </Row>
        </Container>
    );
}

export default Grid;