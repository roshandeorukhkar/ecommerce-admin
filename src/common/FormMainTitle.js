import React from "react";
import { Link } from "react-router-dom";


const FormMainTitle = ({
    title = "Title",
    btnName = "",
    btnSecond = "",
    onClick,
    btnSecondlink,
    btnLink,
    btnSecondIcon
}) => {
    const button = () => {
        return (
            <>
                <Link to={btnLink} className="btn btn-rounded-min btn-primary fa-pull-right">
                    <i className="fa fa-plus-circle"></i> {btnName}
                </Link>
            </>)
    }

    const buttonSecond = () => {
        return (
            <Link to={btnSecondlink} className="btn btn-rounded-min btn-primary fa-pull-right m-r-10" onClick={onClick}>
                <i className={btnSecondIcon}></i> {btnSecond}
            </Link>
        )
    }

    return (
        <div className="main-heading" >
            <h4 className="font-bold"> {title}
                {!btnName ? "" : button()}
                {!btnSecond ? "" : buttonSecond()}
            </h4>
        </div>
    )
}

export default FormMainTitle;

