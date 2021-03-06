import React, { TextareaHTMLAttributes } from 'react';
import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ name, label, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea name="" id={name} {...rest}></textarea>
    </div>
  );
};

export default Textarea;
