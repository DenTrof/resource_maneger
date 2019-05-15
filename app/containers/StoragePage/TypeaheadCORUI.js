import React from 'react';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

export default class MyCustomInput extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     account: 1
  //   }
  //
  //   this.selectAccount = this.selectAccount.bind(this);
  //
  // }
  //
  // selectAccount(selected) {
  //   if (selected.length > 0)
  //     this.setState({ account: selected[0].label });
  // }


  render() {
    const accountsData = [
      { id: 1, label: 'Google' },
      { id: 2, label: 'Yandex' },
      { id: 3, label: 'Microsoft' },
      { id: 4, label: 'Apple' },
    ];


    // console.log(accountsData[0].value)
    return (
      <Typeahead
        emptyLabel="Ничего не найдено"
        options={accountsData}
        // onChange={this.selectAccount}
        // value={accountsData[0].label}
        placeholder="Enter Sponsor"
      />
    );
  }
}
