import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {changeView, deletePing} from "../../../../actions/dashboard";
import {view} from "../../DashboardModel";
import styles from "../common.less";
import {ButtonToolbar, Container} from "react-bootstrap";
import {DeleteModal} from "../../../common/delete-modal/DeleteModal";
import {STATUS_PAGE_TYPE} from "../../../../commons/enums";

class PingForm extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    label: PropTypes.string.isRequired,
    ip: PropTypes.string,
    interval: PropTypes.number,
    isActive: PropTypes.bool,
    timeout: PropTypes.number,
    numberOfRequests: PropTypes.number,
    statusPageType: PropTypes.oneOf(Object.keys(STATUS_PAGE_TYPE)),
    emailNotifications: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired
  };

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  constructor(props) {
    super(props);
    this.state = {
      ip: props.ip ? props.ip : "",
      interval: props.interval ? props.interval : 1000,
      isActive: props.isActive ? props.isActive : false,
      numberOfRequests: props.numberOfRequests ? props.numberOfRequests : 4,
      timeout: props.timeout ? props.timeout : 15,
      statusPageType: props.statusPageType ? props.statusPageType : "OFF",
      emailNotifications: props.emailNotifications ? props.emailNotifications : false,
      showDeleteModal: false
    };
  }

  render() {
    return (
      <Container className={styles.container}>
        <div className={styles.form__header}>
          <h4>{"Ping configuration"}</h4>
        </div>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label column={"ip"}>{"Ip:"}</Form.Label>
            <FormControl
              type="text"
              name="ip"
              onChange={this.onChange}
              value={this.state.ip}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column={"interval"}>
              {"Interval (in seconds):"}
            </Form.Label>
            <FormControl
              type="number"
              name="interval"
              onChange={this.onChange}
              value={this.state.interval}
            />
            <Form.Group>
              <Form.Label column={"isActive"}>
                {"Is active:"}
              </Form.Label>
              <FormControl
                as="select"
                name="isActive"
                key={this.state.isActive}
                value={this.state.isActive ? "Enabled" : "Disabled"}
                onChange={this.onChangeBoolean}
              >
                <option key={false}>{"Disabled"}</option>
                <option key={true}>{"Enabled"}</option>
              </FormControl>
            </Form.Group>
            <Form.Label column={"number_of_requests"}>
              {"Number of requests:"}
            </Form.Label>
            <FormControl
              type="number"
              name="numberOfRequests"
              onChange={this.onChange}
              value={this.state.numberOfRequests}
            />
            <Form.Label column={"timeout"}>{"Timeout:"}</Form.Label>
            <FormControl
              type="number"
              name="timeout"
              onChange={this.onChange}
              value={this.state.timeout}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column={"statusPageType"}>
              {"Display on status page:"}
            </Form.Label>
            <FormControl
              as="select"
              name="statusPageType"
              key={this.state.statusPageType}
              value={STATUS_PAGE_TYPE[this.state.statusPageType]}
              onChange={this.onChangeEnum}
            >
              {Object.entries(STATUS_PAGE_TYPE).map(entry => (
                <option key={entry[0]}>{entry[1]}</option>
              ))}
            </FormControl>
          </Form.Group>
          <Form.Group>
            <Form.Label column={"emailNotifications"}>
              {"Email notifications:"}
            </Form.Label>
            <FormControl
              as="select"
              name="emailNotifications"
              key={this.state.emailNotifications}
              value={this.state.emailNotifications ? "Enabled" : "Disabled"}
              onChange={this.onChangeBoolean}
            >
              <option key={false}>{"Disabled"}</option>
              <option key={true}>{"Enabled"}</option>
            </FormControl>
          </Form.Group>
          <ButtonToolbar className={styles.form__buttons}>
            <Button type="submit" variant="success">
              {this.props.label}
            </Button>
            {this.props.id && (
              <>
                <Button variant="primary" onClick={this.onDetailsClick}>
                  {"Details"}
                </Button>
                <Button variant="danger" onClick={this.onDeleteClick}>
                  {"Delete"}
                </Button>
              </>
            )}
          </ButtonToolbar>
          <DeleteModal
            label={"Delete this ping configuration"}
            show={this.state.showDeleteModal}
            onClose={() =>
              this.setState({...this.state, showDeleteModal: false})
            }
            onDelete={this.deletePingConfiguration}
          />
        </Form>
      </Container>
    );
  }

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  onChangeEnum = event => {
    this.setState({
      ...this.state,
      [event.target.name]: Object.keys(STATUS_PAGE_TYPE).find(
        key => STATUS_PAGE_TYPE[key] === event.target.value
      )
    });
  };

  onChangeBoolean = event => {
    this.setState({
      ...this.state,
      [event.target.name]: !this.state[event.target.name]
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const configuration = {
      ip: this.state.ip,
      interval: this.state.interval,
      is_active: this.state.isActive,
      number_of_requests: this.state.numberOfRequests,
      timeout: this.state.timeout,
      display_type: this.state.statusPageType,
      email_notifications: this.state.emailNotifications
    };
    this.props.onSubmit(configuration);
  };

  onDetailsClick = () => {
    this.props.changeView(view.PING_OVERVIEW);
  };

  onDeleteClick = () => {
    this.setState({
      ...this.state,
      showDeleteModal: true
    });
  };

  deletePingConfiguration = async () => {
    await this.props.deletePing(this.props.serviceId, this.props.id);
    this.props.changeView(view.OVERVIEW);
  };
}

const mapStateToProps = state => ({
  serviceId: state.dashboard.selectedServiceId
});

export default connect(mapStateToProps, {changeView, deletePing})(PingForm);
