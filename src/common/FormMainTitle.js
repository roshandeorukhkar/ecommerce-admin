import React from "react";
import { Link } from "react-router-dom";


const FormMainTitle = ({
    title = "Title",
    btnName = "",
    btnSecond ="",
    onClick ,
    btnSecondlink,
    btnLink
}) => {
    const button = () => {
        return (
            <>
            <Link to={btnLink} className="btn btn-info fa-pull-right">
            <i className="fa fa-plus-circle"></i> {btnName}
            </Link>
        </>)
    }

    const buttonSecond = () =>{
        return(
            <Link to={btnSecondlink}  className="btn  btn-info fa-pull-right m-r-10" onClick={onClick}>
            <i className="fa fa-plus-circle"></i> {btnSecond}
            </Link>
        )
    } 

    return (
        <h2 className="font-bold"> {title}
            {!btnName ? "" : button()}
            {!btnSecond ? "" : buttonSecond()}
        </h2>
    )
}

export default FormMainTitle;

