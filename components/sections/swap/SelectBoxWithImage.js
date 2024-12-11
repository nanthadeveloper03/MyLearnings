import React, { useState } from 'react';
import styles from './SelectBoxWithImage.module.css';

const CustomSelect = ({ options, onChange }) => {
    const [selected, setSelected] = useState(options[0]);
    const [open, setOpen] = useState(false);

    const handleSelect = (option) => {
      setSelected(option);  // Set the selected option correctly
      setOpen(false);       // Close the dropdown after selection
      onChange(option);     // Notify the parent about the change
    };
  
    return (
      <div className={styles.sdropdown}>
        <div className={styles.selected} onClick={() => setOpen(!open)}>
          <img src={selected.image} alt={selected.label} className={styles.icon} />
          {selected.label}
        </div>
        {open && (  // Only render dropdown menu if open is true
          <div className={styles.sdropdownMenu}>
            {options.map((option) => (
              <div
                key={option.value}
                className={styles.sdropdownItem}
                onClick={() => handleSelect(option)}
              >
                <img src={option.image} alt={option.label} className={styles.icon} />
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
export default CustomSelect;
