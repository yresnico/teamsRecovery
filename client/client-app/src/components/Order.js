import { Card, ListGroup } from "react-bootstrap";

function Order(props) {
    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>{props.id}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{props.date}</ListGroup.Item>
                <ListGroup.Item>{props.quantity}</ListGroup.Item>
                <ListGroup.Item>{props.price}</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default Order;