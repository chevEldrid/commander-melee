import PropTypes from "prop-types";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

const SelectedCommanders = ({ selectedCards, setSelection }) => {
    return (
        <Container>
            <Row>
                {selectedCards.map(card => (
                    <Col md="2">
                        <a href={card.url} target='_blank'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{card.name}</Card.Title>
                                    <Image 
                                        src={card.img}
                                        fluid
                                    />
                                </Card.Body>
                            </Card>
                        </a>
                    </Col>
                ))}
            </Row>
            <Button
                variant="secondary"
                onClick={() => setSelection(true)}
            >
                Back
            </Button>
        </Container>
    )
}

SelectedCommanders.propTypes = {
    selectedCards: PropTypes.array.isRequired,
    setSelection: PropTypes.func.isRequired
}

export default SelectedCommanders;

