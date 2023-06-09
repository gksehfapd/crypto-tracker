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

interface INewData {
	x: Date
	y: number[]
}

function Chart({ coinId }: ChartProps) {
	let candleData: INewData[] = []
	const isDark = useRecoilValue(isDarkAtom)
	const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
		fetchCoinHistory(coinId)
	)
	const xData = data?.map((obj) => new Date(obj.time_open))
	const yData = data?.map((obj) => [obj.open, obj.high, obj.low, obj.close])

	if (xData && yData) {
		for (let i = 0; i < xData.length; i++) {
			candleData.push({ x: xData[i], y: yData[i] })
		}
	}

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
								data: candleData
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
