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
	max-width: 480px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
`

const PriceInfo = styled.div`
	background-color: white;
	text-align: center;
	padding: 24px;
	border-radius: 8px;
`

function Price({ coinId }: ChartProps) {
	const { isLoading: infoLoading, data: infoData } = useQuery<PriceData>(
		['tickers', coinId],
		() => fetchCoinTickers(coinId)
	)
	console.log(infoData)

	return (
		<div>
			{infoLoading ? null : (
				<Container>
					<PriceInfo>
						15분 전보다 :{' '}
						{infoData?.quotes.USD.percent_change_15m ? (
							<span>infoData?.quotes.USD.percent_change_15m</span>
						) : null}{' '}
						%
					</PriceInfo>
					<PriceInfo>
						30분 전보다 :{' '}
						{infoData?.quotes.USD.percent_change_30m ? (
							<span>infoData?.quotes.USD.percent_change_30m</span>
						) : null}{' '}
						%
					</PriceInfo>
					<PriceInfo>
						1시간 전보다 :{' '}
						{infoData?.quotes.USD.percent_change_1h ? (
							<span>infoData?.quotes.USD.percent_change_1h</span>
						) : null}{' '}
						%
					</PriceInfo>
					<PriceInfo>
						6시간 전보다 :{' '}
						{infoData?.quotes.USD.percent_change_6h ? (
							<span>infoData?.quotes.USD.percent_change_6h</span>
						) : null}{' '}
						%
					</PriceInfo>
					<PriceInfo>
						12시간 전보다 :{' '}
						{infoData?.quotes.USD.percent_change_12h ? (
							<span>infoData?.quotes.USD.percent_change_12h</span>
						) : null}{' '}
						%
					</PriceInfo>
					<PriceInfo>
						24시간 전보다 :{' '}
						{infoData?.quotes.USD.percent_change_24h ? (
							<span>infoData?.quotes.USD.percent_change_24h</span>
						) : null}{' '}
						%
					</PriceInfo>
					<PriceInfo>
						7일 전보다 :{' '}
						{infoData?.quotes.USD.percent_change_7d ? (
							<span>infoData?.quotes.USD.percent_change_7d</span>
						) : null}{' '}
						%
					</PriceInfo>
					<PriceInfo>
						30일 전보다 :{' '}
						{infoData?.quotes.USD.percent_change_30d ? (
							<span>infoData?.quotes.USD.percent_change_30d</span>
						) : null}{' '}
						%
					</PriceInfo>
					<PriceInfo>
						1년 전보다 :{' '}
						{infoData?.quotes.USD.percent_change_1y ? (
							<span>infoData?.quotes.USD.percent_change_1y</span>
						) : null}{' '}
						%
					</PriceInfo>
				</Container>
			)}
		</div>
	)
}

export default Price
