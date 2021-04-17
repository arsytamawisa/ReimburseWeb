import {findById, save} from "../../../actions/employeeAction";
import {findAll} from "../../../actions/gradeAction";
import {connect} from "react-redux";
import {Link, useHistory, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Input, Label, Spinner} from "reactstrap";
import "../../../assets/css/EmployeeForm.css"
import Swal from 'sweetalert2';
import Header from "../../../dashboard/Header";
import MenuHc from "../../../dashboard/dashboardHc/MenuHc";
import Footer from "../../../dashboard/Footer";


function EmployeeForm({employee, findById, isLoading, save, findAll, error, grades, savedEmployee}) {


    const {id} = useParams();
    const [gradesModel, setGradesModel] = useState([])
    const history = useHistory();
    const [data, setData] = useState({})

    let employeeType = ["OFFICE", "ONSITE"]
    let employeeStatus = ["ACTIVE", "NON_ACTIVE"]

    useEffect(() => {
        findAll()
    }, [findAll])


    useEffect(() => {
        findById(id)
    }, [])

    useEffect(() => {
    }, [data])

    useEffect(() => {
        if (id && employee) {
            setData({
                id: employee.id,
                nip: employee.nip === null ? null : employee.nip,
                gradeId: employee.grade === null ? null : employee.grade.id,
                joinDate: employee.joinDate === null ? null : employee.joinDate,
                employeeType: employee.employeeType === null ? null : employee.employeeType,
                employeeStatus: employee.employeeStatus === null ? null : employee.employeeStatus
            })
        }
    }, [id, employee])


    useEffect(() => {
        if (savedEmployee) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data karyawan berhasil diubah!',
                showConfirmButton: false,
                timer: 1500
            })
            history.push("/dashboard/hc/employee");
        }
    }, [savedEmployee, history])

    useEffect(() => {
        if (id) {
            findById(id)
        }
        if (grades) {
            setGradesModel(grades)
        }
    }, [id, findById, grades])

    if (savedEmployee) {

    }

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        setData({...data, [name]: value})
    }

    const handleClick = (event) => {
        event.preventDefault();
        save(data);
    }


    console.log("REQUESSS", employee)
    console.log("DATA", data)


    const onSelectChange = (e) => {
        setData({...data, gradeId: e.target.value})
    }

    return (
        <div>
            <Header/>
            <MenuHc/>
            <div className="content-wrapper">
                <div className=" text-center mt-0 ">

                    <div className="row ">
                        <div className="col-lg-7 mx-auto">

                            <div className="card mt-5 mx-auto p-4 bg-light">

                                <div className="card-body bg-light">
                                    <h1 style={{fontFamily: "roboto"}}>Edit Data Karyawan</h1>
                                    <hr/>
                                    <div className="container">
                                        {
                                            !isLoading ? grades &&
                                                <form onSubmit={handleClick}>
                                                    <div className="controls">

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Input onChange={handleChange}
                                                                           value={data?.id || ''}
                                                                           type="text" name="id" hidden={true}/>

                                                                    <Label style={{
                                                                        fontFamily: "roboto",
                                                                        textAlign: "left"
                                                                    }}>
                                                                        NIP
                                                                    </Label>
                                                                    <Input onChange={handleChange}
                                                                           type="number"
                                                                           value={data?.nip === null ? '' : data?.nip}
                                                                           name="nip"/>

                                                                </div>

                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label style={{fontFamily: "roboto"}}>Grade</Label>
                                                                    <Input type="select"
                                                                           onChange={e => onSelectChange(e)}>

                                                                        <option selected disabled hidden>-- Pilihan --
                                                                        </option>
                                                                        {
                                                                            data?.gradeId === null ?
                                                                                gradesModel.data?.map((element, index) =>
                                                                                    <option key={index}
                                                                                            value={element.id}>
                                                                                        {element.grade}
                                                                                    </option>
                                                                                ) : gradesModel.data?.map((element, index) =>
                                                                                    <option
                                                                                        selected={element.id === data?.gradeId}
                                                                                        key={index}
                                                                                        value={element.id}>
                                                                                        {element.grade}
                                                                                    </option>
                                                                                )
                                                                        }
                                                                    </Input>

                                                                </div>

                                                            </div>

                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label htmlFor="join_date"
                                                                           style={{fontFamily: "roboto"}}>Tanggal
                                                                        Bergabung</Label>
                                                                    <Input onChange={handleChange} type="date"
                                                                           value={data?.joinDate === null ? '' : data?.joinDate}
                                                                           name="joinDate"/>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label style={{fontFamily: "roboto"}}>Status
                                                                        Karyawan</Label>
                                                                    <Input onChange={handleChange} type="select"
                                                                           name="employeeStatus">

                                                                        <option selected disabled hidden>-- Pilihan--
                                                                        </option>
                                                                        {
                                                                            data?.employeeStatus === null ?
                                                                                employeeStatus.map((element, index) =>
                                                                                    <option key={index} value={element}>
                                                                                        {element}
                                                                                    </option>
                                                                                ) : (
                                                                                    employeeStatus.map((element, index) =>
                                                                                        <option
                                                                                            selected={element === data?.employeeStatus}
                                                                                            key={index}
                                                                                            value={element}>
                                                                                            {element == 'ACTIVE'? 'AKTIF': "TIDAK AKTIF"}
                                                                                        </option>
                                                                                    )
                                                                                )
                                                                        }

                                                                    </Input>

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <Label style={{fontFamily: "roboto"}}> Tipe
                                                                        Karyawan</Label>
                                                                    <Input onChange={handleChange} type="select"
                                                                           name="employeeType">
                                                                        <option selected disabled hidden>-- Pilihan--
                                                                        </option>
                                                                        {
                                                                            data?.employeeType === null ?
                                                                                employeeType.map((element, index) =>
                                                                                    <option key={index} value={element}>
                                                                                        {element}
                                                                                    </option>
                                                                                ) : (
                                                                                    employeeType.map((element, index) =>
                                                                                        <option
                                                                                            selected={element === data?.employeeType}
                                                                                            key={index}
                                                                                            value={element}>
                                                                                            {element}
                                                                                        </option>
                                                                                    )
                                                                                )
                                                                        }

                                                                    </Input>

                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <Input type="submit" value="Simpan"
                                                                       onClick={handleClick} style={{
                                                                    backgroundColor: "#292961",
                                                                    color: "white"
                                                                }}>
                                                                    Simpan
                                                                </Input>

                                                            </div>

                                                        </div>

                                                    </div>


                                                </form> :
                                                <Spinner animation="grow" delay="3000" color="#292961"/>
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
        employee: state.findEmployeeById.data || null,
        isLoading: state.findEmployeeById.isLoading,
        savedEmployee: state.saveEmployee.data,
        grades: state.findAllGrade.data,
        error: state.findEmployeeById.error || state.saveEmployee.error,
        update: state.updateEmployee

    }
}
const mapDispatchToProps = {findById, save, findAll}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
