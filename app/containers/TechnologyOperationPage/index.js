import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
   Card, CardBody, CardHeader,
} from 'reactstrap';
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
import TechEditor from './TechEditor';
import { makeSelectTehnology, makeValuesTehnologyForm } from './selectors';
import ModalValuesForm from './Forms/ModalValuesForm';
import { submitAction } from './actions';

const createTechEditor = (onUpdate, props) => (<TechEditor onUpdate={onUpdate} {...props} />);
export class TehnologyPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showEquipment: false,
      showTable: true,
      nameId: null,
      idPost: null,
      idTable: null,
      idEq: null,
      cellVal: true,
      cellValTd: true,
      buttonId: null,
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
    document.querySelector('#technological_operation tbody').onclick = (e) => {
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

      if (cell.tagName.toLowerCase() != 'td')
        return;
      const rowIndex = cell.parentNode.rowIndex;
      const idPostment = document.getElementsByTagName("tr")[rowIndex + 1];
      const idEquiTd = idPostment.getElementsByTagName("td")[2].innerHTML;
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
    const { technology } = this.props;
    const technologyData5 = technology.teсhnologyData[this.state.idTable];
    console.log('eqData55555555', technologyData5);
    if (technologyData5) {
      try {
        return axios.put(`http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation/${this.state.idEq}`,
          {
            name: technologyData5.name,
            group_operation_id: +(this.state.cellValTd ? technologyData5.group_operation_id : technologyData5.group_operation_id_id),
            unit: technologyData5.unit,
            production_area_id_id: +(technologyData5.group_operation_id),
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  reductPost = () => {
    this.setState({
      cellVal: false,
    });
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

  saveChangedData = () => {
    const { valuesForm } = this.props;
    const formData = valuesForm.TehnologyForm.values;
    const techData = this.props.technology.teсhnologyData;
    const psData = techData[techData.length - 1].id;
    const technology = {
      id: +psData + 1,
      name: `${formData.name}`,
      group_operation_id: `${this.state.nameId}`,
      unit: `${formData.unit}`,
    };
    const { savedata } = this.props;
    return savedata(technology);
  }

  reloadData = () => {
    location.reload();
  }

  formaterPostId = (cell, row) => {
    const postId = row.group_operation_id_id;
    return `${postId}`;
  }

  сustomDeleteButton = (cell, row) => (<button
    className="del-butt-marg"
    id={row.id}
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

  customConfirm = (next, row) => {
    if (confirm(`ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ УДАЛИТЬ ЭТУ ЗАПИСЬ ?`)) {
      next();
      try {
        return axios.delete(`http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation/${row[0]}`);
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
    const cellEditProp = {
      mode: 'click',
    };

    const selectRow = {
      mode: 'checkbox',
      bgColor: '#f5a8dd',
      customComponent: this.customMultiSelect,
    };
    const { technology } = this.props;
    const technologyTypes = technology.technologyTypes.map((item) => item.name);
    return (
      <div id="technological_operation">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>Справочник Технологические Операции</CardHeader>
            <CardBody>
              <TehnologyModal
                isOpen={this.state.showModal}
                toggleModal={this.toggleModalAddNew}
                saveChangedData={this.saveChangedData}
                reductPost={this.reductPost}
              />
              <BootstrapTable
                className="equipment-table"
                data={technology.teсhnologyData}
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
                  filter={{ type: 'TextFilter' }}
                  dataField="id"
                  dataSort
                >ID</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="name"
                  width="30%"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                >Наименование
                </TableHeaderColumn>
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="group_operation_id"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createTechEditor }}
                >Группа операций</TableHeaderColumn> :
                <TableHeaderColumn
                  dataField="group_operation_id_id"
                  dataFormat={this.formaterPostId}
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createTechEditor }}
                >Группа операций</TableHeaderColumn>}
                <TableHeaderColumn
                  dataField="unit"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                >Единица измерения
                </TableHeaderColumn>
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

class TehnologyModal extends React.Component {
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
    this.props.reductPost();
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


TehnologyPage.propTypes = {
  valuesForm: PropTypes.object,
  savedata: PropTypes.func,
  technology: PropTypes.object,
};

TehnologyModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  saveChangedData: PropTypes.func,
  reductPost: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    savedata: (technology) => dispatch(submitAction(technology)),
  };
}

const mapStateToProps = createStructuredSelector({
  technology: makeSelectTehnology(),
  valuesForm: makeValuesTehnologyForm(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'tehnology', reducer });
const withSaga = injectSaga({ key: 'tehnology', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TehnologyPage);
