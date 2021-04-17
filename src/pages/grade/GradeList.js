import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {findAll, findById, save} from '../../actions/gradeAction';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faSave} from '@fortawesome/free-solid-svg-icons/faSave';
import Swal from 'sweetalert2'
import {convert_to_rupiah} from '../../utils/converter';
import {Table} from "reactstrap";
import Header from "../../dashboard/Header";
import MenuHc from "../../dashboard/dashboardHc/MenuHc";
import Footer from "../../dashboard/Footer";


function GradeList({findAll, findById, save, savedGrade, grades, grade}) {

    const [isEdit, setIsEdit] = useState(false)
    const [number, setNumber] = useState("")
    const [data, setData] = useState({})

    const [coba, setCoba] = useState({
        giveBirthCost: "0"
    })

    useEffect(() => {
        findAll()
        setCoba({
            giveBirthCost: "_giveBirthCost"
        })
    }, [])

    useEffect(() => {
        if (savedGrade) {
            findAll()
        }
    }, [savedGrade])

    useEffect(() => {
        if (number != "") {
            setData(grade)
        }
    }, [grade])


    console.log("data", data);

    const handleChange = (e) => {
        let name = e.target.name
        let value = parseInt(e.target.value)
        if (isNaN(value)) value = 0
        setData({...data, [name]: value})
    }

    const handleUpdate = (number) => {
        setNumber(number)
        setIsEdit(true)
        findById(number)

        if (isEdit && number == grade.id) {
            Swal.fire({
                title: 'Konfirmasi',
                text: "Anda yakin ingin mengubah data?",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#292961',
                cancelButtonColor: '#292961',
                confirmButtonText: 'Ubah Data',
                cancelButtonText: 'Tidak',
            }).then(result => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sukses',
                        text: 'Data berhasil diubah',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setIsEdit(false)
                    save(data)
                } else {

                }
            })
        }
    }

    return (
        <div>
            <Header/>
            <MenuHc/>
            <div className="content-wrapper">
                <div className="content-header">
                    <h1 style={{color: "black", textAlign: "center", marginBottom: "2vh", fontFamily:"verdana"}}> DAFTAR GRADE</h1>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card" style={{height: "70vh"}}>
                                    <div className="card-header">
                                        <h3 className="card-title"></h3>

                                        <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{width: "150px"}}>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body table-responsive p-0" style={{height: "300px"}}>
                                        <Table className="table table-head-fixed text-nowrap">
                                            <thead>
                                            <tr>
                                                <th>Grade</th>
                                                <th>Biaya Melahirkan</th>
                                                <th>Biaya Kacamata</th>
                                                <th>Biaya Pelatihan</th>
                                                <th>Biaya Perjalanan Dinas</th>
                                                <th>Biaya Asuransi</th>
                                                <th>Edit</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                grades.data?.map((element, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {
                                                                    isEdit && number == element.id ?
                                                                        <input className="form-control" type="text"
                                                                               value={data?.giveBirthCost}
                                                                               onChange={handleChange}
                                                                               name="giveBirthCost"/>
                                                                        : convert_to_rupiah(element.giveBirthCost)
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    isEdit && number == element.id ?
                                                                        <input className="form-control" type="text"
                                                                               value={data?.glasessCost}
                                                                               onChange={handleChange}
                                                                               name="glasessCost"/>
                                                                        : convert_to_rupiah(element.glasessCost)
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    isEdit && number == element.id ?
                                                                        <input className="form-control" type="text"
                                                                               value={data?.trainingCost}
                                                                               onChange={handleChange}
                                                                               name="trainingCost"/>
                                                                        : convert_to_rupiah(element.trainingCost)
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    isEdit && number == element.id ?
                                                                        <input className="form-control" type="text"
                                                                               value={data?.officialTravelCost}
                                                                               onChange={handleChange}
                                                                               name="officialTravelCost"/>
                                                                        : convert_to_rupiah(element.officialTravelCost)
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    isEdit && number == element.id ?
                                                                        <input className="form-control" type="text"
                                                                               value={data?.insuranceCost}
                                                                               onChange={handleChange} name="insuranceCost"/>
                                                                        : convert_to_rupiah(element.insuranceCost)
                                                                }
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-outline-enigma"
                                                                        onClick={() => handleUpdate(element.id)}>
                                                                    {
                                                                        isEdit && number == element.id ?
                                                                            <FontAwesomeIcon icon={faSave}/>
                                                                            : <FontAwesomeIcon icon={faEdit}/>
                                                                    }
                                                                </button>
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

            </div>
            <Footer/>
        </div>


    )
}


/* Reducer */
const mapStateToProps = (state) => {
    return {
        grades: state.findAllGrade.data || [],
        grade: state.findGradeById.data || [],
        savedGrade: state.saveGrade.data,
        isLoading: state.findAllGrade.isLoading,
    }
}

/* Action */
const mapDispatchToProps = {findAll, findById, save}

export default connect(mapStateToProps, mapDispatchToProps)(GradeList);
