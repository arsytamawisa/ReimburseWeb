import {Modal, Button, Container, Form, FormGroup} from "react-bootstrap";
import {Input, Label} from "reactstrap";
import {Link, useParams, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {findById, saveVerified} from "../../../actions/employeeAction";
import Swal from "sweetalert2";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function VerifiedForm({verified, findById, isLoading, saveVerified, error, savedVerified}) {
    const {id} = useParams()
    const history = useHistory();
    const [data, setData] = useState({})
    const [testVerified, setVerified] = useState({})
    const[verifikasi, setVerifikasi] = useState({})


    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    useEffect( () => {
        findById(id)
    }, [])

    useEffect(() => {
        if(id && verified) {
            setData({...verified})
        }
    },[id, verified])


    //ngambil verfiedHc dari tabel employee
    useEffect(() => {
        if(verified) {
            setVerified(verified?.verifiedHc)
        }
    },[verified])


    useEffect( () => {
        if(verified) {
            setVerifikasi( {
                id: verified?.id,
                verifiedHc: verified?.verifiedHc
            })
        }
    }, [data])


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("CLICK")
        saveVerified(verifikasi)
    }

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setVerifikasi({...verifikasi, [name]: value})
    }

    console.log("verifikasi", testVerified)

    useEffect(() => {
        if (savedVerified) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'berhasil diverifikasi!',
                showConfirmButton: false,
                timer: 1500
            })
            history.push("/dashboard/hc/employee")
        }
    }, [savedVerified, history])

    return (
        <div>
            <button className="btn btn-outline-enigma" disabled={verifikasi?.verifiedHc === true}>
                <FontAwesomeIcon icon={faCheck} onClick={handleShow}/>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{backgroundColor: "#292961"}}>
                    <Modal.Title style={{color: "white"}}> Status Registrasi Karyawan</Modal.Title>
                </Modal.Header>

                <Container>
                    <div>
                        {
                            !isLoading?
                                <Form>
                                    <FormGroup>
                                        <Label> Status Verifikasi Registrasi</Label>
                                        <Input type="select" name="verifiedHc" onChange={handleChange} >
                                            <option selected disabled hidden>-- Choose --</option>
                                            <option value="true"> Verifikasi</option>
                                            <option value="false"> Belum Verifikasi</option>
                                        </Input>
                                    </FormGroup>
                                </Form> :
                                <div>
                                    Loading...
                                </div>
                        }
                    </div>

                </Container>
                <Modal.Footer>
                    <Link to="/dashboard/hc/employee">
                        <Button style={{backgroundColor: "black"}}>Back</Button>
                    </Link>

                    <Link to="/dashboard/hc/employee">
                        <Button type="submit" onClick={handleSubmit}
                                style={{backgroundColor: "#292961", color: "white"}}>
                            Submit
                        </Button>
                    </Link>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        verified: state.findEmployeeById.data || null,
        isLoading: state.findEmployeeById.isLoading,
        savedVerified: state.saveVerified.data,
        // error: state.findVerifiedById.error || state.savedVerified.error
    }
}
const mapDispatchToProps = {findById, saveVerified}

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedForm)
