import React, {useEffect, useState} from "react";
import {Button, Col, Container, InputGroup, InputGroupAddon, Row, Spinner, Table} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faFastBackward,
    faFastForward,
    faSortAmountDown,
    faStepBackward,
    faStepForward
} from "@fortawesome/free-solid-svg-icons";
import {findAll, findByName, saveVerified} from "../../../actions/employeeAction";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Header from "../../../dashboard/Header";
import Footer from "../../../dashboard/Footer";
import MenuHc from "../../../dashboard/dashboardHc/MenuHc";
import swal from "sweetalert";
import {FormControl} from "react-bootstrap";


function ListEmployee({findAll, findByName, employees, error, isLoading, name, savedVerified, saveVerified}) {

    const [verifikasi, setVerifikasi] = useState()
    const [searchName, setSearch] = useState({
        fullname: ""
    });

    const [karyawan, setKaryawan] = useState(null)


    useEffect(() => {
        findAll()
    }, []);


    useEffect(() => {
        setKaryawan({...employees})
    }, [employees])

    useEffect(() => {
        setKaryawan({
            data: {
                list: name?.data
            }
        })
    }, [name])


    const onSubmit = () => {
        findByName(searchName)
        console.log("CLICK")
    }

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value
        setSearch({...searchName, [name]: value})

    }

    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            findByName(searchName)
            event.preventDefault()
        }
    }

    useEffect(() => {
        if (verifikasi) {
            saveVerified(verifikasi)
            swal("Berhasil", "berhasil diverifikasi!", "success")
        }
    }, [verifikasi])


    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10;
    const total = karyawan?.data?.total
    const totalPages = Math.ceil(total / itemPerPage);
    const pageNumCss = {
        width: "45px",
        border: "1px solid #292961",
        color: "#292961",
        textAlign: "center",
        fontWeight: "bold"
    }

    const onReload = () => {
        findAll(currentPage)
    }

    useEffect(() => {
        if (currentPage) {
            onReload()
        }
    }, [currentPage])

    const changePage = event => {
        let targetPage = parseInt(event.target.value)
        event.target.name = targetPage;
    }

    const firstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            setCurrentPage(firstPage)
            onReload()
        }
    }

    const prevPage = () => {
        let prevPage = 1;
        if (currentPage > 1) {
            setCurrentPage(currentPage - prevPage)
            onReload()
        }
    }

    const lastPage = () => {
        let condition = Math.ceil(total / itemPerPage);
        if (currentPage < condition) {
            setCurrentPage(condition)
            onReload()
        }
    }

    const nextPage = () => {
        let condition = Math.ceil(total / itemPerPage);
        if (currentPage < condition) {
            setCurrentPage(currentPage + 1)
            onReload()
        }
    }

    const handleChangeVerified = (value, id) => {
        switch (value) {
            case "verified":
                setVerifikasi({
                    id,
                    verifiedHc: true
                })
                break;
            default:
                setVerifikasi({
                    id,
                    verifiedHc: false
                })
        }
    }
    console.log("FULLNAME", searchName)
    console.log("LIST", karyawan)
    console.log("name", name?.data)


    return (
        <div>
            <Header/>
            <MenuHc/>
            <div className="content-wrapper">
                <div className="content-header">
                    <h1 style={{color: "black", textAlign: "center", marginBottom: "2vh", fontFamily:"verdana"}}> DAFTAR KARYAWAN</h1>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card" style={{height: "60vh"}}>
                                    <div className="card-header">
                                        <h3 className="card-title">

                                        </h3>

                                        <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{width: "150px"}}>
                                                <input type="text" className="form-control float-right"
                                                       name="fullname"
                                                       value={searchName?.fullname}
                                                       placeholder="Cari karyawan.."
                                                       onChange={handleChange}
                                                       onKeyPress={handleKeyPress}
                                                />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-default"
                                                            onClick={onSubmit}>
                                                        <i className="fas fa-search">
                                                        </i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body table-responsive p-0" style={{height: "300px"}}>
                                        <Table className="table table-head-fixed text-nowrap" hover>
                                            <thead>
                                            <tr style={{fontFamily: "verdana"}}>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center"
                                                }}><FontAwesomeIcon icon={faSortAmountDown}/>
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Nama Lengkap
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Tempat Lahir
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Tanggal Lahir
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>NIK
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Jenis Kelamin
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Agama
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Golongan Darah
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Status pernikahan
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Jumlah Anak
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Nama Ibu Kandung
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Nama Istri/Suami
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Nama Bank
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Nomer Rekening
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "350px",
                                                    maxWidth: "350px"
                                                }}>Alamat KTP
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "350px",
                                                    maxWidth: "350px"
                                                }}>Alamat Domisili
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Kodepos KTP
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "350px",
                                                    maxWidth: "350px"
                                                }}>Alamat NPWP
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>NIP
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Tanggal Bergabung
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Status Karyawan
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Tipe Karyawan
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Grade
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}>Status Verifikasi
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    minWidth: "250px",
                                                    maxWidth: "250px"
                                                }}> Edit Data
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody style={{fontFamily: "verdana"}}>
                                            {
                                                console.log("COBA ya", karyawan)
                                            }

                                            {
                                                isLoading ?
                                                    <td className={'justifyContent'}>
                                                        <Spinner animation="border" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </Spinner>
                                                    </td> :
                                                    karyawan?.data?.list?.map((element, index) => {
                                                        return (
                                                            <tr style={{textAlign: "center"}}>
                                                                <td style={{textAlign: "center"}}>
                                                                    {element.employeeId === null ? "belum ada data" : (currentPage - 1) * 10 + index + 1}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px",
                                                                    position: "sticky"
                                                                }}>{element.fullname === null ? "belum ada data" : element.fullname}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.placeOfBirth === null ? "belum ada data" : element.placeOfBirth}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.dateOfBirth === null ? "belum ada data" : element.dateOfBirth}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.nik === null ? "belum ada data" : element.nik}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.gender === null ? "belum ada data" : element.gender == "FEMALE" ? "WANITA" : "PRIA"}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.religion === null ? "belum ada data" : element.religion}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.bloodType === null ? "belum ada data" : element.bloodType}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.maritalStatus === null ? "belum ada data" : element.maritalStatus == "SINGLE" ? "LAJANG" :
                                                                    element.maritalStatus == "MARRIED" ? "MENIKAH" : "CERAI"
                                                                }</td>

                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.numberOfChildren === null ? "belum ada data" : element.numberOfChildren}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.biologicalMothersName === null ? "belum ada data" : element.biologicalMothersName}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.spouseName === null ? "belum ada data" : element.spouseName}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.accountName === null ? "belum ada data" : element.accountName}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.accountNumber === null ? "belum ada data" : element.accountNumber}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.ktpAddress === null ? "belum ada data" : element.ktpAddress}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.residenceAddress === null ? "belum ada data" : element.residenceAddress}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.postalCodeOfIdCard === null ? "belum ada data" : element.postalCodeOfIdCard}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "350px",
                                                                    minWidth: "350px"
                                                                }}>{element.npwpAddress === null ? "belum ada data" : element.npwpAddress}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.nip === null ? "belum ada data" : element.nip}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.joinDate === null ? "belum ada data" : element.joinDate}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.employeeStatus === null ? "belum ada data" : element.employeeStatus == "ACTIVE" ? "AKTIF" : "TIDAK AKTIF"}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element.employeeType === null ? "belum ada data" : element.employeeType}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>{element?.grade === null ? "belum ada data" : element?.grade?.grade}</td>

                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>

                                                                    {
                                                                        element?.verifiedHc ? "Sudah diverifikasi" :
                                                                            <select  className="custom-select" style={{width:"190px"}} onChange={(e) => {
                                                                                handleChangeVerified(e.target.value, element.id)
                                                                            }}>
                                                                                <option value="verified"
                                                                                        selected={element?.verifiedHc === true}> Verifikasi
                                                                                </option>
                                                                                <option value="notVerified"
                                                                                        selected={element.verifiedHc === false}> Belum
                                                                                    diverifikasi
                                                                                </option>
                                                                            </select>

                                                                    }


                                                                </td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {/*<EmployeeForm/>*/}
                                                                    <Link to={'/employee/' + element.id}>
                                                                        <button className="btn btn-outline-enigma">
                                                                            <FontAwesomeIcon icon={faEdit}
                                                                                             className="float-left"/>
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                            }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {total > 10 ?

                        <Container>
                            <Row>
                                <Col>
                                    <div className="float-left text-dark" style={{fontFamily: "verdana"}}>
                                        Menampilkan halaman {currentPage} dari {totalPages}
                                    </div>
                                    <div className="float-right">
                                        <InputGroup size="md">
                                            <InputGroupAddon addonType="prepend">
                                                <Button onClick={firstPage} type="button"
                                                        style={{backgroundColor: "#292961", color: "white"}}
                                                        disabled={currentPage === 1 ? true : false}>
                                                    <FontAwesomeIcon icon={faFastBackward}/>
                                                    {' '}Pertama
                                                </Button>
                                                <Button onClick={prevPage} type="button"
                                                        style={{backgroundColor: "#292961", color: "white"}}
                                                        disabled={currentPage === 1 ? true : false}>
                                                    <FontAwesomeIcon icon={faStepBackward}/>
                                                    {' '}
                                                </Button>
                                            </InputGroupAddon>
                                            <FormControl onChange={changePage} style={pageNumCss} name="currentPage"
                                                         value={currentPage}/>
                                            <InputGroupAddon addonType="append">
                                                <Button onClick={nextPage} type="button"
                                                        style={{backgroundColor: "#292961", color: "white"}}
                                                        disabled={currentPage === totalPages ? true : false}>
                                                    <FontAwesomeIcon icon={faStepForward}/>
                                                    {' '}
                                                </Button>
                                                <Button onClick={lastPage} type="button"
                                                        style={{backgroundColor: "#292961", color: "white"}}
                                                        disabled={currentPage === totalPages ? true : false}>
                                                    <FontAwesomeIcon icon={faFastForward}/>
                                                    {' '}Terakhir
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                </Col>

                            </Row>
                        </Container> : null
                    }
                </div>

            </div>
            <Footer/>
        </div>


    )
}


const mapStateToProps = (state) => {
    return {
        employees: state.findAllEmployee.data || [],
        error: state.findAllEmployee.error,
        isLoading: state.findAllEmployee.isLoading,
        name: state.findEmployeeByName.data,
        savedVerified: state.saveVerified.data,

    }
}
const mapDispatchToProps = {findAll, findByName, saveVerified}
export default connect(mapStateToProps, mapDispatchToProps)(ListEmployee);
