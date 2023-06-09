import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import Price from './Price'
import Chart from './Chart'
import { useQuery } from '@tanstack/react-query'
import { fetchCoinInfo, fetchCoinTickers } from './api'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isDarkAtom } from '../atoms'
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md'
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface RouteParams {
	coinId: string
}

interface RouteState {
	name: string
}

interface ICoinProps {}

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`

const Header = styled.header`
	height: 15vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
`

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`

const Loader = styled.span`
	text-align: center;
	display: block;
`

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`

const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`

const Description = styled.p`
	margin: 20px 0px;
`

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`

const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 7px 0px;
	border-radius: 10px;
	color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
	a {
		display: block;
	}
`

const ControlBtn = styled.button`
	font-size: 20px;
	background-color: transparent;
	border: 0;
	cursor: pointer;
	&:hover {
		color: slategray;
	}
`

interface InfoData {
	id: string
	name: string
	symbol: string
	rank: number
	is_new: boolean
	is_active: boolean
	type: string
	logo: string
	description: string
	message: string
	open_source: boolean
	started_at: string
	development_status: string
	hardware_wallet: boolean
	proof_type: string
	org_structure: string
	hash_algorithm: string
	first_data_at: string
	last_data_at: string
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

function Coin({}: ICoinProps) {
	const history = useHistory()
	const clickGoback = () => {
		history.push('/')
	}
	const { coinId } = useParams<RouteParams>()
	const { state } = useLocation<RouteState>()
	const priceMatch = useRouteMatch('/:coinId/price')
	const chartMatch = useRouteMatch('/:coinId/chart')
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinId], () =>
		fetchCoinInfo(coinId)
	)
	const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
		['tickers', coinId],
		() => fetchCoinTickers(coinId)
		// {
		// 	refetchInterval: 5000
		// }
		//5초마다 갱신 / coinpaprika는 한시간에 60번까지만 요청을 받을 수 있음. 한달 25k
	)
	const setDarkAtom = useSetRecoilState(isDarkAtom)
	const isDark = useRecoilValue(isDarkAtom)
	const toggleDarkAtom = () => setDarkAtom((prev) => !prev)

	const loading = infoLoading || tickersLoading
	return (
		<Container>
			<Helmet>
				<title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</title>
			</Helmet>
			<Header>
				<ControlBtn onClick={clickGoback}>
					<AiOutlineArrowLeft />
				</ControlBtn>
				<Title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</Title>
				<ControlBtn onClick={toggleDarkAtom}>
					{isDark ? <MdOutlineLightMode /> : <MdDarkMode />}
				</ControlBtn>
			</Header>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>$ {tickersData?.quotes.USD?.price.toFixed(3)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>

					<Switch>
						<Route path={`/:coinId/price`}>
							<Price coinId={coinId} />
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	)
}
export default Coin
