import {all} from 'redux-saga/effects'
import {watchRegisterEmployee} from './registerSagas'
import {
    watchFindAllEmployee,
    watchFindEmployeeById, watchFindEmployeeByName, watchFindEmployeeByStatus,
    watchSaveEmployee, watchSaveVerified,
    watchUpdateEmployee
} from './employeeSagas'
import {watchLoginEmployee} from "./loginSagas";
import {
    watchFindAllReimburse,
    watchFindReimburseById,
    watchFindReimburseByCategory,
    watchUpdateReimburse
} from './reimburseSagas';
import {
    watchFindAllReimburseFinance,
    watchFindReimburseFinanceById,
    watchFindReimburseFinanceByCategory, watchUpdateReimburseFinance
} from './reimburseFinanceSagas';

import {watchFindAllCategory} from './categorySagas';
import {watchFindAllGrade, watchFindGradeById, watchSaveGrade} from "./gradeSagas";
import {
    watchFindAllContract,
    watchFindContractById, watchFindContractByName,
    watchSaveContract,
    watchUpdateContract
} from "./detailContractSagas";
import {watchFindAllCount} from "./dashboardSagas";
import {watchForgotPassword} from './forgotPasswordSagas';
import {watchResetPassword} from './resetPasswordSagas';
import {watchBillById, watchUpdateFile, watchUploadFile} from "./billSagas";



export default function* rootSaga() {
    yield all([
        watchLoginEmployee(), watchRegisterEmployee(), watchForgotPassword(), watchResetPassword(),
        watchFindAllEmployee(), watchFindEmployeeById(), watchUpdateEmployee(), watchSaveEmployee(),watchFindEmployeeByName(),
        watchFindAllReimburse(), watchFindReimburseById(), watchFindReimburseByCategory(),watchUpdateReimburse(),
        watchFindAllCategory(),
        watchFindAllGrade(), watchFindGradeById(), watchSaveGrade(),
        watchFindAllContract(), watchFindContractById(), watchUpdateContract(), watchSaveContract(),watchFindContractByName(),
        watchFindAllCount(),
        watchSaveVerified(),
        watchUploadFile(), watchBillById(), watchUpdateFile(),
        watchFindEmployeeByStatus(),
        watchFindAllReimburseFinance(),  watchFindReimburseFinanceById(),  watchFindReimburseFinanceByCategory(),watchUpdateReimburseFinance(),
        watchUploadFile(), watchBillById(), watchUpdateFile()
    ])
}