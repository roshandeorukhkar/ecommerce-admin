import React from 'react';

const FormNotification = ({
    message = "",
    alertClass = '', show = '',
}) => {
    
    return (
        <>
        <div id="alerttopright" className={`myadmin-alert  myadmin-alert-top-right ${alertClass} ${show} `}   >
                <h4>{message}</h4>
            </div>
        </>
    )
}
export default FormNotification;