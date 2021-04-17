import {findAll} from "../../../actions/dashboardAction";
import {connect} from "react-redux";
import {useEffect} from "react";
import {Doughnut} from "react-chartjs-2";

function DoughnutTypeEmployee({findAll, dashboards, error, isLoading}) {

    useEffect(() => {
        findAll()
    }, [])

    const state = {
        labels: ['OFFICE', 'ONSITE'],
        datasets: [
            {
                label: 'Tipe Kontrak',
                backgroundColor: [
                    '#292961',
                    '#FFDEAD'
                ],
                hoverBackgroundColor: [
                    '#292961',
                    '#FFDEAD'
                ],
                data: [dashboards?.data?.countEmployeeTypeOnsite, dashboards?.data?.countEmployeeTypeOffice]
            }
        ]
    }
    return(
        <div>

            <Doughnut
                data={state}
                options={{
                    title:{
                        display:true,
                        text:'Jumlah Karyawan Berdasarkan Tipe Karyawan',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'bottom'
                    }
                }}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dashboards : state.findAllCount.data || null,
        error : state.findAllCount.error,
        isLoading: state.findAllCount.isLoading

    }
}

const mapDispatchToProps = {findAll}
export default connect(mapStateToProps, mapDispatchToProps)(DoughnutTypeEmployee)