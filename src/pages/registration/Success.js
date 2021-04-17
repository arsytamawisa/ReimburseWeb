import React from 'react'
import Image from "../../assets/image/success_register.svg"

function Success() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="offset-md-4 col-md-4">
                    <img className="card-img-top" src={Image} alt="Card image cap" />
                </div>
                <div className="offset-md-4 col-md-6">
                    <div className="card-body">
                        <h3>Happy Enigmanians!</h3>
                        <p className="card-text">Selamat registrasi akun anda telah berhasil.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
