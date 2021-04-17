
import React from "react";
// import NavigationSideBar from "../NavigationSideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import HomeSideBar from "../HomeSideBar";
import {
    faHistory,
    faHome, faListAlt, faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
// import TableDashboardFinance from "./TableDashboardFinance";

export default function DashboardFinance() {
    return(
        <div>
            {/* <NavigationSideBar/> */}
            <div className="sidebar-container" style={{marginTop:"-60px", backgroundColor:"#292961"}}>
                <ul className="sidebar-navigation" style={{marginTop:"100px"}}>
                    <li>
                        <a href="/finance/dashboard" style={{fontSize:"20px",color:"white", fontFamily:"sans-serif"}}>
                            <i aria-hidden="true" />
                            <FontAwesomeIcon icon={faHome}/> Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/finance/reimburse" style={{fontSize:"20px", marginTop:"20px", color:"white",fontFamily:"sans-serif"}}>
                            <i aria-hidden="true"/>
                            <FontAwesomeIcon icon={faMoneyBill}/> Reimbursement
                        </a>
                    </li>

                </ul>
            </div>
            {/* <HomeSideBar/> */}

        </div>
    )
}