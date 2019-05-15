/**
 *
 * SponsorsPage
 *
 */
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import makeSelectTehnology from 'containers/TechnologyOperationPage/selectors';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectingFormData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import StorageItem from './StoregeItem';


export class StoregePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { makeData,
      // operations
    } = this.props;

    const storegePageItem = makeData.map((item) => {
      const dataDate = `${new Date(item.date).getDate()}/${new Date(item.date).getMonth() + 1}/${new Date(item.date).getFullYear()}`;
      return (<StorageItem
        key={item.id}
        id={item.id}
        date={dataDate}
        filials={item.filials}
        filialManager={item.filialManager}
        managerName={item.managerName}
        makeData={item.material}
        // operations={operations}
      />);
    });

    return (
      <div id="cmaccounts">
        {storegePageItem}
      </div>
    );
  }
}

StoregePage.propTypes = {
  // makeData: PropTypes.sting,
};

const mapStateToProps = createStructuredSelector({
  makeData: makeSelectingFormData(),
  //operations: makeSelectTehnology(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'storegePage', reducer });
const withSaga = injectSaga({ key: 'storegePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StoregePage);
