import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import Image from "../../assets/image/dashboard.svg";
import {CardBody} from "reactstrap";
import {findAll} from "../../actions/dashboardAction";
import {connect} from "react-redux";
import DoughnutFinance from "./DoughnutFinance";
import ChartStatus from "./ChartStatus";

function ContentFinance() {
    let year = new Date().getFullYear()

    useEffect(() => {
        findAll()
    }, [])

    const useDate = ()=> {
        const locale = 'id'

        const [today, setToday] = useState(new Date())

        useEffect(() => {
            const timer = setInterval( () => {
                setToday(new Date())
            }, 60 * 1000)
            return () => {
                clearInterval(timer)
            }
        })

        const day = today.toLocaleDateString(locale, {weekday: 'long'})
        const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {month:'long'}, {year:'number'})}\n\n`
        const hour = today.getHours();
        const wish =  `Selamat ${(hour < 12 && 'Pagi') || (hour < 17 && 'Siang') || 'Malam'}, `;

        const time = today.toLocaleTimeString(locale,{hour:'numeric', hour12: true, minute:'numeric'})
        return {
            date,
            time,
            wish
        }
    }



    return (
        <div>
            <div className="content-wrapper">
                <Card>
                    <Row className="mt-5">
                        {/*<div style={{ marginTop:"-2vh"}}>*/}
                          <Col md={6} xs={6}>
                              <h3 style={{fontFamily:"roboto, ubuntu, oxygen", marginLeft:"10vh", justifyContent: "center"}}> {useDate().wish} Admin Enigmanians!
                                  <p>
                                      {useDate().date}
                                      {year} {''}
                                      {useDate().time}
                                  </p>
                              </h3>
                          </Col>
                          <Col md={6} xs={6}>
                              <div className="float-right" style={{ marginRight:"50px"}}>
                                  <img src={Image} alt="image"/>
                              </div>
                          </Col>
                        {/*</div>*/}
                    </Row>
                </Card>

                        <div>
                            <Row style={{display:"flex", justifyContent:"center"}}>
                                <Col md={6}>
                                    <Card>
                                        <CardBody>
                                            <DoughnutFinance/>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card>
                                        <CardBody>
                                            <ChartStatus/>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dashboards: state.findAllCount.data || null,
        error: state.findAllCount.error,
        isLoading: state.findAllCount.isLoading

    }
}

const mapDispatchToProps =
    {
        findAll
    }
export default connect(mapStateToProps, mapDispatchToProps)(ContentFinance)