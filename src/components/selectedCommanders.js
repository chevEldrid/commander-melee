import PropTypes from "prop-types";
import { Container, Row } from "react-bootstrap";

const SelectedCommanders = ({ selectedCards }) => {
    return (
        <Container>
            {selectedCards.map(card => (
                <Row>
                    <p>
                        {card.name}:&nbsp;
                        <a href={card.url} target='_blank'>decklist</a>
                    </p>
                </Row>
            ))}
        </Container>
    )
}

SelectedCommanders.propTypes = {
    selectedCards: PropTypes.array.isRequired
}

export default SelectedCommanders;

