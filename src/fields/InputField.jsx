import React from "react";
import './InputField.css';

function InputField({type,placeholder,Value,setValue,labelName,classname}){
    return (
        <div className="field">
            <label  htmlFor={classname}>{labelName}<span className='star'>*</span></label>
            <input 
                id={classname}
                type={type} 
                placeholder={placeholder} 
                value={Value} 
                required 
                onChange={(e)=>setValue(e.target.value)}
            />
        </div>
    );
}

export default InputField;



