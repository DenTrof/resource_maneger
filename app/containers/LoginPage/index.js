/*
 * LoginPage
 *
 **/

import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, CardGroup, Card, CardBody, Button,
  Input, InputGroup, InputGroupAddon, InputGroupText, Alert,
} from 'reactstrap';
import SyncValidationForm from './SyncValidationForm';

import { Can } from 'ability-context';
import { loginAction } from 'containers/App/actions';


class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // let error = 'hello'
    const obj = { author: 'abcabc1' };
    return (<div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">

          <Col md="8">
            <CardGroup>
              <Card className="p-2">
                <CardBody>
                  {/* <Can do="create" on={obj}>*/}

                  {/* <div></div>*/}
                  {/* </Can>*/}
                  <h2>Login</h2>
                  <p />

                  {/* <div>руруру</div>*/}
                  {/* </Can>*/}
                  <SyncValidationForm onSubmit={this.logining.bind(this)} />
                  {/* <p className="text-muted">Sign In to your account</p>*/}
                </CardBody>
              </Card>

              <Card className="text-white bg-primary py-2 d-md-down-none" style={{ }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Resource Manager</h2>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
    );
  }

  logining = () => {
    const { login } = this.props;
    login();
  }

}
function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(loginAction()),
  };
}
export default connect(null, mapDispatchToProps)(LoginPage);
