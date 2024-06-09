import React from 'react';
import ReactDOM from "react-dom";
import loaderImg from "../../assets/images/loader.gif";

function Loader(){
    return ReactDOM.createPortal(
        <div className='wrapper'>
            <div className='loader'>
                <img src={loaderImg} alt="loading" />
            </div>
        </div>,
        document.getElementById("loader")
    )
};

export const Spinner = () => {
    return (
        <div className='--center-all'>
                <img src={loaderImg} alt="loading" width={20} />
        </div>
    )
}

export default Loader;