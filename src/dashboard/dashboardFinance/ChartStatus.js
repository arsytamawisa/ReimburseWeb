import {findAll} from "../../actions/dashboardAction";
import {connect} from "react-redux";
import {Pie} from "react-chartjs-2";
import {useEffect} from "react";

function ChartStatus({findAll, dashboards}) {

    useEffect(()=> {
        findAll()
    }, [])

    const state = {
        labels: ['Sukses', 'Proses'],
        datasets: [
            {
                label:"Status Reimbursement",
                fill: false,
                lineTension: 0.5,
                backgroundColor: [
                    '#292961',
                    '#FFDEAD',
                ],
                hoverBackgroundColor: [
                    '#292961',
                    '#FFDEAD'
                ],
                data: [dashboards?.data?.countStatusSuccessReimbursementEmployee,
                        dashboards?.data?.countStatusProcessReimbursementEmployee]
            }
        ]
    }

    return(
        <div>
            <Pie
                data={state}
                options={{
                    title:{
                        display:true,
                        text:'Klaim Pengembalian Dana Berdasarkan Status',
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

    }
}

const mapDispatchToProps = {findAll}
export default connect(mapStateToProps, mapDispatchToProps)(ChartStatus)