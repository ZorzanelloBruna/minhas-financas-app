import React from "react";

function FormGroup(props) {
    return (
        <div>
             <label htmlFor={props.htmlFor}>{props.label}</label>
             {props.children}
        </div>
    )
}

export default FormGroup