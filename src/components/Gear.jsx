import { Navigate, useNavigate } from "react-router-dom";

export const Gear = () => {

    const navigate = useNavigate();

    return(

        <button onClick={()=> navigate('/config/')} id="gear">
            <i className="fa-solid fa-gear"></i>
        </button>
    )
    
} 