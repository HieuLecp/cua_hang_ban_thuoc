
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import lineChart from "./configs/lineChart";
import { useEffect, useState } from "react";
import axios from "axios";
const LineChart = () => {
    const { Title } = Typography;
    const token = JSON.parse(localStorage.getItem("token"));
    const [data, setData] = useState();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
    }
    useEffect(() => {
        axios.get(`https://localhost:7102/api/thongke/doanhthu`, { headers })
            .then(respone => {
                if (respone.data.status === 200) {
                    setData(respone.data.data);
                }
            }).catch(err => console.log(err))
    }, [])
    const result = lineChart(data);
    return (
        <>
            <div className="linechart">
                <div>
                    <h1 className="admin-h1">Thống kê doanh thu hàng tháng</h1>
                </div>
            </div>

            <ReactApexChart
                className="full-width"
                options={result.options}
                series={result.series}
                type="area"
                height={350}
                width={"100%"}
            />
        </>
    );
}

export default LineChart;
