import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {findAll, findByName} from "../../../actions/detailContractAction";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faEdit,
    faFastBackward,
    faFastForward,
    faSortAmountDown,
    faStepBackward,
    faStepForward
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {InputGroupAddon, Spinner, Table} from "reactstrap";
import Header from "../../../dashboard/Header";
import MenuHc from "../../../dashboard/dashboardHc/MenuHc";
import Footer from "../../../dashboard/Footer";
import {Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {Button} from "@themesberg/react-bootstrap";


function DetailContract({findAll, contracts, error, isLoading, }) {

    console.log("", )

    const [searchName, setSearch] = useState("")

    const [contract, setContract] = useState(contracts)

    useEffect(() => {
        findAll()
    }, [])


    useEffect(() => {
        setContract(
            {...contracts})
    }, [contracts])


    const onSubmit = () => {
        let filter = contracts?.data?.list?.filter(kontrak => kontrak.employeeId.fullname.toLowerCase().match(searchName))
        setContract({
                data : {
                    list : filter
                }
            }
    )
    }


    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmit()
            event.preventDefault()
        }
    }

    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10;
    const total = contract?.data?.total
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


    console.log("contract", contract)
    console.log("search", searchName)

    return (
        <div>
            <Header/>
            <MenuHc/>
            <div className="content-wrapper">
                <div className="content-header">
                    <h1  style={{color: "black", textAlign: "center", marginBottom: "2vh", fontFamily:"verdana"}}> DETAIL KONTRAK</h1>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card" style={{height: "60vh"}}>
                                    <div className="card-header">
                                        <h3 className="card-title">

                                        </h3>

                                        <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{width: "150px"}}>
                                                <input type="text" name="fullname"
                                                       value={searchName?.fullname}
                                                       className="form-control float-right"
                                                       placeholder="Cari karyawan..."
                                                       onChange={handleChange} onKeyPress={handleKeyPress}
                                                />

                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-default"
                                                            onClick={onSubmit}
                                                    >
                                                        <i className="fas fa-search">

                                                        </i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body table-responsive p-0" style={{height: "300px"}}>
                                        <Table className="table table-head-fixed text-nowrap">
                                            <thead>
                                            <tr>
                                                <th style={{verticalAlign: "middle", textAlign: "center"}}>
                                                    <FontAwesomeIcon icon={faSortAmountDown}/></th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>Nama Lengkap
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>NIP
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>Status Asuransi
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>Tanggal Karyawan Tetap
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>Tipe Kontrak
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>Tanggal Resign
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>Tanggal Mulai Kontrak
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>Tanggal Habis Kontrak
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>Penempatan
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}>Habis Kontrak
                                                </th>
                                                <th style={{
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                    maxWidth: "250px",
                                                    minWidth: "250px"
                                                }}> Edit
                                                </th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                console.log("DATA CONTRACT", contract)
                                            }
                                            {
                                                isLoading ?
                                                    <td className={'justifyContent'}>
                                                        <Spinner animation="border" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </Spinner>
                                                    </td> :

                                                    contract?.data?.list?.map((element, index) => {
                                                        return (
                                                            <tr style={{textAlign: "center"}}>
                                                                <td style={{textAlign: "center"}}>
                                                                    {element.employeeId === null ? "belum ada data" : (currentPage - 1) * 10 + index + 1}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.employeeId === null ? "belum ada data" : element.employeeId.fullname}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.employeeId === null ? "belum ada data" : element.employeeId.nip}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.benefitRegistrationStatus === null ? "belum ada data" : element.benefitRegistrationStatus
                                                                    === 'ON_PROCESS' ? 'PROSES' : 'SELESAI'}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.dateOfAcceptancePermanentEmployee === null ? "belum ada data" : element.dateOfAcceptancePermanentEmployee}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.typeContract === null ? "belum ada data" : element.typeContract == 'PROBABITION' ? 'PROBITION' : 'PKWT'}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.dateOfResignation === null ? "belum ada data" : element.dateOfResignation}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.startDateContract === null ? "belum ada data" : element.startDateContract}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.endDateContract === null ? "belum ada data" : element.startDateContract}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.placement === null ? "belum ada data" : element.placement}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    {element.endedContract === null? "belum ada data" : element.endedContract == true ? "Ya" : "Tidak"}</td>
                                                                <td style={{
                                                                    verticalAlign: "middle",
                                                                    textAlign: "center",
                                                                    maxWidth: "250px",
                                                                    minWidth: "250px"
                                                                }}>
                                                                    <Link to={'/contract/' + element.id}>
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

                </div>
                <div>
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
        contracts: state.findAllContract.data || null,
        error: state.findAllContract.error,
        isLoading: state.findAllContract.isLoading,
    }
}

const mapDispatchToProps = {findAll}
export default connect(mapStateToProps, mapDispatchToProps)(DetailContract)