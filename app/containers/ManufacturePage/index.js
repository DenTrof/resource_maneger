/**
 *
 * ManufacturePage
 *
 */
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  Button,
} from 'reactstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectManufacturePage, makeFiltratedData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ManufacturePageItem from './ManufacturePageItem';
import DateRange from 'components/DateRange';

export class ManufacturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    searchValue: false,
    dataFiltered: false,
    toggle: false,
  }

  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  }
  storageMist = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  render() {
    const { dateMist } = this.props;

    let dataFiltered = '';
    if (this.state.searchValue) {
      dataFiltered = dateMist.filter((items) => items.manufactureStatus === this.state.searchValue);
    }

    const manufacturePageItem = this.state.searchValue ? dataFiltered.map((item) => <ManufacturePageItem key={item.id} id={item.id} manufacturePage={item.materialManuf} />) :
    dateMist.map((item) => (<ManufacturePageItem
      key={item.id}
      id={item.id}
      manufacturePage={item.materialManuf}
    />));
    return (
      <div id="cmaccounts">
        <Card>
          <CardHeader>
            <div className="card_f">
              <strong>ФИЛЬТРЫ: Статус заказа / Ошибки склада </strong>
            </div>
          </CardHeader>
          <CardBody className="manufacture-card-body">
            <Form
              style={{ display: 'flex', width: '100%' }}
            >
              <button
                style={{ borderRadius: '5px 0px 0px 5px', maxHeight: '36px' }}
                disabled
              ><i className="fa fa-search"></i>
              </button>
              <Input
                onChange={this.handleChange}
                type="select"
                name="select"
                id="select"
              >
                <option value="0">Выбрать</option>
                <option value="1">Заказ не выполнен</option>
                <option value="2">Заказ полностью не включён в план производства</option>
                <option value="3">Заказ частично не включён в план производства</option>
              </Input>
            </Form>
            <div className="date-picker">
              <Button
                onClick={this.storageMist}
                color="danger"
                type="button"
              ><i className="fa icon-layers"></i> Ошибки склада
            </Button>
              {this.state.toggle ? <DateRange /> : null}
            </div>
          </CardBody>
        </Card>
        {manufacturePageItem}
      </div>
    );
  }
}


ManufacturePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manufactureData: makeSelectManufacturePage(),
  dateMist: makeFiltratedData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manufacturePage', reducer });
const withSaga = injectSaga({ key: 'manufacturePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManufacturePage);
