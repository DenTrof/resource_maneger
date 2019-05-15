import React from 'react';

export const TypeaheadComponent = (props) => {
  const renderSelectOptions = (key, index) => (
    <option
      key={`${index}-${key}`}
      value={key}
    >
      {props.options[key]}
    </option>
    );

  if (props && props.options) {
    return (
      <div className="w-100">
        <select {...props.input} className=" w-100">
          <option value=""> </option>
          {Object.keys(props.options).map(renderSelectOptions)}
        </select>
      </div>
    );
  }
  return <div></div>;
};

export default TypeaheadComponent;
