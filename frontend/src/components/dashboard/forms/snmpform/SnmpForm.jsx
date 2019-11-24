import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {changeView, deleteSnmp} from "../../../../actions/dashboard";
import {view} from "../../DashboardModel";
import styles from "../common.less";
import {ButtonToolbar, Container} from "react-bootstrap";
import {DeleteModal} from "../../../common/DeleteModal/DeleteModal";
import {STATUS_PAGE_TYPE} from "../../../../commons/enums";

class SnmpForm extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.number,
    ip: PropTypes.string,
    interval: PropTypes.number,
    isActive: PropTypes.bool,
    platform: PropTypes.string,
    username: PropTypes.string,
    statusPageType: PropTypes.oneOf(Object.keys(STATUS_PAGE_TYPE)),
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      ip: props.ip ? props.ip : "",
      interval: props.interval ? props.interval : 3600,
      isActive: props.isActive ? props.isActive : false,
      platform: props.platform ? props.platform : "Linux",
      username: props.username ? props.username : "",
      authenticationPassword: "",
      privacyPassword: "",
      statusPageType: props.statusPageType ? props.statusPageType : "OFF",
      showDeleteModal: false
    };
  }

  render() {
    return (
      <Container>
        <div className={styles.form__header}>
          <h4>{"Snmp configuration"}</h4>
        </div>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label column={"ip"}>{"Ip"}</Form.Label>
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
            <Form.Label column={"is_active"}>{"Is active:"}</Form.Label>
            <FormControl
              type="checkbox"
              name="isActive"
              onChange={this.onChangeBoolean}
              checked={this.state.isActive}
            />
            <Form.Label column={"username"}>{"Username:"}</Form.Label>
            <FormControl
              type="text"
              name="username"
              onChange={this.onChange}
              value={this.state.username}
            />
            <Form.Label column={"authentication_password"}>
              {"Authentication Password:"}
            </Form.Label>
            <FormControl
              type="password"
              name="authenticationPassword"
              onChange={this.onChange}
              value={this.state.authenticationPassword}
            />
            <Form.Label column={"privacy_password"}>
              {"Privacy Password:"}
            </Form.Label>
            <FormControl
              type="password"
              name="privacyPassword"
              onChange={this.onChange}
              value={this.state.privacyPassword}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column={"statusPageType"}>{"Display on status page:"}</Form.Label>
            <FormControl
              as="select"
              name="statusPageType"
              key={this.state.statusPageType}
              value={STATUS_PAGE_TYPE[this.state.statusPageType]}
              onChange={this.onChangeEnum}
            >
              {Object.entries(STATUS_PAGE_TYPE).map(entry => <option key={entry[0]}>{entry[1]}</option>)}
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
            label={"Delete this snmp configuration"}
            show={this.state.showDeleteModal}
            onClose={() =>
              this.setState({...this.state, showDeleteModal: false})
            }
            onDelete={this.deleteSnmpConfiguration}
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
      [event.target.name]: Object.keys(STATUS_PAGE_TYPE).find(key => STATUS_PAGE_TYPE[key] === event.target.value)
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
      platform: this.state.platform,
      username: this.state.username,
      authentication_password: this.state.authenticationPassword,
      privacy_password: this.state.privacyPassword,
      display_type: this.state.statusPageType,
    };
    this.props.onSubmit(configuration);
  };

  onDetailsClick = () => {
    this.props.changeView(view.SNMP_OVERVIEW);
  };

  onDeleteClick = () => {
    this.setState({
      ...this.state,
      showDeleteModal: true
    });
  };

  deleteSnmpConfiguration = async () => {
    await this.props.deleteSnmp(this.props.serviceId, this.props.id);
    this.props.changeView(view.OVERVIEW);
  };
}

const mapStateToProps = state => ({
  serviceId: state.dashboard.selectedServiceId
});

export default connect(mapStateToProps, {changeView, deleteSnmp})(SnmpForm);
