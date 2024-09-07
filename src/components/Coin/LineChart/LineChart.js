import { useEffect, useState } from "react"
import Chart from 'react-google-charts'

let LineChart = ({historicData})=>{

    const [data, setData] = useState([["Data", "Prices"]])

    useEffect(()=>{
        let dataCopy = [["Data", "Prices"]];
        if(historicData.prices){
            historicData.prices.map((item)=>{
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
            })
            setData(dataCopy)
        }
    },[historicData])

    return(
        <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
        />
    )

}
export default LineChart