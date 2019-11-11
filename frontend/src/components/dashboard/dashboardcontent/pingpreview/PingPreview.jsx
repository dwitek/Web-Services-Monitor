import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import styles from "./PingPreview.less"
import {Badge, Button, ButtonToolbar, Container, Nav} from "react-bootstrap";
import {convertFromUTC} from "../../../../commons/utils";
import {view} from "../../DashboardModel";
import {changeView, selectPing, selectService} from "../../../../actions/dashboard";
import {HorizontalGridLines, VerticalRectSeries, XAxis, XYPlot, YAxis} from "react-vis";
import VerticalBarSeries from "react-vis/es/plot/series/vertical-bar-series";

class PingPreview extends React.Component {
  static propTypes = {
    serviceId: PropTypes.number.isRequired,
    model: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={styles.pingPreview}>
        <h4 className={styles.pingPreview__header}>
          {"Ping configuration"}
        </h4>
        <div className={styles.pingPreview__content}>
          {this.renderLeftColumn()}
          {this.renderRightColumn()}
        </div>
        <ButtonToolbar>
          <Button
            className={styles.pingPreview__button}
            variant={"primary"}
            onClick={this.onDetailsClick}
          >
            {"Details"}
          </Button>
          <Button
            className={styles.pingPreview__button}
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
      <div className={styles.pingPreview__leftColumn}>
        <span className={styles.pingPreview__label}>{"Ip:"}</span><br/>
        <span>{this.props.model.ip}</span><br/>

        <span className={styles.pingPreview__label}>{"Status:"}</span><br/>
        {this.props.model.is_active ?
          <Badge pill={true} variant="success">{"enabled"}</Badge> :
          <Badge pill={true} variant="danger">{"disabled"}</Badge>
        }<br/>

        <span className={styles.pingPreview__label}>{"Interval:"}</span><br/>
        <span>{this.props.model.interval}{" seconds"}</span><br/>

        <span className={styles.pingPreview__label}>{"Timeout:"}</span><br/>
        <span>{this.props.model.timeout}{" seconds"}</span><br/>

        <span className={styles.pingPreview__label}>{"Number of requests:"}</span><br/>
        <span>{this.props.model.number_of_requests}</span><br/>
      </div>
    )
  };

  renderRightColumn = () => {
    return (
      <div className={styles.pingPreview__rightColumn}>
        <span className={styles.pingPreview__label}>{"Created at:"}</span><br/>
        <span>{convertFromUTC(this.props.model.created_at)}</span><br/>

        <span className={styles.pingPreview__label}>{"Last modified at:"}</span><br/>
        <span>{convertFromUTC(this.props.model.updated_at)}</span><br/>

        <span className={styles.pingPreview__label}>{"Percentage of failure in last"}</span><br/>
        <XYPlot
          width={180}
          height={120}
          stackBy="y"
          xType="ordinal"
          yDomain={[0, 100]}
        >
          <HorizontalGridLines/>
          <XAxis/>
          <YAxis/>
          <VerticalBarSeries barWidth={0.7} color={"#af1c21"} data={this.translateErrorPercentage(5, 20, 70)}/>
        </XYPlot>
      </div>
    )
  };

  onDetailsClick = () => {
    this.props.selectPing(this.props.model);
    this.props.changeView(view.PING_OVERVIEW);
  };

  onConfigurationClick = () => {
    this.props.selectPing(this.props.model);
    this.props.changeView(view.EDIT_PING);
  };

  translateErrorPercentage = (day, week, month) => {
    const monthData = {x: "month", y: month};
    const weekData = {x: "week", y: week};
    const dayData = {x: "day", y: day};
    return [monthData, weekData, dayData];
  }
}


const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {selectService, changeView, selectPing},
)(PingPreview);
