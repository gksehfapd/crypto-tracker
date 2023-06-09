import { useQuery } from '@tanstack/react-query'
import { fetchCoinTickers } from './api'
import styled from 'styled-components'

interface ChartProps {
	coinId: string
}

interface PriceData {
	id: string
	name: string
	symbol: string
	rank: number
	circulating_supply: number
	total_supply: number
	max_supply: number
	beta_value: number
	first_data_at: string
	last_updated: string
	quotes: {
		USD: {
			ath_date: string
			ath_price: number
			market_cap: number
			market_cap_change_24h: number
			percent_change_1h: number
			percent_change_1y: number
			percent_change_6h: number
			percent_change_7d: number
			percent_change_12h: number
			percent_change_15m: number
			percent_change_24h: number
			percent_change_30d: number
			percent_change_30m: number
			percent_from_price_ath: number
			price: number
			volume_24h: number
			volume_24h_change_24h: number
		}
	}
}

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`

function Price({ coinId }: ChartProps) {
	const { isLoading: infoLoading, data: infoData } = useQuery<PriceData>(
		['tickers', coinId],
		() => fetchCoinTickers(coinId)
	)
	const dataDirect = infoData?.quotes.USD
	return (
		<div>
			<div>15분 전보다 : {dataDirect?.percent_change_15m}</div>
			<div>30분 전보다 : {dataDirect?.percent_change_30m}</div>
			<div>1시간 전보다 : {dataDirect?.percent_change_1h}</div>
			<div>6시간 전보다 : {dataDirect?.percent_change_6h}</div>
			<div>12시간 전보다 : {dataDirect?.percent_change_12h}</div>
			<div>24시간 전보다 : {dataDirect?.percent_change_24h}</div>
			<div>7일 전보다 : {dataDirect?.percent_change_7d}</div>
			<div>30일 전보다 : {dataDirect?.percent_change_30d}</div>
			<div>1년 전보다 : {dataDirect?.percent_change_1y}</div>
		</div>
	)
}

export default Price
