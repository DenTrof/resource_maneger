import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { logoutAction } from 'containers/App/actions';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from 'components_coreui/Header/';
import Sidebar from 'components_coreui/Sidebar/';
// import Breadcrumb from 'components_coreui/Breadcrumb/';
import Aside from 'components_coreui/Aside/';
import Footer from 'components_coreui/Footer/';

import StoragePage from 'containers/StoragePage';
import ManufacturePage from 'containers/ManufacturePage';
import PositionPage from 'containers/PositionPage';
import BranchPage from 'containers/BranchPage';
import ProductionAreaPage from 'containers/ProductionAreaPage';
import PostPage from 'containers/PostPage';
import ChangePage from 'containers/ChangePage';
import ChangePositionPage from 'containers/ChangePositionPage';
import EquipmentPage from 'containers/EquipmentPage';
import OperationGroupPage from 'containers/OperationGroupPage';
import TechnologyOperationPage from 'containers/TechnologyOperationPage';
import TechnologyProcessPage from 'containers/TechnologyProcessPage';
import TechnologyProcessContentPage from 'containers/TechnologyProcessContentPage';
import EquipmentOperationPage from 'containers/EquipmentOperationPage';
import OperationCostsPage from 'containers/OperationCostsPage';
import NomenclaturePage from 'containers/NomenclaturePage';
import EmployeesPage from 'containers/EmployeesPage';
import EmployeePage from 'containers/EmployeePage';
import StatusPage from 'containers/StatusPage';
import ShiftTimePage from 'containers/ShiftTimePage';
import ShiftTimeCardPage from 'containers/ShiftTimeCardPage';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header gravatar={this.props.gravatar} onLogout={this.props.logout} />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            {/* <Breadcrumb /> */}
            <Container fluid>
              <Switch>
                <Route path="/directory/position" name="Position" component={PositionPage} />
                <Route path="/directory/equipment" name="Equipment" component={EquipmentPage} />
                <Route path="/directory/branch" name="Branch" component={BranchPage} />
                <Route path="/directory/production" name="ProductionArea" component={ProductionAreaPage} />
                <Route path="/directory/post" name="Post" component={PostPage} />
                <Route path="/directory/change" name="Change" component={ChangePage} />
                <Route path="/change_position" name="ChangePosition" component={ChangePositionPage} />
                <Route path="/directory/operation" name="Operation" component={OperationGroupPage} />
                <Route path="/directory/tehnology" name="Tehnology" component={TechnologyOperationPage} />
                <Route path="/directory/process" name="Process" component={TechnologyProcessPage} />
                <Route path="/directory/techcontent" name="TechContent" component={TechnologyProcessContentPage} />
                <Route path="/directory/equioperation" name="EquiOperation" component={EquipmentOperationPage} />
                <Route path="/directory/opcosts" name="OpCosts" component={OperationCostsPage} />
                <Route path="/directory/nomenclature" name="Nomenclature" component={NomenclaturePage} />
                <Route path="/employees" name="Employees" component={EmployeesPage} />
                <Route path="/employee/:employeeId" name="Employee" component={EmployeePage} />
                <Route path="/status" name="Status" component={StatusPage} />
                <Route path="/shift" name="ShiftTime" component={ShiftTimePage} />
                <Route path="/shift_card" name="ShiftTimeCard" component={ShiftTimeCardPage} />
                <Route path="/storage" name="Storage" component={StoragePage} />
                <Route path="/manufacture" name="Manufacture" component={ManufacturePage} />
                <Redirect from="/" to="/directory/position" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction(false)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Full);
