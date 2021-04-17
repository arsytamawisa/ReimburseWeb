import {findAll} from "../../../actions/dashboardAction";
import {connect} from "react-redux";
import {useEffect} from "react";
import { Pie} from 'react-chartjs-2';

function ChartGender({findAll, dashboards, error, isLoading}) {

    useEffect(()=> {
        findAll()
    }, [])

    const state = {
        labels: ['PEREMPUAN', 'LAKI-LAKI'],
        datasets: [
            {
                label: 'Jenis Kelamin',
                backgroundColor: [
                    '#292961',
                    '#FFDEAD',
                ],
                hoverBackgroundColor: [
                    '#000080',
                    '#FFDEAD',
                ],
                data: [dashboards?.data?.countEmployeeFemale, dashboards?.data?.countEmployeeMale]
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
                        text:'Jumlah Karyawan Berdasarkan Jenis Kelamin',
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartGender)