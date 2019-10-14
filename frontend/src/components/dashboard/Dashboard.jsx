import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import styles from "./Dashboard.less"
import {Service} from "../../actions/types";
import SideNav from "./sidenav/SideNav";

// TODO remove this when we will have actual data
const testArray = [
  {id: "1", name: "Web workout manager", value: 1},
  {id: "2", name: "My beautiful service", value: 2},
  {id: "3", name: "hltv.org", value: 3}
];

export class Dashboard extends React.Component {
  static propTypes = {
    services: PropTypes.arrayOf(PropTypes.shape(Service)),
  };

  render() {
    return (
      <div className={styles.dashboard}>
        <SideNav
          services={testArray}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Dashboard);