import * as React from 'react';

import Select from "react-select";

export default function SelectComponent() {

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected || state.isFocused ? 'white' : 'black',
      background: state.isSelected || state.isFocused ? '#7196ff' : 'white',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }

  const options = [
    { value: '0', label: 'Поставщик', isDisabled: true},
    { value: 'saab', label: 'Поставщик1' },
    { value: 'opel', label: 'Поставщик2' },
    { value: 'audi', label: 'Поставщик3' },
  ];

  const CustomMenuType = ({ innerRef, innerProps, isDisabled, children }) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
        {children}
        <div className="customReactSelectFooter">
          <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
          <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
        </div>
      </div>
    ) : null;

  return (
    <>
      <div className="select">
        <Select
          styles={customStyles}
          options={options}
          defaultValue={options[0]}
          components={{Menu: CustomMenuType}}
          theme={(theme) => ({
            ...theme,
            borderRadius: 12,
            colors: {
              ...theme.colors,
              primary25: '#4369cf',
              primary: '#7196ff',
            },
          })}
        >
        </Select>
      </div>
    </>
  );
}