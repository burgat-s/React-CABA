import React from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";

function About() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h1 className="display-4">About us</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet nulla auctor, vestibulum magna sed, convallis ex.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <Image
            src="https://picsum.photos/1024/768"
            alt="About us"
            className="img-fluid"
            rounded
          />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="h5">Our mission</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                sit amet nulla auctor, vestibulum magna sed, convallis ex.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="h5">Our values</h2>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Sed sit amet nulla auctor</li>
              </ul>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
