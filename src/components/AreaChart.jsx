

// import { useEffect, useState } from 'react';
// import Chart from 'react-google-charts';

// export default function AreaChart({ historical, currentCurrency }) {
//   const [chartData, setChartData] = useState([["Date", "Price"]]);

//   useEffect(() => {
//     if (historical?.prices?.length > 0) {
//       const formatted = historical.prices.map(([timestamp, price]) => [
//         new Date(timestamp),
//         price,
//       ]);
//       setChartData([["Date", "Price"], ...formatted]);
//     }
//   }, [historical]);

//   const options = {
//     backgroundColor: 'transparent',
//     legend: 'none',
//     curveType: 'function',
//     hAxis: {
//       textStyle: { color: '#FFFFFF' },
//       gridlines: { color: '#444444' },
//       format: 'MMM dd',
//     },
//     vAxis: {
//       textStyle: { color: '#FFFFFF' },
//       gridlines: { color: '#444444' },
//       format: `'${currentCurrency}'#,##0.00`,
//     },
//     chartArea: {
//       backgroundColor: 'transparent',
//       width: '90%',
//       height: '80%',
//     },
//     colors: ['#10B981'],
//     lineWidth: 3,
//     trendlines: {
//       0: {
//         type: 'linear',
//         color: '#00FFFF',
//         lineWidth: 1,
//         opacity: 0.4,
//         showR2: false,
//       },
//     },
//     crosshair: {
//       trigger: 'both',
//       orientation: 'vertical',
//     },
//     tooltip: {
//       textStyle: { color: '#000000' },
//       isHtml: true,
//     },
//   };

//   return (
//     <div className="w-full h-[400px] bg-gray-900/30 border border-emerald-500/10 rounded-xl shadow-inner p-2">
//       <Chart
//         chartType="AreaChart"
//         data={chartData}
//         options={options}
//         className="w-full h-full"
//         loader={
//           <div className="flex items-center justify-center text-emerald-400 text-sm h-full">
//             Loading Market Data...
//           </div>
//         }
//         rootProps={{ 'data-testid': 'area-chart' }}
//       />
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

export default function AreaChart({ historical, currentCurrency }) {
    const [chartData, setChartData] = useState([["Date", "Price"]]);

    useEffect(() => {
        if (historical?.prices?.length > 0) {
            const formatted = historical.prices.map(([timestamp, price]) => [
                new Date(timestamp),
                price,
            ]);
            setChartData([["Date", "Price"], ...formatted]);
        }
    }, [historical]);

    const options = {
        backgroundColor: 'transparent',
        legend: 'none',
        curveType: 'function',
        hAxis: {
            textStyle: { color: '#FFFFFF' },
            gridlines: { color: '#444444' },
            format: 'MMM dd',
        },
        vAxis: {
            textStyle: { color: '#FFFFFF' },
            gridlines: { color: '#444444' },
            format: `'${currentCurrency}'#,##0.00`,
        },
        chartArea: {
            backgroundColor: 'transparent',
            width: '90%',
            height: '80%',
        },
        colors: ['#FACC15'], // Yellow color
        lineWidth: 3,
        trendlines: {
            0: {
                type: 'linear',
                color: '#FACC15',
                lineWidth: 1,
                opacity: 0.4,
                showR2: false,
            },
        },
        crosshair: {
            trigger: 'both',
            orientation: 'vertical',
        },
        tooltip: {
            textStyle: { color: '#000000' },
            isHtml: true,
        },
    };

    return (
        <div className="w-full h-[400px] bg-gray-900/30 border border-emerald-500/10 rounded-xl shadow-inner p-2">
            <Chart
                chartType="AreaChart"
                data={chartData}
                options={options}
                className="w-full h-full"
                loader={
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-emerald-400 animate-pulse">
                        <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-medium tracking-wide">Loading Market Data...</p>
                    </div>
                }
                rootProps={{ 'data-testid': 'area-chart' }}
            />
        </div>
    );
}
