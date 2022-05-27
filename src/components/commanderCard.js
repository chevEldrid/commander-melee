import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function CommanderCard({ card, number, onClick }) {
    return (
        <Col sm>
            <Card 
                hoverable
                onClick={() => onClick(number)}
            >
                <Card.Body>{card.name}</Card.Body>
            </Card>
        </Col>
    )
}

CommanderCard.propTypes  = {
    card: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}

export default CommanderCard;