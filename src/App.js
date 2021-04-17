import './assets/css/Register.css'
import './assets/css/Reimburse.css'
import './assets/css/Forget.css'
import './assets/css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/Dashboard.css'
import './assets/css/Form.css'
import './assets/css/EmployeeDetails.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { Provider } from 'react-redux';
import store from './configs/store';
import routes from "./configs/routes";
import 'reimburse.svg'
import Error404 from './pages/Error/Error404/Error404';
import Login from './pages/login/Login';
import RoutesHc from './dashboard/dashboardHc/RoutesHc';
import RoutesFinance from './dashboard/dashboardFinance/RoutesFinance';
import ListEmployee from './pages/Employee/listForm/ListEmployee';
import EmployeeForm from './pages/Employee/editForm/EmployeeForm';
import ReimburseList from './pages/reimburse/ReimburseList';
import DetailContract from './pages/detailContract/listForm/DetailContract';
import ReimburseListFinance from './pages/Finance/Reimburse/ReimburseListFinance';
import GradeList from './pages/grade/GradeList';
import DetailContractForm from './pages/detailContract/editForm/DetailContractForm';
import VerifiedForm from './pages/Employee/verified/VerifiedForm';
import Success from './pages/registration/Success';

function App() {
    const [role] = useState(localStorage.getItem("role"))
    return (
        <div >
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Login></Login>
                        </Route>
                        <Route path="/register-success" exact>
                            <Success></Success>
                        </Route>

                        {/* Admin HC */}
                        <Route path="/dashboard/hc" exact render={() => (
                            role != "1" ?
                                <Redirect to="/" /> : <RoutesHc></RoutesHc>
                        )} />
                        <Route path="/dashboard/hc/employee" exact render={() => (
                            role != "1" ?
                                <Redirect to="/" /> : <ListEmployee></ListEmployee>
                        )} />
                        <Route path="/employee/:id" exact render={() => (
                            role != "1" ?
                                <Redirect to="/" /> : <EmployeeForm></EmployeeForm>
                        )} />
                        <Route path="/employee/:id/edit" exact render={() => (
                            role != "1" ?
                                <Redirect to="/" /> : <EmployeeForm></EmployeeForm>
                        )} />
                        <Route path="/dashboard/hc/reimburse" exact render={() => (
                            role != "1" ?
                                <Redirect to="/" /> : <ReimburseList></ReimburseList> 
                        )} />
                        <Route path="/dashboard/hc/contract" exact render={() => (
                            role != "1" ?
                                <Redirect to="/" /> : <DetailContract></DetailContract>
                        )} />
                        <Route path="/contract/:id" exact render={() => (
                            role != "1" ?
                                <Redirect to="/" /> : <DetailContractForm></DetailContractForm> 
                        )} />
                        <Route path="/dashboard/hc/grade" exact render={() => (
                            role != "1" ?
                                <Redirect to="/" /> : <GradeList></GradeList> 
                        )} />


                        {/* Finance */}
                        <Route path="/dashboard/finance" exact render={() => (
                            role != "2" ?
                                <Redirect to="/" /> : <RoutesFinance></RoutesFinance>
                        )} />
                        <Route path="/dashboard/finance/reimburse" exact render={() => (
                            role != "2" ?
                                <Redirect to="/" /> : <ReimburseListFinance></ReimburseListFinance>
                        )} />

                        {/* Error Page */}
                        <Route path="*" exact>
                            <Error404></Error404>
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
