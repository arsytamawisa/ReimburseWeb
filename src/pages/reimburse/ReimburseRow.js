import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { findBillById } from '../../actions/billAction';
import { findReimburseId, updateReimburse } from "../../actions/reimburseAction";
import { convert_to_rupiah, convert_date_format } from '../../utils/converter';

/* Just for UI */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody } from 'reactstrap';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Swal from 'sweetalert2'
import { BiIdCard, BiUserPin, BiDownload, BiCheckbox, BiCheckboxChecked, BiMoney, BiCalendar } from "react-icons/bi"
/* Just for UI */



const ReimburseRow = ({
    data, index, currentPage,
    updateReimburse, updatedReimburse,
    reimburse, findReimburseId,
    bill, findBillById,
}) => {

    const [modal, setModal] = useState(false)
    const [status, setStatus] = useState()
    const toggle = () => setModal(!modal)


    useEffect(() => {
        if (updatedReimburse) {
            window.location.reload()
        }

    }, [updatedReimburse])

    useEffect(() => {
        if (status) {
            updateReimburse(status)
        }
    }, [status])


    console.log("bill", bill);
    const getId = id => {
        findReimburseId(id)
        findBillById(id)
    }

    /* Tooltip */
    const renderTooltip = props => (
        <Tooltip {...props}>Berhasil di validasi admin finance</Tooltip>
    );


    /* Handle Change Status */
    const handleChangeStatus = (value, id) => {
        switch (value) {
            case "accepted":
                setStatus({
                    id,
                    statusOnFinance: true,
                    statusReject: false,
                    statusOnHc: true,
                })
                break;
            case "waiting":
                setStatus({
                    id,
                    statusOnFinance: false,
                    statusReject: false,
                    statusOnHc: false,
                })
                break;
            case "rejected":
                setStatus({
                    id,
                    statusOnFinance: false,
                    statusReject: true,
                    statusOnHc: false,
                })
                break;
            default:
                break;
        }
    }

    return (
        <tr>
            <td style={{ textAlign: "center", fontFamily: "verdana" }}>{(currentPage - 1) * 10 + index + 1}</td>
            <td style={{ textAlign: "center", fontFamily: "verdana" }}>{data.categoryId.categoryName}</td>
            <td style={{ textAlign: "center", fontFamily: "verdana" }}>{data.employeeId.fullname}</td>
            <td style={{ textAlign: "center", fontFamily: "verdana" }}>
                {
                    data.statusSuccess == true ?
                        <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                            <button className="btn btn-outline-enigma" style={{ width: "125px" }}> Sukses </button>
                        </OverlayTrigger> :
                        <select className="custom-select text-enigma border-enigma" style={{ width: "125px" }}
                            onChange={(e) => {
                                handleChangeStatus(e.target.value, data.id)
                            }}>
                            <option value="waiting" selected={data.statusOnHc == true}> Menunggu</option>
                            <option value="accepted" selected={data.statusOnFinance == true}> Diterima</option>
                            <option value="rejected" selected={data.statusReject == true}> Ditolak </option>
                        </select>
                }
            </td>
            <td style={{ textAlign: "center" }}>
                <button className="btn btn-outline-enigma mr-3"
                    onClick={() => {
                        toggle();
                        getId(data?.id);
                    }}>
                    <FontAwesomeIcon icon={faEye} />
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

                                {reimburse?.statusReject ?
                                    <p className="p-enigma-bold">
                                        <i className="fa fa-times" aria-hidden="true"></i> Ditolak
                                    </p>
                                    :
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
                                }
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
                                <p className="p-enigma-bold mb-0"> <BiUserPin size="1.3em" /> Nama </p>
                                <p className="p-enigma">{reimburse?.employeeId?.fullname}</p>
                            </div>
                            <div className="row">
                                <p className="p-enigma-bold mb-0"> <BiIdCard size="1.3em" /> NIP </p>
                                <p className="p-enigma">{reimburse?.employeeId?.nip}</p>
                            </div>
                        </div>
                        {
                            bill?.code == 200 ?
                                <div className="col-md-3">
                                    <div className="row">
                                        <h5 className="text-enigma mb-3 bold">File</h5>
                                        <a target="_blank" href={bill.data.url} style={{ color: "#292961" }}>
                                            <p className="p-enigma-bold mb-0">
                                                <BiDownload size="1.2em" /> Unduh File
                                            </p>
                                            <p className="p-enigma">{bill.data.billImage}</p>
                                        </a>
                                    </div>
                                </div> : ""
                        }
                    </div>

                    {/* Row Kedua */}
                    <div className="row mt-3 offset-md-1">

                        <div className="row">

                            <h5 className="text-enigma mb-3 bold">Tanggal</h5>
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
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <p className="p-enigma-bold mb-0">
                                    <BiCalendar size="1.3em" /> Tanggal Pencairan
                                </p>
                                <p className="p-enigma">
                                    {reimburse?.disbursementDate ? convert_date_format(reimburse.disbursementDate) : ""}
                                </p>
                            </div>
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
                        </div>

                    </div>
                </ModalBody>
            </Modal>
        </tr >
    )
}

/* Reducer */
const mapStateToProps = (state) => {
    return {
        reimburse: state.findReimburseById.data || [],
        isLoading: state.findReimburseById.isLoading,
        updatedReimburse: state.updateReimburse.data,
        bill: state.findBillById.data,
    }
}

/* Action */
const mapDispatchToProps = { findReimburseId, updateReimburse, findBillById }

export default connect(mapStateToProps, mapDispatchToProps)(ReimburseRow);
