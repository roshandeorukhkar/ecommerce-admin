import React,{useState} from 'react';
import { Link } from 'react-router-dom';

const FormNotification = ({
    message = "",
    alertClass = '',
    style = style,
}) => {
    const [closed,setClosed] = useState(style);
    return (
        <>
        <div id="alerttopright" className={`myadmin-alert  myadmin-alert-top-right ${alertClass}`} style={style}   >
                <Link to="#" className="closed" onClick = {() => setClosed(!closed)}>&times;</Link>
                <h4>{message}</h4>
            </div>
        </>
    )
}
export default FormNotification;