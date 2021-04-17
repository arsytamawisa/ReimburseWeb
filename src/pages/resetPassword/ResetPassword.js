import { useEffect, useState } from "react";
import { Modal, Button, Container, Form } from "react-bootstrap";
import { resetPassword } from '../../actions/resetPasswordAction';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import Swal from 'sweetalert2'


function ResetPassword({ status, resetPassword }) {

    useEffect(() => {
        if (status) {
            Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Kata sandi berhasil diubah',
                showConfirmButton: false,
                timer: 1500
            })
        }
    },[status])

    const [data, setData] = useState({
        email: localStorage.getItem('email'),
        password: ""
    })

    const [error, setError] = useState({})
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const textDanger = { color: "red", fontSize: "12px" }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    

    function validate() {
        let error_ = {};
        let isValid_ = true;

        if (password.length < 8) {
            isValid_ = false;
            error_["password"] = "Kata sandi minimal 8 karakter"
        }

        if (password !== confirmPassword) {
            isValid_ = false;
            error_["confirm_password"] = "Konfirmasi kata sandi tidak cocok";
        }
        setError(error_)
        return isValid_
    }

    function handleChange(e) {
        const key = e.target.name
        const value = e.target.value
        if (key == "password") {
            setPassword(value)
            setData({ ...data, [key]: value })
        }
        if (key == "confirmPassword") {
            setConfirmPassword(value)
        }
    }

    const handleSubmit = () => {
        if (validate()) {
            resetPassword(data)
            setShow(false)
        }
    }

    return (
        <div>
            <Button variant="white" onClick={handleShow}>
                Ubah Kata Sandi
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>

                <Container>
                    <Form>
                        <Form.Group controlId="formBasicPassword" style={{ marginTop: "10px" }}>
                            <Form.Label >Kata Sandi Baru</Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Masukkan kata sandi" name="password"
                            />
                        </Form.Group>
                        <div style={textDanger}>{error.password}</div>

                        <Form.Group>
                            <Form.Label>Konfirmasi Kata Sandi Baru</Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Masukkan ulang kata sandi" name="confirmPassword" />
                        </Form.Group>
                        <div style={textDanger}>{error.confirm_password}</div>
                    </Form>
                </Container>

                <Modal.Footer>
                    <Button onClick={handleSubmit} type="submit" style={{ backgroundColor: "#292961" }}>Reset</Button>
                    <Button onClick={handleClose} style={{ backgroundColor: "white", borderColor: "#292961", color: "#292961" }}>Batal</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


/* Reducer */
const mapStateToProps = (state) => {
    return {
        status: state.resetPassword.data,
        isLoading: state.resetPassword.isLoading,
    }
}

/* Action */
const mapDispatchToProps = { resetPassword }

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)