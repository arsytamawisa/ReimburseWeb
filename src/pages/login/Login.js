import React, { useEffect, useState } from "react";
import ForgetPassword from "./ForgetPassword";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlockAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import BgImage from "../../assets/image/signin.svg"
import { Row, Col, FormControl, Container, InputGroup, Form } from "react-bootstrap";
import NavigationHome from "../../component/navigationHome/NavigationHome";
import { useHistory } from "react-router-dom";
import { loginEmployee } from "../../actions/loginAction"
import Swal from 'sweetalert2'
import ReactLoading from "react-loading";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import '../../assets/css/Login.css'
import { Visibility, VisibilityOff } from "@material-ui/icons";
import sjcl from 'sjcl';


const Login = ({ loginEmployee, login, isLoading }) => {
    const [values, setValues] = useState({
        password: "",
        showPassword: false

    });

    const emailUser = ["arsytamawisa@gmail.com", "solehsolihin2021@gmail.com"]

    let responseGoogle = response => {
        const email = response.profileObj.email;
        console.log(email);

        if (emailUser.includes(email)) {
            alert("Login Success")
        } else {
            alert("Login Failed")
        }
    }


    /* Hashing Password */
    const myString = 'wisa'
    const myBitArray = sjcl.hash.sha256.hash(myString)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    console.log("hash", myHash);
    /* Hashing Password */

    const delay = 2000
    const color = "#292961"

    const [data, setData] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();


    const [error, setError] = useState({})
    const [role, setRole] = useState()

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }


    useEffect(() => {
        if (login) {
            if (login?.data?.message == "Login Success") {
                setRole(login.data?.data?.role.id)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: 'Email atau password salah',
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
        }
    }, [login])


    useEffect(() => {
        if (role) {
            if (role == "1" || role == 1) {
                localStorage.setItem('email', login.data.data.email)
                localStorage.setItem('role', '1')
                window.location.replace('/dashboard/hc')
            } else {
                localStorage.setItem('email', login.data.data.email)
                localStorage.setItem('role', '2')
                window.location.replace("/dashboard/finance")
            }
        }
    }, [role])


    function handleChange(e) {
        const key = e.target.name
        const value = e.target.value

        switch (key) {
            case "email":
                setEmail(value)
                setData({ ...data, [key]: value })
                break;
            case "password":
                setPassword(value)
                setData({ ...data, [key]: value })
                break;
            default:
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            loginEmployee(data)
        }
    }

    function validate() {
        let error_ = {};
        let isValid_ = true;

        if (!email) {
            isValid_ = false;
            error_["email"] = "Mohon isi email.";
        }

        if (!password) {
            isValid_ = false;
            error_["password"] = "Mohon isi password";
        }

        setError(error_)
        return isValid_
    }



    return (
        <main style={{ backgroundColor: "white" }}>
            <NavigationHome />
            {/* <Navigation /> */}
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container style={{ marginTop: "50px" }}>
                    <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-5 p-lg-5">
                                {isLoading ?
                                    <>
                                        <div className="text-center text-md-center mb-2 mt-md-0">
                                            <h3 className="mt-0">Mohon Tunggu</h3>
                                        </div>
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
                                    <div className="text-center text-md-center mb-2 mt-md-0">
                                        <h3 className="mb-0">Login</h3>
                                    </div>
                                }
                                <Form onSubmit={handleSubmit} className="mt-3">
                                    <Form.Group controlId="email" className="mb-2" style={{ width: "300px" }}>
                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                            <FormControl id="email"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={handleChange}
                                                placeholder="Enter email"
                                            />
                                        </InputGroup>
                                        <div className="text-danger">{error.email}</div>
                                    </Form.Group>
                                    <Form.Group controlId="password" className="mb-2" style={{ width: "300px" }}>
                                        <Form.Label htmlFor="password">Kata Sandi</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text> <FontAwesomeIcon icon={faUnlockAlt} /></InputGroup.Text>
                                            <FormControl id="password"
                                                name="password"
                                                value={password}
                                                type={values.showPassword ? "text" : "password"}
                                                placeholder="Enter Password"
                                                onChange={handleChange}
                                                aria-describedby="basic-addon2"
                                                style={{ height: "38px" }}
                                            />
                                            <InputGroup.Prepend position="end">
                                                <InputGroup.Text id="basic-addon2" style={{ height: "38px" }}>
                                                    <IconButton onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}>
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>

                                        </InputGroup>
                                        <div className="text-danger">{error.password}</div>
                                    </Form.Group>
                                    <Button type="submit" value="Login"
                                        style={{
                                            backgroundColor: "#292961",
                                            color: "white",
                                            fontSize: "15px",
                                            width: "300px",
                                            marginBottom: "20px"
                                        }}>
                                        Login
                                    </Button>
                                    <br />
                                    <div className="row">
                                        {/* <div className="col-md-6">
                                            <GoogleLogin
                                                clientId="567435085483-fstc21l8q7cvorh36pggrq6cjlpm46o1.apps.googleusercontent.com"
                                                buttonText="Login"
                                                className="btn-google"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle}
                                                cookiePolicy={'single_host_origin'}
                                            />
                                        </div> */}
                                        <div className="col-md-6">
                                            <ForgetPassword />
                                        </div>
                                    </div>
                                </Form>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>
        </main>

    )
}

const mapStateToProps = (state) => {
    return {
        login: state.loginEmployee.data || null,
        isLoading: state.loginEmployee.isLoading
    }
}

const mapDispatchToProps = { loginEmployee }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
