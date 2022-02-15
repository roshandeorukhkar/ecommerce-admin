import React from "react";


const FormMainTitle = ({
    title = "Title",
    btnName = ""
}) => {
    const button = () => {
        return (
            <>
            <button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right">
            <i className="fa fa-plus-circle"></i> {btnName}
            </button>
        </>)
    }
    return (
        <h2 className="font-bold"> {title}
            {!btnName ? "" : button()}
        </h2>
    )
}

export default FormMainTitle;

