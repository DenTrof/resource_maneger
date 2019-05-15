/**
 *
 * StartStopButton
 *
 */

import React from 'react';
// import styled from 'styled-components';
import { Button } from 'reactstrap';

function StartStopButton(props) {
  // console.log(props)
  if (props.status === 'starting') {
    return <Button className="start_stop" color="danger"><b>Stop</b></Button>;
  }
  if (props.status === 'started') {
    return <Button className="start_stop" color="danger"><b>Stop</b></Button>;
  }
  if (props.status === 'stopping') {
    return <Button className="start_stop" color="success"><b>Start</b></Button>;
  }
  if (props.status === 'stoped') {
    return <Button className="start_stop" color="success"><b>Start</b></Button>;
  }
  if (props.status === 'error') {
    return <Button className="start_stop" color="dark"><b>Error</b></Button>;
  }
  return <div></div>;
}

StartStopButton.propTypes = {

};

export default StartStopButton;

