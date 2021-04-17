import { combineReducers } from 'redux';
import { registerEmployees } from './registerReducer';
import {
    findAllEmployee,
    findEmployeeById,
    saveEmployee,
    updateEmployee,
    saveVerified,
    findEmployeeByName, findEmployeeByStatus
} from "./employeeReducer";
import { loginEmployee } from "./loginReducer";
import { findAllReimburse, findReimburseById, findReimburseByCategory, updateReimburse } from './reimburseReducer';
import { findAllCategory } from './categoryReducer';
import { findAllGrade, findGradeById, saveGrade, updateGrade } from "./gradeReducer";
import { findAllContract, findContractById, updateContract, saveContract } from "./detailContractReducer";
import { findAllCount } from "./dashboardReducer";
import { forgotPassword } from './forgotPasswordReducer';
import { resetPassword } from './resetPasswordReducer';
import { findAllReimburseFinance, findReimburseFinanceById, updateReimburseFinance, findReimburseFinanceByCategory } from './reimburseFinanceReducer';
import { uploadFile, findBillById, updateFile } from './billReducer';
import {findContractByName} from "../sagas/detailContractSagas";

const rootReducer = combineReducers({
    registerEmployees, loginEmployee, forgotPassword, resetPassword,
    findAllEmployee, findEmployeeById, saveEmployee, updateEmployee,saveVerified,
    findAllReimburse, findReimburseById, findReimburseByCategory, updateReimburseFinance,
    findAllCategory, updateReimburse,
    findAllGrade, findGradeById, saveGrade, updateGrade,
    findAllContract, findContractById, updateContract, saveContract,
    findAllCount,
    findAllReimburseFinance, findReimburseFinanceById, findReimburseFinanceByCategory,
    findEmployeeByName,
    uploadFile, findBillById, updateFile,
    findEmployeeByStatus,
    findContractByName,
})

export default rootReducer