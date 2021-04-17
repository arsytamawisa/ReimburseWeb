import { useEffect, useState } from "react";
import { Button, Modal, ModalFooter, } from "reactstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { Form } from "react-bootstrap";
import { forgotPassword } from '../../actions/forgotPasswordAction';
import { connect } from "react-redux"
import Swal from 'sweetalert2'
import ReactLoading from "react-loading";



const ForgetPassword = ({ status, forgotPassword, isLoading }) => {

    const [modal, setModal] = useState(false);
    const [lupa, setLupa] = useState({});
    const toggle = () => setModal(!modal)

    /* Loading */
    const delay = 2000
    const color = "#292961"


    useEffect(() => {
        if (status) {
            if (status.data.data != null) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Password baru telah dikirim ke email anda',
                    showConfirmButton: false
                })
                toggle()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Email yang anda masukkan salah',
                    showConfirmButton: false
                })
            }
        }
    }, [status])


    const [error, setError] = useState({})
    const [email, setEmail] = useState("")
    const textDanger = { color: "red", fontSize: "12px" }

    function validate() {
        let error_ = {};
        let isValid_ = true;

        if (email.length == 0) {
            isValid_ = false;
            error_["email"] = "Email tidak boleh kosong!"
        }

        setError(error_)
        return isValid_
    }


    function handleChange(e) {
        const key = e.target.name
        const value = e.target.value
        setLupa({ ...lupa, [key]: value })
        setEmail(value)
    }

    const handleSubmit = () => {
        if (validate()) {
            forgotPassword(lupa)
        }
    }


    return (
        <div>

            <a className="pass" onClick={toggle} href="#" style={{ textAlign: "right", color: "#292961" }}>
                Lupa Kata Sandi?
            </a>

            <Modal isOpen={modal} toggle={toggle}>
                {isLoading ?
                    <>
                        <ModalHeader onClick={toggle} color="#292961" style={{ fontWeight: "bold", fontSize: "20px" }}>Mohon tunggu </ModalHeader>
                        <div className="row">
                            <div className="col-md-4">
                                <ReactLoading type={"bubbles"} color={color} delay={delay} />
                            </div>
                            <div className="col-md-4">
                                <ReactLoading type={"bubbles"} color={color} delay={delay} />
                            </div>
                            <div className="col-md-4">
                                <ReactLoading type={"bubbles"} color={color} delay={delay} />
                            </div>
                        </div>
                    </>
                    :
                    <ModalHeader onClick={toggle} color="#292961" style={{ fontWeight: "bold", fontSize: "20px" }}>Lupa Kata Sandi ?</ModalHeader>
                }
                <Form className="forget" >
                    <div className="formgroup">
                        <label>Email</label>
                        <div style={textDanger}>{error.email}</div>
                        <input className="form-control" required onChange={handleChange} type="email" name="email" placeholder="contoh@gmail.com" />
                    </div>
                </Form>

                <ModalFooter>
                    <Button className="btn-submit" onClick={handleSubmit}>Kirim</Button>
                    <Button color="outline-enigma" onClick={toggle}>Batal</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

/* Reducer */
const mapStateToProps = (state) => {
    return {
        status: state.forgotPassword.data,
        isLoading: state.forgotPassword.isLoading,
    }
}

/* Action */
const mapDispatchToProps = { forgotPassword }

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)