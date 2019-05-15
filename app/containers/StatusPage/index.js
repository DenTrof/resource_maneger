import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Card, CardBody, CardHeader } from 'reactstrap';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { makeSelectStatus, makeValuesStatusForm } from './selectors';
import ModalValuesForm from './Forms/ModalValuesForm';
import { submitAction } from './actions';

export class StatusPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      nameId: null,
      idEquip: null,
      idTable: null,
      idEq: null,
      cellVal: true,
      cellValTd: true,
    };

    this.toggleModalAddNew = this.toggleModalAddNew.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
      const postId = e.target.value;
      if (postId) {
        this.setState({
          nameId: postId,
        });
      }
    });
  }

  componentDidUpdate() {
    document.querySelector('#status tbody').onclick = (e) => {
      const cell = e.target;
      if (cell.tagName.toLowerCase() === 'div') {
        this.setState({
          cellVal: !this.state.cellVal,
          buttonId: cell.id,
        });
      }

      if (cell.tagName.toLowerCase() === 'td') {
        this.setState({
          cellValTd: false,
        });
      }

      if (cell.tagName.toLowerCase() != 'td') { return; }
      const rowIndex = cell.parentNode.rowIndex;
      const idEquipment = document.getElementsByTagName('tr')[rowIndex + 1];
      const idEquiTd = idEquipment.getElementsByTagName('td')[2].innerHTML;
      this.setState({
        idTable: rowIndex,
        idEq: idEquiTd,
      });
    };

    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.saveAllData();
      }
    });
  }

  saveAllData = () => {
    const { status } = this.props;
    const statData = status.statusData[this.state.idTable];
    // console.log('eqData55555555', statData);
    if (statData) {
      try {
        return axios.put(`http://manufacture-service-api.dn-kronas.local/api/web/v1/order-status/${this.state.idEq}`,
          {
            name: statData.name,
            description: statData.description,
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  toggleModalAddNew() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  createCustomDeleteButton = (onBtnClick) => (
    <button id="position-delete" style={{ color: 'red' }} onClick={onBtnClick}>
      <i className="fa icon-trash"></i>
    </button>
  )
  createCustomInsertButton = () => (
    <div>
      <button
        className="add_position-button"
        onClick={this.toggleModalAddNew}
      >
        Добавить
    </button>
      <button
        className="position_delete"
        onClick={this.сustomDelete}
      ><i className="fa icon-trash"></i> Удалить
      </button>
      <button
        className="position_reload"
        onClick={this.reloadData}
      ><i className="fa icon-action-redo"></i>
      </button>
    </div>
  )

  reloadData = () => {
    location.reload();
  }

  saveChangedData = () => {
    const { valuesForm } = this.props;
    const data = valuesForm.StatusForm.values;
    console.log('AAAAA', data.name)
    // const equData = this.props.status.statusData;
    // const eqData = equData[equData.length - 1].id;
    const status = {
      // id: +eqData + 1,
      name: `${data.name}`,
      description: `${data.description}`,
    };
    const { savedata } = this.props;
    return savedata(status);
  }

  сustomDeleteButton = () => (<button
    className="del-butt-marg"
    style={{ color: 'red' }}
    onClick={this.сustomDelete}
  ></button>)
  сustomDelete = () => {
    document.querySelector('#position-delete').click();
  }

  customMultiSelect(props) {
    const { type, disabled, onChange, rowIndex } = props;
    if (rowIndex === 'Header') {
      return (
        <div className="checkbox-personalized">
          <Checkbox {...props} />
          <label htmlFor={`checkbox${rowIndex}`}>
            <div className="check"></div>
          </label>
        </div>);
    }
    return (
      <div className="checkbox-personalized">
        <input
          type={type}
          name={`checkbox${rowIndex}`}
          id={rowIndex}
          disabled={disabled}
          onChange={(e) => onChange(e, rowIndex)}
        />
      </div>);
  }
  // --------------------------------------------------------------------------------------
  customConfirm = (next, row) => {
    console.log(row[0])
    if (confirm('ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ УДАЛИТЬ ЭТУ ЗАПИСЬ ?')) {
      next();
      try {
        return axios.delete(`http://manufacture-service-api.dn-kronas.local/api/web/v1/order-status/${row[0]}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    const options = {
      handleConfirmDeleteRow: this.customConfirm,
      deleteBtn: this.createCustomDeleteButton,
      insertBtn: this.createCustomInsertButton,
      page: 1,  // which page you want to show as default
      sizePerPage: 15,  // which size per page you want to locate as default
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
    const cellEditProp = {
      mode: 'click',
    };
    const selectRow = {
      mode: 'checkbox',
      bgColor: '#f5a8dd',
      clickToSelect: true,
    };

    const { status } = this.props;
    return (
      <div id="status">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>Справочник Статусы</CardHeader>
            <CardBody>
              <StatusModal
                isOpen={this.state.showModal}
                toggleModal={this.toggleModalAddNew}
                saveChangedData={this.saveChangedData}
              />
              <BootstrapTable
                data={status.statusData}
                striped
                hover
                pagination
                options={options}
                insertRow
                cellEdit={cellEditProp}
                selectRow={selectRow}
                deleteRow
                version="4"
              >
                <TableHeaderColumn
                  width="0%"
                  dataField="id"
                  dataFormat={this.сustomDeleteButton}
                  dataAlign="center"
                ><button
                  className="del-butt-marg"
                  onClick={this.сustomDelete}
                ></button>
                </TableHeaderColumn>
                <TableHeaderColumn
                  isKey
                  width="10%"
                  dataField="id"
                  dataSort
                >ID</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="name"
                  dataSort
                >Наименование</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="description"
                >Описание</TableHeaderColumn>
              </BootstrapTable>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

class Checkbox extends React.Component {
  render() {
    return (
      <input
        className="react-bs-select-all"
        type="checkbox"
        name={`checkbox${this.props.rowIndex}`}
        id={`checkbox${this.props.rowIndex}`}
      />
    );
  }
}

class StatusModal extends React.Component {
  constructor(props) {
    super(props);
    const { isOpen } = this.props;
    this.state = {
      showModal: isOpen || false,
      account: 1,
    };
  }

  onSubmit = () => {
    this.toggleModal();
    this.saveData();
  }

  toggleModal = () => {
    this.props.toggleModal();
  }

  saveData = () => {
    this.props.saveChangedData();
  }

  render() {
    return (this.props.isOpen ? <ModalValuesForm handleSubmit={this.onSubmit} /> : null);
  }
}

StatusPage.propTypes = {
  valuesForm: PropTypes.object,
  savedata: PropTypes.func,
  status: PropTypes.object,
};

StatusModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  saveChangedData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    savedata: (status) => dispatch(submitAction(status)),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  valuesForm: makeValuesStatusForm(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'status', reducer });
const withSaga = injectSaga({ key: 'status', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StatusPage);
