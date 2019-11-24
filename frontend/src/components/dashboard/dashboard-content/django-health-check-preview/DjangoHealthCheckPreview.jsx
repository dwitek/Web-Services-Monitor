import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./DjangoHealthCheckPreview.less";
import { Badge, Button, ButtonToolbar } from "react-bootstrap";
import { convertFromUTC } from "../../../../commons/dateUtils";
import { view } from "../../DashboardModel";
import {
  changeView,
  selectDjangoHealthCheck,
  selectService
} from "../../../../actions/dashboard";
import { HorizontalGridLines, XAxis, XYPlot, YAxis } from "react-vis";
import VerticalBarSeries from "react-vis/es/plot/series/vertical-bar-series";

class DjangoHealthCheckPreview extends React.Component {
  static propTypes = {
    serviceId: PropTypes.number.isRequired,
    model: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.djangoHealthCheckPreview}>
        <h4 className={styles.djangoHealthCheckPreview__header}>
          {"Django Health Check configuration"}
        </h4>
        <div className={styles.djangoHealthCheckPreview__content}>
          {this.renderLeftColumn()}
          {this.renderRightColumn()}
        </div>
        <ButtonToolbar>
          <Button
            className={styles.djangoHealthCheckPreview__button}
            variant={"primary"}
            onClick={this.onDetailsClick}
          >
            {"Details"}
          </Button>
          <Button
            className={styles.djangoHealthCheckPreview__button}
            variant={"primary"}
            onClick={this.onConfigurationClick}
          >
            {"Configuration"}
          </Button>
        </ButtonToolbar>
      </div>
    );
  }

  renderLeftColumn = () => {
    return (
      <div className={styles.djangoHealthCheckPreview__leftColumn}>
        <span className={styles.djangoHealthCheckPreview__label}>{"Ip:"}</span>
        <br />
        <span>{this.props.model.ip}</span>
        <br />

        <span className={styles.djangoHealthCheckPreview__label}>
          {"Status:"}
        </span>
        <br />
        {this.props.model.is_active ? (
          <Badge pill={true} variant="success">
            {"enabled"}
          </Badge>
        ) : (
          <Badge pill={true} variant="danger">
            {"disabled"}
          </Badge>
        )}
        <br />

        <span className={styles.djangoHealthCheckPreview__label}>
          {"Interval:"}
        </span>
        <br />
        <span>
          {this.props.model.interval}
          {" seconds"}
        </span>
        <br />
      </div>
    );
  };

  renderRightColumn = () => {
    return (
      <div className={styles.djangoHealthCheckPreview__rightColumn}>
        <span className={styles.djangoHealthCheckPreview__label}>
          {"Created at:"}
        </span>
        <br />
        <span>{convertFromUTC(this.props.model.created_at)}</span>
        <br />

        <span className={styles.djangoHealthCheckPreview__label}>
          {"Last modified at:"}
        </span>
        <br />
        <span>{convertFromUTC(this.props.model.updated_at)}</span>
        <br />

        <span className={styles.djangoHealthCheckPreview__label}>
          {"Percentage of failure in last"}
        </span>
        <br />
        <XYPlot
          width={180}
          height={120}
          stackBy="y"
          xType="ordinal"
          yDomain={[0, 100]}
        >
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            barWidth={0.7}
            color={"#af1c21"}
            data={this.translateErrorPercentage(
              this.props.model.error_percentage
            )}
          />
        </XYPlot>
      </div>
    );
  };

  onDetailsClick = () => {
    this.props.selectDjangoHealthCheck(this.props.model);
    this.props.changeView(view.DJANGO_HEALTH_CHECK_OVERVIEW);
  };

  onConfigurationClick = () => {
    this.props.selectDjangoHealthCheck(this.props.model);
    this.props.changeView(view.EDIT_DJANGO_HEALTH_CHECK);
  };

  translateErrorPercentage = error_percentage => {
    const weekData = { x: "week", y: error_percentage.week };
    const dayData = { x: "day", y: error_percentage.day };
    const hourData = { x: "hour", y: error_percentage.hour };
    return [weekData, dayData, hourData];
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  selectService,
  changeView,
  selectDjangoHealthCheck
})(DjangoHealthCheckPreview);
