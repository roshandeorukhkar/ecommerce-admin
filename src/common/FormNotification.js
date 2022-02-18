import React,{useState} from 'react';
import { Link } from 'react-router-dom';

const FormNotification = ({
    message = "",
    alertClass = '',
    show = '',
}) => {
    const [closed,setClosed] = useState(show);

    console.log('closeddddd' , closed ,"--",show);
    // const handleClick = () =>{
    //     if(show == "db"){
    //         setClosed("dn");
    //     }
    // }
    
    
    return (
        <>
        <div id="alerttopright" className={`myadmin-alert  myadmin-alert-top-right ${alertClass} ${show} `}   >
                {/* <Link to="#" className="closed" onClick = {handleClick()}>&times;</Link> */}
                <h4>{message}</h4>
            </div>
        </>
    )
}
export default FormNotification;