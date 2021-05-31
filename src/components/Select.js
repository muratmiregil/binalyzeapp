import React, { useEffect, useState, useRef } from "react";
import Icon from "./icon";


const SelectCustom = ({name,data,onChange, selected}) => {
    const node = useRef();
    const [open, setOpen] = useState(false);
    const [labelName, setLabelName] = useState(selected);

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            setOpen(true)
            return;
        }
        setOpen(false);  
    };
  
    
    const handleChange = (selectedValue, selectedName, selectedRequire) => {
        setOpen(false);
        onChange(selectedValue,selectedName, selectedRequire);
        setLabelName(selectedName);
    };

    useEffect(() => {
        if(open){
            document.addEventListener("mousedown", handleClick);
            return () => {
                document.removeEventListener("mousedown", handleClick);
            };
        }
    },[open]);

    return (
        <div className={`select-dropdown ${open ? 'active' : ''}`}
            ref={node}
            name={name}
        >
            <div className="select-title" onClick={(e) => setOpen(!open)}>
                {labelName ? labelName : "Seçim yapın"}
                <Icon icon="down" size={10} color="#000" ></Icon>
            </div>
            {open && (
                <div className="select-list">
                    {data.map((item, key) => (
                        <li
                            key={key}
                            value={item.value}
                            onClick={(e) => handleChange(item.value, item.label, item?.require)}
                        >
                            {item.label}
                        </li>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectCustom;
