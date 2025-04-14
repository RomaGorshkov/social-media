import React from 'react';

import styles from './CustomInput.module.scss';

interface CustomInputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  return (
    <div className={styles.customInputContainer}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        className={styles.customInputContainer__input}
        onChange={onChange}
        required
      />
      {touched && error && <div className={styles.customInputContainer__error}>{error}</div>}
    </div>
  );
};

export default CustomInput;
