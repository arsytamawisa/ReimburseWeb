import React from "react";
import {useHistory} from "react-router-dom";
import ResetPassword from "../pages/resetPassword";
import Swal from 'sweetalert2'


export default function Header() {

    const history = useHistory();

    function logout() {
        Swal.fire({
            title: 'Konfirmasi',
            text: 'Anda yakin ingin keluar?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: '#292961',
            cancelButtonColor: '#292961',
            cancelButtonText: 'Tidak'
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.clear()
                history.push("/")
            } else {
            }
        })

    }


    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light"
             style={{backgroundColor: "#292961"}}>
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i className="fas fa-bars" style={{backgroundColor: "white", fontSize: "20px"}}/>
                    </a>
                </li>

            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-user-circle" style={{color: "white", fontSize: "27px"}}/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <div className="dropdown-divider"/>
                        <ResetPassword/>
                        <div className="dropdown-divider"/>
                        <button onClick={logout} className="dropdown-item">
                            Keluar
                        </button>
                    </div>
                </li>

            </ul>
        </nav>
    );
}
