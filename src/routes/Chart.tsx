import { useQuery } from '@tanstack/react-query'
import { fetchCoinHistory } from './api'
import ApexChart from 'react-apexcharts'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../atoms'

interface ChartProps {
	coinId: string
}

interface IHistorical {
	time_open: string
	time_close: string
	open: number
	high: number
	low: number
	close: number
	volume: number
	market_cap: number
}

function Chart({ coinId }: ChartProps) {
	const isDark = useRecoilValue(isDarkAtom)
	const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
		fetchCoinHistory(coinId)
	)
	// console.log(data)
	// const newData = data?.map((e) => Object.values(e))
	// console.log(newData)
	// const chartDate = data?.map((e) => e.time_open)
	// console.log(chartDate)
	// const chartData = data?.map((e) => [e.open, e.high, e.low, e.close])
	// console.log(chartData)
	// let obj: { x: string }
	// let dateArr: Object[]
	// let hello = chartDate?.map((e) => dateArr.push((obj.x = e)))
	// console.log(hello)
	// let obj = chartDate?.reduce((accumulator, value, index) => {
	// 	return { ...accumulator, ['x' + index]: value }
	// }, {})

	// console.log(obj)

	return (
		<div>
			{isLoading ? (
				'Loading chart...'
			) : (
				<>
					<ApexChart
						type="line"
						series={[
							{
								name: 'Price',
								data: data?.map((price) => price.close) ?? []
							}
						]}
						options={{
							theme: {
								mode: isDark ? 'dark' : 'light'
							},
							chart: {
								height: 300,
								width: 500,
								toolbar: {
									show: false
								},
								background: 'transparent'
							},
							grid: { show: false },
							stroke: {
								curve: 'smooth',
								width: 4
							},
							yaxis: {
								show: false
							},
							xaxis: {
								axisBorder: { show: false },
								axisTicks: { show: false },
								labels: { show: false },
								type: 'datetime',
								categories: data?.map((price) =>
									new Date(parseFloat(price.time_close) * 1000).toISOString()
								)
							},
							fill: {
								type: 'gradient',
								gradient: { gradientToColors: ['#0be881'], stops: [0, 100] }
							},
							colors: ['#0fbcf9'],
							tooltip: {
								y: {
									formatter: (value) => `$ ${value.toFixed(3)}`
								}
							}
						}}
					/>
					<ApexChart
						series={[
							{
								data: [
									{
										x: new Date(1538778600000),
										y: [6629.81, 6650.5, 6623.04, 6633.33]
									},
									{
										x: new Date(1538780400000),
										y: [6632.01, 6643.59, 6620, 6630.11]
									},
									{
										x: new Date(1538782200000),
										y: [6630.71, 6648.95, 6623.34, 6635.65]
									},
									{
										x: new Date(1538784000000),
										y: [6635.65, 6651, 6629.67, 6638.24]
									},
									{
										x: new Date(1538785800000),
										y: [6638.24, 6640, 6620, 6624.47]
									},
									{
										x: new Date(1538787600000),
										y: [6624.53, 6636.03, 6621.68, 6624.31]
									}
								]
							}
						]}
						type="candlestick"
						options={{
							theme: {
								mode: 'dark'
							},
							chart: {
								height: 300,
								width: 500,
								toolbar: {
									show: false
								},
								background: 'transparent'
							},
							grid: { show: false },
							xaxis: {
								axisBorder: { show: false },
								axisTicks: { show: false },
								labels: { show: false },
								type: 'datetime',
								categories: data?.map((price) =>
									new Date(parseFloat(price.time_close) * 1000).toISOString()
								)
							},
							yaxis: {
								show: false
							},
							tooltip: {
								y: {
									formatter: (value) => `$ ${value.toFixed(3)}`
								}
							}
						}}
					/>
				</>
			)}
		</div>
	)
}

export default Chart
