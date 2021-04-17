import React from "react";
import Image1 from "../../assets/image/undraw_female_avatar_w3jk.svg"
import {Link} from "react-router-dom";
import {GoHome} from "react-icons/go";
import {GrMoney} from "react-icons/gr";

export default function MenuFinance() {
    return (
        <aside className="main-sidebar sidebar-light-gray-dark elevation-4" style={{backgroundColor:"white"}}>
            {/* Brand Logo */}
            <Link to="/dashboard/finance" className="brand-link">
                <img
                    src={Image1}
                    alt="enigmacamp"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8" }}
                />
                <span className="brand-text font-weight" style={{color:"black", fontFamily:"roboto"}}>Admin Finance</span>
            </Link>


            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item has-treeview" >
                            <Link to="/dashboard/finance" className="nav-link active" style={{backgroundColor:"#292961"}}>
                                <GoHome className="nav-icon"/>
                                <p style={{color:"white", fontSize:"20px", fontFamily:"roboto"}}>Beranda</p>
                            </Link>
                        </li>
                        <li className="nav-item has-treeview">
                            <Link  to= '/dashboard/finance/reimburse' className="nav-link">
                                <GrMoney className="nav-icon"/>
                                <p style={{color:"black", fontSize:"20px",fontFamily:"roboto"}}>Reimbursement</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}