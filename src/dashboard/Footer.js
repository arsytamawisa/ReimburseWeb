import React from "react";

export default function Footer() {
    return (
        <footer className="main-footer" style={{backgroundColor:"#292961"}}>
            <strong style={{color:"white"}}>
                Copyright © 2021 <a href="#" style={{color:"white"}} >Reimbursement</a>
            </strong>

            <div className="float-right d-none d-sm-inline-block" style={{color:"white"}}>
                <b>ENIGMA CAMP</b>
            </div>
        </footer>
    );
}
