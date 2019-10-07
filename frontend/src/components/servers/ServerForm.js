import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addServer } from "../../actions/servers";
import { Card, Form, FormControl, Button, Col } from "react-bootstrap";

export class ServerForm extends Component {
  state = {
    title: "Add Server",
    name: "Test",
    ip: "192.1.1.1",
    isActive: true,
    recurringTimeHours: 0,
    recurringTimeMinutes: 1,
    recurringTimeSeconds: 0
  };

  static propTypes = {
    addServer: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log(this.props.server);
    if (this.props.server !== undefined) {
      this.state = this.props.server;
    }
  }

  onChange = event => {
    if (event.target.type === "checkbox") {
      this.setState({ [event.target.name]: event.target.checked });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      name,
      ip,
      isActive,
      recurringTimeHours,
      recurringTimeMinutes,
      recurringTimeSeconds
    } = this.state;

    const recurringTime = `${recurringTimeHours}:${recurringTimeMinutes}:${recurringTimeSeconds}`;

    const server = { name, ip, isActive, recurringTime };
    this.props.addServer(server);
    this.setState({
      name: "Test",
      ip: "192.1.1.1",
      isActive: true,
      recurringTimeHours: 0,
      recurringTimeMinutes: 1,
      recurringTimeSeconds: 0
    });
  };

  render() {
    const {
      title,
      name,
      ip,
      isActive,
      recurringTimeHours,
      recurringTimeMinutes,
      recurringTimeSeconds
    } = this.state;
    return (
      <Card className="my-4">
        <Card.Body>
          <h2>{title}</h2>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <FormControl
                type="text"
                name="name"
                onChange={this.onChange}
                value={name}
              ></FormControl>
            </Form.Group>
            <Form.Group>
              <Form.Label>IP</Form.Label>
              <FormControl
                type="text"
                name="ip"
                onChange={this.onChange}
                value={ip}
              ></FormControl>
            </Form.Group>
            <Form.Group>
              <Form.Label>isActive</Form.Label>
              <FormControl
                type="checkbox"
                name="isActive"
                onChange={this.onChange}
                value={isActive}
                checked={isActive}
              ></FormControl>
            </Form.Group>
            <Form.Label>Recurring Time</Form.Label>
            <Form.Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Hours</Form.Label>
                <FormControl
                  type="number"
                  name="recurringTimeHours"
                  onChange={this.onChange}
                  value={recurringTimeHours}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Minutes</Form.Label>
                <Form.Control
                  type="number"
                  name="recurringTimeMinutes"
                  onChange={this.onChange}
                  value={recurringTimeMinutes}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Seconds</Form.Label>
                <Form.Control
                  type="number"
                  name="recurringTimeSeconds"
                  onChange={this.onChange}
                  value={recurringTimeSeconds}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Button type="submit" varinat="primary">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default connect(
  null,
  { addServer }
)(ServerForm);
