import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { findReimburseFinanceId, updateReimburseFinance } from './../../../actions/reimburseFinanceAction';
import { convert_to_rupiah, convert_date_format } from '../../../utils/converter';
import { uploadFile, findBillById, updateFile } from './../../../actions/billAction';


/* Just for UI */
import { BiUpload } from "react-icons/bi"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody } from 'reactstrap';
import Swal from 'sweetalert2'
import { BiIdCard, BiUserPin, BiCheckbox, BiCheckboxChecked, BiMoney, BiCalendar } from "react-icons/bi"
/* Just for UI */


const ReimburseRowFinance = ({
    element, index, currentPage,
    reimburse, findReimburseFinanceId,
    updatedReimburse, updateReimburseFinance,
    bill, findBillById,
    updatedFile, updateFile
}) => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState()


    useEffect(() => {
        if (updatedReimburse) {
            window.location.reload();
        }
    }, [updatedReimburse])


    useEffect(() => {
        if (status) {
            updateReimburseFinance(status)
        }
    }, [status])


    useEffect(() => {
        if (updatedFile) {
            if (updatedFile?.data?.code == 200 || updatedFile?.data?.code == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses',
                    text: 'Upload file berhasil',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Upload file gagal!',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        }
    }, [updatedFile])


    const getId = id => {
        findReimburseFinanceId(id)
        findBillById(id)
    }


    /* Modal */
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const toggle = () => setModal(!modal);

    const toggle2 = () => {
        setModal2(!modal2);
    }


    /* Handle Change File */
    const handleChangeFile = e => {
        setFile(e.target.files[0]);
    }


    /* Handle Change Status */
    const handleChangeStatus = (value, id) => {
        if (value == "finance") {
            setStatus({
                id,
                statusSuccess: false
            })
        } else {
            setStatus({
                id,
                statusSuccess: true
            })
        }
    }


    /* Handle Submit Upload File */
    const handleSubmit = () => {
        try {
            if (file) {
                const reader = new FormData()
                reader.append('file', file)
                const result = {
                    id: reimburse.id,
                    file: reader
                }
                updateFile(result)
                setModal2(!toggle2)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'File tidak boleh kosong!',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        }
        catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }


    return (
        <tr>
            <td>{(currentPage - 1) * 10 + index + 1}</td>
            <td>{element.categoryId.categoryName}</td>
            <td>{element.employeeId.fullname}</td>
            <td>
                <select className="custom-select td-width text-enigma border-enigma" style={{ width: "160px" }}
                    onChange={(e) => {
                        handleChangeStatus(e.target.value, element.id)
                    }}>
                    <option value="finance" selected={element?.statusOnFinance == true}> Proses </option>
                    <option value="success" selected={element?.statusSuccess == true}> Selesai </option>
                </select>
            </td>
            <td>
                <button className="btn btn-outline-enigma mr-3"
                    onClick={() => {
                        toggle()
                        getId(element?.id);
                    }}>
                    Detail
                </button>
            </td>
            <td>
                <button className="btn btn-outline-enigma"
                    onClick={() => {
                        toggle2()
                        getId(element?.id);
                    }}>
                    <BiUpload size="1.2em" />
                </button>
            </td>


            {/* ============ */}
            {/* MODAL DETAIL */}
            {/* ============ */}

            <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
                <div className="modal-header">
                    <div className="offset-1 col-md-10">
                        <h5 className="modal-title bold">Detail Reimbursement</h5>
                    </div>
                    <div className="col-md-2">
                        <p onClick={toggle} className="ml-4">
                            <FontAwesomeIcon icon={faTimes} className="pointer" />
                        </p>
                    </div>
                </div>
                <ModalBody>
                    {/* Row Pertama */}
                    <div className="row offset-md-1">

                        {/* Status */}
                        <div className="col-md-3">
                            <div className="row">
                                <h5 className="text-enigma mb-3 bold">Status</h5>
                                <>
                                    {
                                        reimburse?.statusOnHc ?
                                            <p className="p-enigma-bold">
                                                <BiCheckboxChecked size="1.5em" /> Admin HC
                                            </p>
                                            :
                                            <p className="p-enigma-bold">
                                                <BiCheckbox size="1.5em" /> Admin HC
                                            </p>
                                    }
                                    {
                                        reimburse?.statusOnFinance ?
                                            <p className="p-enigma-bold">
                                                <BiCheckboxChecked size="1.5em" /> Admin Finance
                                            </p>
                                            :
                                            <p className="p-enigma-bold">
                                                <BiCheckbox size="1.5em" /> Admin Finance
                                            </p>
                                    }
                                    {
                                        reimburse?.statusSuccess ?
                                            <p className="p-enigma-bold">
                                                <BiCheckboxChecked size="1.5em" /> Selesai
                                        </p>
                                            :
                                            <p className="p-enigma-bold">
                                                <BiCheckbox size="1.5em" /> Selesai
                                        </p>
                                    }
                                </>
                            </div>
                        </div>

                        {/* Cost */}
                        <div className="col-md-3">
                            <div className="row">
                                <h5 className="text-enigma mb-3 bold">Biaya</h5>
                                <p className="p-enigma-bold mb-0">
                                    <BiMoney size="1.3em" /> Biaya Klaim
                                </p>
                                <p className="p-enigma">{reimburse?.claimFee ? convert_to_rupiah(reimburse.claimFee) : ""}</p>
                            </div>
                            <div className="row">
                                <p className="p-enigma-bold mb-0">
                                    <BiMoney size="1.3em" /> Biaya Reimburse
                                </p>
                                <p className="p-enigma">{reimburse?.borneCost ? convert_to_rupiah(reimburse.borneCost) : ""}</p>
                            </div>
                        </div>

                        {/* User */}
                        <div className="col-md-3">
                            <div className="row">
                                <h5 className="text-enigma mb-3 bold">Karyawan</h5>
                                <p className="p-enigma-bold mb-0">
                                    <BiUserPin size="1.3em" /> Nama
                                    </p>
                                <p className="p-enigma">{reimburse?.employeeId?.fullname}</p>
                            </div>
                            <div className="row">
                                <p className="p-enigma-bold mb-0">
                                    <BiIdCard size="1.3em" /> NIP
                                    </p>
                                <p className="p-enigma">{reimburse?.employeeId?.nip}</p>
                            </div>
                        </div>
                    </div >

                    {/* Row Kedua */}
                    < div className="row mt-3 offset-md-1" >

                        <h5 className="text-enigma mb-3 bold">Tanggal</h5>
                        <div className="row">
                            <div className="col-md-3">
                                <p className="p-enigma-bold mb-0">
                                    <BiCalendar size="1.3em" /> Tanggal Pengajuan
                                    </p>
                                <p className="p-enigma">
                                    {reimburse?.dateOfClaimSubmission ? convert_date_format(reimburse.dateOfClaimSubmission) : ""}
                                </p>
                            </div>
                            {
                                reimburse?.categoryId?.categoryName == "Pelatihan" || reimburse?.categoryId?.categoryName == "Pelatihan" ?
                                    <div className="col-md-3">
                                        <p className="p-enigma-bold mb-0">
                                            <BiCalendar size="1.3em" /> Tanggal Mulai
                                    </p>
                                        <p className="p-enigma">
                                            {reimburse?.startDate ? convert_date_format(reimburse.startDate) : ""}
                                        </p>
                                    </div> : ""
                            }
                        </div >

                        <div className="row">
                            <div className="col-md-3">
                                <p className="p-enigma-bold mb-0">
                                    <BiCalendar size="1.3em" /> Tanggal Pencairan
                                    </p>
                                <p className="p-enigma">
                                    {reimburse?.disbursementDate ? convert_date_format(reimburse.disbursementDate) : ""}
                                </p>
                            </div >
                            {
                                reimburse?.categoryId?.categoryName == "Pelatihan" || reimburse?.categoryId?.categoryName == "Pelatihan" ?
                                    <div className="col-md-3">
                                        <p className="p-enigma-bold mb-0">
                                            <BiCalendar size="1.3em" /> Tanggal Selesai
                                        </p>
                                        <p className="p-enigma">
                                            {reimburse?.endDate ? convert_date_format(reimburse.endDate) : ""}
                                        </p>
                                    </div> : ""
                            }
                        </div >

                    </div >
                </ModalBody >
            </Modal >



            {/* ============ */}
            {/* MODAL UPDATE */}
            {/* ============ */}

            <Modal isOpen={modal2} toggle={toggle2}>
                <div className="modal-header">
                    <h5 className="modal-title bold">Upload File</h5>
                </div>
                <ModalBody>
                    <form encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="text-enigma bold">Upload File</h6>
                                <p className="p-enigma mt-0 mb-3">*Format file (PDF/JPG/PNG/JPEG)</p>
                                <input onChange={handleChangeFile} multiple name="file" type="file" className="form-control" />
                            </div>
                            <hr />
                            <div className="col-md-12 mb-1">
                                <button type="button" onClick={toggle2}
                                    className="btn btn-outline-enigma pull-right">Cancel</button>
                                <button type="button" onClick={handleSubmit}
                                    className="btn btn-enigma pull-right mr-3">Upload</button>
                            </div>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </tr >
    )
}


/* Reducer */
const mapStateToProps = (state) => {
    return {
        reimburse: state.findReimburseFinanceById.data || [],
        isLoading: state.findReimburseFinanceById.isLoading,
        uploadedFile: state.uploadFile.data,
        updatedReimburse: state.updateReimburseFinance.data,
        bill: state.findBillById.data,
        updatedFile: state.updateFile.data,
    }
}

/* Action */
const mapDispatchToProps = { findReimburseFinanceId, uploadFile, updateReimburseFinance, findBillById, updateFile }

export default connect(mapStateToProps, mapDispatchToProps)(ReimburseRowFinance);
