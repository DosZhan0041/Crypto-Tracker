import React, { useEffect, useState } from "react"
import Chart from 'react-google-charts'


interface HistoricalData {
        prices: Array<[number, number]>;
}

let LineChart: React.FC<HistoricalData> = ({prices})=>{

    const [data, setData] = useState<any[][]>([["Date", "Prices"]]);

    useEffect(() => {
        const dataCopy: any[][] = [["Date", "Prices"]];
        if (prices && prices.length > 0) {
            prices.forEach((item) => {
                const date = new Date(item[0]).toLocaleDateString();
                const price = item[1];
                dataCopy.push([date, price]);
            });
            setData(dataCopy);
        }
    }, [prices]);

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