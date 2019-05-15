import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Card, CardBody, CardHeader,
} from 'reactstrap';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { makeSelectShift, makeValuesShiftForm } from './selectors';
import ModalValuesForm from './Forms/ModalValuesForm';
import { submitAction } from './actions';

export class ShiftTimeCardPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      nameId: null,
      startTime: null,
      finishTime: null,
    };
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
      const areaId = e.target.value;
      if (areaId) {
        this.setState({
          nameId: areaId,
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {

    // const { valuesForm } = this.props;
    // const formData = valuesForm.ShiftForm.values;
    // const startTime = formData !== undefined ? `${new Date(formData.start).getFullYear()}-${(new Date(formData.start).getMonth() + 1) < 10 ? '0' + (new Date(formData.start).getMonth() + 1) : new Date(formData.start).getMonth() + 1}-${(new Date(formData.start).getDate()) < 10 ? "0" + (new Date(formData.start).getDate()) : new Date(formData.start).getDate()}` : null;
    // const finishTime = formData !== undefined ? `${new Date(formData.finish).getFullYear()}-${(new Date(formData.finish).getMonth() + 1) < 10 ? '0' + (new Date(formData.finish).getMonth() + 1) : new Date(formData.finish).getMonth() + 1}-${(new Date(formData.finish).getDate()) < 10 ? "0" + (new Date(formData.finish).getDate()) : new Date(formData.finish).getDate()}` : null;
    // this.saveDataTime(startTime, finishTime);
    // console.log(formData);

    // if (this.state.nameId !== prevState.nameId || this.state.startTime !== prevState.startTime || this.state.finishTime !== prevState.finishTime) {
    //   axios.get(`http://manufacture-service-api.dn-kronas.local/api/web/v1/work-shift/shift-time?id=${this.state.nameId}&start_period=${this.state.startTime}&period_end=${this.state.finishTime}`)
    //     .then((res) => {
    //       this.setState({
    //         data: res.data,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }

  saveDataTime = (startTime, finishTime) => {
    this.setState({
      startTime,
      finishTime,
    });
  }

  render() {
    const options = {
      // deleteBtn: this.createCustomDeleteButton,
      // insertBtn: this.createCustomInsertButton,
      page: 1,  // which page you want to show as default
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5,  // the pagination bar size.
      prePage: '<<', // Previous page button text
      nextPage: '>>', // Next page button text
      firstPage: 'Первая', // First page button text
      lastPage: 'Последняя', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      hideSizePerPage: true, // You can hide the dropdown for sizePerPage
    };

    const { shift } = this.props;
    // const changeTypes = change.changeTypes ? change.changeTypes.map((item) => item.name): null;

    return (
      <div id="shift">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>Карточка Планирование Смен</CardHeader>
            <CardBody>
              {/* <ModalValuesForm /> */}
              <BootstrapTable
                className="equipment-table shift1"
                data={shift.shiftData}
                striped
                hover
                options={options}
                version="4"
              >
                <TableHeaderColumn
                  isKey
                  dataField="id"
                  width="4%"
                  className="td-header"
                >ID</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="date"
                  dataSort
                  className="td-header"
                >Время</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="start_shift"
                  dataSort
                  className="td-header"
                >Номер закза
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="shift_end"
                  dataSort
                  className="td-header"
                >Операция
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="post_id"
                  dataSort
                  className="td-header"
                >Колличество
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="shift_number"
                  dataSort
                  className="td-header"
                >Материалы
                </TableHeaderColumn>
              </BootstrapTable>

              <BootstrapTable
                className="equipment-table shift"
                data={shift.shiftData}
                striped
                hover
                // pagination
                options={options}
                version="4"
              >
                <TableHeaderColumn
                  isKey
                  dataField="id"
                  row="0"
                  rowSpan="2"
                  width="4%"
                  className="td-header1"
                >ID</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="date"
                  row="0"
                  rowSpan="2"
                  dataSort
                  className="td-header1"
                >Номер закза</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="start_shift"
                  row="0"
                  rowSpan="2"
                  dataSort
                  className="td-header1"
                >Материалы
                </TableHeaderColumn>
                <TableHeaderColumn
                  row="0"
                  colSpan="6"
                  dataAlign="center"
                  className="td-header1"
                >
                  Группы услуг
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="shift_end"
                  row="1"
                  className="td-header1"
                >Порезка
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="post_id"
                  row="1"
                  className="td-header1"
                >Прямая кромковка
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="shift_end"
                  row="1"
                  className="td-header1"
                >Кривол. кромковка
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="post_id"
                  row="1"
                  className="td-header1"
                >Отверстия
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="shift_end"
                  row="1"
                  className="td-header1"
                >Фрезерование
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="post_id"
                  row="1"
                  className="td-header1"
                >Упаковка
                </TableHeaderColumn>
              </BootstrapTable>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

ShiftTimeCardPage.propTypes = {
  valuesForm: PropTypes.object,
  shift: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    savedata: (change) => dispatch(submitAction(change)),
  };
}

const mapStateToProps = createStructuredSelector({
  shift: makeSelectShift(),
  valuesForm: makeValuesShiftForm(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'shift', reducer });
const withSaga = injectSaga({ key: 'shift', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShiftTimeCardPage);
