import * as React from 'react';

import Select from "react-select";
import AddItemModal from "./AddItemModal";

export default function SelectComponent({list, value, label, setItem, field, apiEntity, isShort, onChange, isOnChange}) {
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
      const listIndex = list?.length > 0 ? list.findIndex((listItem) => listItem.id === value) : -1;
      if (listIndex !== -1) {
        setState({name: list[listIndex].name ? list[listIndex].name : list[listIndex].f_name, id: value })
      } else {
        setState({name: label, id: value })
      }
    }
    // eslint-disable-next-line
  }, [value])

  const handleChange = (value) => {
    if(isOnChange) {
      onChange(value);
      return;
    }
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
          {apiEntity && <button className="btn-link"></button> }
          {apiEntity && <button className="btn-add-icon" onClick={handleOpen}></button> }
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
      <div className={!isShort ? "select" : "select select_short"}>
        <Modal />
        <Select
          styles={customStyles}
          options={options}
          getOptionLabel={(option)=>option.name ? option.name : option.f_name}
          getOptionValue={(option)=>option.id}
          noOptionsMessage={() => "Ничего не найдено :("}
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