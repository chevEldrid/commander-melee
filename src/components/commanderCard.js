import { Card, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";

function CommanderCard({ card, number, onClick }) {
    return (
        <Col md="2">
            <Card
                onClick={() => onClick(number)}
                className={
                    `enabled${card.selectedBy.slice(-1)[0]} 
                    ${card.disabledBy > 0 ? 'disabled' : 'enabled'}`
                }
            >
                <Card.Body>
                    <Card.Title>{card.name}</Card.Title>
                    <Image
                        src={card.img}
                        fluid
                    />
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