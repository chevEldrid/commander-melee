import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function CommanderCard({ card, number, onClick }) {
    return (
        <Col sm>
            <Card 
                hoverable
                onClick={() => onClick(number, card)}
                className={
                    `enabled${card.selectedBy} ${card.disabledBy > 0 ? 'disabled' : 'enabled'}`
                }
            >
                <Card.Body>
                    <Card.Title>{card.name}</Card.Title>
                </Card.Body>
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