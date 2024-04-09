
import styles from "@/styles/partials/Select.module.scss";
import { useState, useEffect, useRef } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CustomSelect = ({ options, selectedOption, onChange,span }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const handleSelect = (option) => {
        console.log(option,89)
        setIsOpen(false);
        onChange(option);
    };

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.custom_select} ref={selectRef}>
            <div
                className={`${styles.selected_option} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption ? selectedOption?.name : span}</span>
            </div>
            {isOpen && (
                <div className={styles.options}>
                    {options?.map((option) => (
                        <div
                            key={option?.id}
                            className={styles.option}
                            onClick={() => handleSelect(option)}
                        >
                            {option?.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;