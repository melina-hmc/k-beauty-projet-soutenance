import React from "react";

function Footer(){

    const date = new Date()
    const year = date.getFullYear();

    return(
        <div className="footer1">
            &copy; {year} All Right Reserved - Mélina Hammaci
        </div>
    )
}

export default Footer;

