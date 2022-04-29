import * as React from 'react';

import Select from "react-select";
import AddItemModal from "./AddItemModal";

export default function SelectComponent({list, value, label, setItem, field, apiEntity}) {
  const [options, setOptions] = React.useState([]);

  // Select value
  const [state, setState] = React.useState({ name: label, id: 0 });

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  React.useEffect(() => {
    setOptions(list)
    // eslint-disable-next-line
  }, [list])

  React.useEffect(() => {
    if(value) {
      const listIndex = list.findIndex((listItem) => listItem.id === value)
      if (listIndex !== -1) {
        setState({name: list[listIndex].name, id: value })
      }
    }
    // eslint-disable-next-line
  }, [value])

  const handleChange = (value) => {
    setItem(prevItem => ({
      ...prevItem,
      [field]: value.id
    }));
    setState(value)
  }

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

  const CustomMenuType = ({ innerRef, innerProps, isDisabled, children }) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
        {children}
        <div className="customReactSelectFooter">
          {/*<button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>*/}
          <button className="btn-link"></button>
          <button className="btn-add-icon" onClick={handleOpen}></button>
        </div>
      </div>
    ) : null;

  const Modal = () => {
    return (
      <>
        <AddItemModal
          open={open}
          setOpen={setOpen}
          label={label}
          apiEntity={apiEntity}
          setOptions={setOptions}
        />
      </>
    )
  };

  return (
    <>
      <div className="select">
        <Modal />
        <Select
          styles={customStyles}
          options={options}
          getOptionLabel={(option)=>option.name}
          getOptionValue={(option)=>option.id}
          value={state}
          components={{Menu: CustomMenuType}}
          onChange={value => handleChange(value)}
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