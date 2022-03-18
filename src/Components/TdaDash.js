import React from 'react';
import NavbarComp from "./NavbarComp.js";


function TdaDash (props){
    return(

        <>
        <NavbarComp role={props.role} logout={props.logout}/>
        TDA DASHBOARD
        </>
    )
}


export default TdaDash