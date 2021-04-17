import {Input, Label, Spinner} from "reactstrap";
import {useParams, useHistory} from "react-router-dom"
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {findById, save} from "../../../actions/detailContractAction";
import "../../../assets/css/DetailContractFom.css"
import swal from "sweetalert";
import Header from "../../../dashboard/Header";
import MenuHc from "../../../dashboard/dashboardHc/MenuHc";
import Footer from "../../../dashboard/Footer";


function DetailContractForm({contract, findById, isLoading, save, error, savedContract}) {

    const {id} = useParams();
    const history = useHistory();
    const [data, setData] = useState({})
    const [employeeId, setEmployeeId] = useState("")


    let typeContract = ["PROBABITION", "PKWT"]
    let benefitRegistrationStatus = ["ON_PROCESS", "DONE"]



    useEffect(() => {
        findById(id)
    }, [])

    useEffect(() => {
    }, [data])


    useEffect(() => {
        if (id && contract) {
            setData({
                id: contract?.id,
                employeeId: contract?.employeeId.id,
                typeContract: contract.typeContract === null ? null : contract.typeContract,
                benefitRegistrationStatus: contract.benefitRegistrationStatus === null ? null : contract?.benefitRegistrationStatus ,
                startDateContract: contract.startDateContract === null ? null : contract.startDateContract,
                endDateContract: contract.endDateContract === null ? null : contract.endDateContract,
                dateOfAcceptancePermanentEmployee: contract.dateOfAcceptancePermanentEmployee === null ? null : contract.dateOfAcceptancePermanentEmployee,
                dateOfResignation: contract.dateOfResignation === null ? null : contract.dateOfResignation,
                placement: contract.placement === null ? null : contract.placement,
                endedContract: contract.endedContract === null ? null : contract.endedContract,
            })
        }
    }, [id, contract])



    useEffect(() => {
        if (id) {
            findById(id)
        }
    }, [id, findById])


    useEffect(() => {
        if (contract) {
            console.log("DETAIL FORM", contract)
            setEmployeeId(contract?.employeeId.id)
        }
    }, [contract])

    console.log("employee", employeeId)


    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        setData({...data, [name]: value})
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("CLICK")
        save(data)
    }

    useEffect(() => {
        if (savedContract) {
            swal("Berhasil", "Data karyawan berhasil diubah!", "success")
            history.push("/dashboard/hc/contract")
        }
    }, [savedContract, history])

    console.log("data", data)
    // console.log("contract", contract)


    return (
        <div>
            <Header/>
            <MenuHc/>
            <div className="content-wrapper">
                <div className=" text-center mt-0 ">

                    <div className="row ">
                        <div className="col-lg-7 mx-auto">

                            <div className="card mt-5 mx-auto p-4 bg-light">

                                <div className="card-body bg-light" >
                                    <h1>Edit Detail Kontrak</h1>
                                    <hr/>
                                    <div className="container">
                                        {
                                            !isLoading ?
                                                <form  onSubmit={handleSubmit}>
                                                    <div className="controls">

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label> Status Asuransi</Label>
                                                                    <Input onChange={handleChange} type="select"
                                                                           name="benefitRegistrationStatus" value={data?.benefitRegistrationStatus}>
                                                                        <option selected disabled hidden>-- Pilihan --</option>
                                                                        {
                                                                            data?.benefitRegistrationStatus === null ?
                                                                                benefitRegistrationStatus.map((element, index) =>
                                                                                    <option key={index} value={element}>
                                                                                        {element}
                                                                                    </option>
                                                                                ) : (
                                                                                    benefitRegistrationStatus.map((element, index) =>
                                                                                        <option
                                                                                            selected={element === data?.benefitRegistrationStatus}
                                                                                            key={index} value={element }>
                                                                                            {element  == "ON_PROCESS" ? "PROSES" : "SELESAI"}
                                                                                        </option>
                                                                                    )
                                                                                )
                                                                        }
                                                                    </Input>
                                                                </div>

                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label> Tanggal Karyawan Tetap </Label>
                                                                    <Input type="date" onChange={handleChange}
                                                                           value={data?.dateOfAcceptancePermanentEmployee === null ? null : data?.dateOfAcceptancePermanentEmployee }
                                                                           name="dateOfAcceptancePermanentEmployee"/>

                                                                </div>
                                                            </div>


                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label> Tipe Kontrak </Label>
                                                                    <Input type="select" defaultValue={data?.typeContract} onChange={handleChange}
                                                                           name="typeContract">
                                                                        <option selected disabled hidden>-- Pilihan --</option>
                                                                        {
                                                                            data?.typeContract === null ?
                                                                                typeContract.map((element, index) =>
                                                                                    <option key={index} value={element}>
                                                                                        {element}
                                                                                    </option>
                                                                                ) : (
                                                                                    typeContract.map((element, index) =>
                                                                                        <option selected={element === data?.typeContract}
                                                                                                key={index}
                                                                                                value={element}>
                                                                                            {element == "PKWT" ? "PKWT" : "PROBATION"}
                                                                                        </option>
                                                                                    )
                                                                                )
                                                                        }
                                                                    </Input>

                                                                </div>

                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label> Tanggal Resign </Label>
                                                                    <Input type="date" onChange={handleChange}
                                                                           value={data?.dateOfResignation === null ? null : data?.dateOfResignation }
                                                                           name="dateOfResignation"/>

                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label> Tanggal Mulai Kontrak </Label>
                                                                    <Input type="date" onChange={handleChange}
                                                                           value={data?.startDateContract  === null ? null : data?.startDateContract}
                                                                           name="startDateContract"/>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label> Tanggal Habis Kontrak </Label>
                                                                    <Input type="date" onChange={handleChange}
                                                                           value={data?.endDateContract  === null ? null : data?.endDateContract} name="endDateContract"/>

                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label> Penempatan</Label>
                                                                    <Input onChange={handleChange} type="text"
                                                                           value={data.placement  === null ? null : data?.placement} name="placement"/>

                                                                </div>

                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label> Habis Kontrak</Label>
                                                                    <Input type="select" onChange={handleChange} name="endedContract">
                                                                    {
                                                                        data?.endedContract === null ?
                                                                            <>
                                                                                <option selected disabled hidden>-- Pilihan--</option>
                                                                                <option value={true}> YA</option>
                                                                                <option value={false}>TIDAK</option>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <option selected={true === data?.endedContract}
                                                                                        value={true}>YA
                                                                                </option>
                                                                                <option selected={false === data?.endedContract}
                                                                                        value={false}>Tidak
                                                                                </option>
                                                                            </>
                                                                    }
                                                                    </Input>
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <Input type="submit" value="Simpan" onClick={handleSubmit} style={{backgroundColor: "#292961", color: "white"}}>
                                                                    Simpan
                                                                </Input>

                                                            </div>

                                                        </div>

                                                    </div>


                                                </form> :
                                                <Spinner animation="grow" delay="2000"/>
                                        }


                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <Footer/>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contract: state.findContractById.data || null,
        isLoading: state.findContractById.isLoading,
        savedContract: state.saveContract.data,
        error: state.findContractById.error || state.saveContract.error,
        update: state.updateContract
    }
}
const mapDispatchToProps = {findById, save}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContractForm)
