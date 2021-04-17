import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { findAllReimburse, findByCategory } from "../../actions/reimburseAction";
import { findAllCategory } from '../../actions/categoryAction';


/* Just for UI */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFastBackward,
    faFastForward,
    faSortAmountDown,
    faStepBackward,
    faStepForward
} from '@fortawesome/free-solid-svg-icons';
import ReimburseRow from './ReimburseRow';
import Header from './../../dashboard/Header';
import Footer from './../../dashboard/Footer';
import MenuHc from './../../dashboard/dashboardHc/MenuHc';
import { Button, Col, Container, InputGroup, InputGroupAddon, Row, Spinner, Table } from "reactstrap";
import { FormControl } from "react-bootstrap";
/* Just for UI */


function ReimburseList({
    reimbursements, findAllReimburse,
    categories, findAllCategory,
    findByCategory, rCategory,
    isLoading
}) {

    const [search, setSearch] = useState()
    const [status, setStatus] = useState()
    const [c, setC] = useState()
    const [rSearch, setRSearch] = useState()
    const [rStatus, setRStatus] = useState()

    useEffect(() => {
        findAllReimburse(currentPage)
        findAllCategory()
    }, [])

    /* Pagination */
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10;
    const total = reimbursements?.data?.total
    const totalPages = Math.ceil(total / itemPerPage);
    const pageNumCss = {
        width: "45px",
        border: "1px solid #292961",
        color: "#292961",
        textAlign: "center",
        fontWeight: "bold"
    }

    const onReload = () => {
        findAllReimburse(currentPage)
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
    /* Pagination */


    /* Status */
    useEffect(() => {
        if (status) {
            switch (status) {
                case "menunggu":
                    setRStatus(reimbursements.data?.list?.filter(r => r.statusOnHc == false))
                    break;
                case "disetujui":
                    setRStatus(reimbursements.data?.list?.filter(r => r.statusOnHc == true && r.statusSuccess == false))
                    break;
                case "selesai":
                    setRStatus(reimbursements.data?.list?.filter(r => r.statusSuccess == true))
                    break;
                case "ditolak":
                    setRStatus(reimbursements.data?.list?.filter(r => r.statusReject == true))
                    break;
                default:
                    setRStatus(null)
                    break;
            }
        }
    }, [status])

    const handleChangeStatus = (e) => {
        setStatus(e.target.value)
    }
    /* Status */


    /* Search */
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchEnter = (e) => {
        if (e.key == 'Enter') {
            setRSearch(reimbursements.data?.list?.filter(r => r.employeeId.fullname.toLowerCase().match(search.toLowerCase())))
            e.preventDefault()
        }
    }

    const handleSearchSubmit = () => {
        setRSearch(reimbursements.data?.list?.filter(r => r.employeeId.fullname.toLowerCase().match(search.toLowerCase())))
    }
    /* Search */


    /* Category */
    useEffect(() => {
        if (c) {
            findByCategory(c)
        }
    }, [c])

    const handleChangeCategory = (e) => {
        let value = e.target.value
        setC(value)
    }
    /* Category */


    return (
        <div>

            <Header />
            <MenuHc />

            <div className="content-wrapper">
                <div className="content-header">
                    <h1  style={{color: "black", textAlign: "center", marginBottom: "2vh", fontFamily:"verdana"}}> DAFTAR KLAIM REIMBURSEMENT</h1>
                    <select className="custom-select rounded-pill text-enigma border-enigma"
                        onChange={handleChangeCategory} style={{ width: "30vh", marginLeft: "5vh" }}>
                        <option selected style={{ fontFamily: "verdana" }}>Kategori</option>
                        {
                            isLoading ?
                                <td style={{ flex:"1", justifyContent:"center", alignItems:"center"}}>
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </td> :
                                categories.data?.map((category, index) => {
                                    return (
                                        <option value={category.id}>{category.categoryName}</option>
                                    )
                                })
                        }
                    </select>

                    <div className="float-right" style={{ marginRight: "5vh", fontFamily: "verdana" }}>
                        <select className="custom-select rounded-pill text-enigma border-enigma"
                            onChange={handleChangeStatus}>
                            <option value="all" selected>Status</option>
                            <option value="menunggu">Menunggu</option>
                            <option value="disetujui">Diterima</option>
                            <option value="selesai">Selesai</option>
                            <option value="ditolak">Ditolak</option>
                        </select>
                    </div>
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    
                                    <div className="card" style={{ height: "55vh" }}>
                                        <div className="card-header">
                                            <h3 className="card-title"></h3>
                                            <div className="card-tools">
                                                <div className="input-group input-group-sm" style={{ width: "150px" }}>
                                                    <input type="text" name="table_search"
                                                        className="form-control float-right" placeholder="Cari karyawan.."
                                                        onChange={handleSearch} onKeyPress={handleSearchEnter}/>
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-default" onClick={handleSearchSubmit}>
                                                            <i className="fas fa-search">
                                                            </i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body table-responsive p-0" style={{ height: "300px" }}>
                                            <Table className="table table-head-fixed text-nowrap">
                                                <thead>
                                                    <tr style={{ fontFamily: "verdana" }}>
                                                        <th style={{ verticalAlign: "middle", textAlign: "center" }}><FontAwesomeIcon icon={faSortAmountDown} /></th>
                                                        <th style={{ verticalAlign: "middle", textAlign: "center", minWidth: "200px", maxWidth: "200px" }}>Kategori</th>
                                                        <th style={{ verticalAlign: "middle", textAlign: "center", minWidth: "200px", maxWidth: "200px" }}>Karyawan</th>
                                                        <th style={{ verticalAlign: "middle", textAlign: "center", minWidth: "200px", maxWidth: "200px" }}>Status</th>
                                                        <th style={{ verticalAlign: "middle", textAlign: "center", minWidth: "200px", maxWidth: "200px" }}>Detail</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        isLoading ?
                                                            <td className={'justifyContent'}>
                                                                <Spinner animation="border" role="status">
                                                                    <span className="sr-only">Memuat...</span>
                                                                </Spinner>
                                                            </td> :
                                                            rSearch && rSearch != "" ?
                                                                rSearch?.map((element, index) => {
                                                                    return (
                                                                        <ReimburseRow index={index} data={element} currentPage={currentPage}/>
                                                                    )
                                                                }) :
                                                                rStatus ?
                                                                    rStatus?.map((element, index) => {
                                                                        return (
                                                                            <ReimburseRow index={index} data={element} currentPage={currentPage}/>
                                                                        )
                                                                    }) :
                                                                    rCategory.length == 0 ?
                                                                        reimbursements.data?.list?.map((element, index) => {
                                                                            return (
                                                                                <ReimburseRow index={index} data={element} currentPage={currentPage}/>
                                                                            )
                                                                        }) : rCategory?.length == 0 ? "Data is empty" :
                                                                            rCategory.map((value, key) => {
                                                                                return (
                                                                                    <ReimburseRow index={key} data={value} currentPage={currentPage}/>
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
                </div>
                <div>
                    {search == null && status == null && c == null ?
                        total > 10 ?
                            <Container>
                                <Row>
                                    <Col>
                                        <div className="float-left text-dark" style={{ fontFamily: "verdana" }}>
                                            Menampilkan Halaman  {currentPage} dari {totalPages}
                                        </div>
                                        <div className="float-right" >
                                            <InputGroup size="md">
                                                <InputGroupAddon addonType="prepend">
                                                    <Button onClick={firstPage} type="button" style={{ backgroundColor: "#292961", color: "white" }} disabled={currentPage === 1 ? true : false}>
                                                        <FontAwesomeIcon icon={faFastBackward} />
                                                        {' '}Pertama
                                                </Button>
                                                    <Button onClick={prevPage} type="button" style={{ backgroundColor: "#292961", color: "white" }} disabled={currentPage === 1 ? true : false}>
                                                        <FontAwesomeIcon icon={faStepBackward} />
                                                        {' '}
                                                </Button>
                                                </InputGroupAddon>
                                                <FormControl onChange={changePage} style={pageNumCss} name="currentPage" value={currentPage} />
                                                <InputGroupAddon addonType="append">
                                                    <Button onClick={nextPage} type="button" style={{ backgroundColor: "#292961", color: "white" }} disabled={currentPage === totalPages ? true : false}>
                                                        <FontAwesomeIcon icon={faStepForward} />
                                                        {' '}
                                                </Button>
                                                    <Button onClick={lastPage} type="button" style={{ backgroundColor: "#292961", color: "white" }} disabled={currentPage === totalPages ? true : false}>
                                                        <FontAwesomeIcon icon={faFastForward} />
                                                        {' '}Terakhir
                                                </Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </div>
                                    </Col>

                                </Row>
                            </Container> : null : null
                    }
                </div>
            </div>
            <Footer />
        </div>

    )
}

/* Reducer */
const mapStateToProps = (state) => {
    return {
        reimbursements: state.findAllReimburse.data || [],
        rCategory: state.findReimburseByCategory.data || [],
        isLoading: state.findAllReimburse.isLoading,
        categories: state.findAllCategory.data || []
    }
}

/* Action */
const mapDispatchToProps = { findAllReimburse, findByCategory, findAllCategory }

export default connect(mapStateToProps, mapDispatchToProps)(ReimburseList);
