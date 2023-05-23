import InfoCard from './InfoCard'
import useAxios from '../hooks/useAxios'
import { useContext, useEffect } from 'react'
import { UpdateContext } from '../contexts/UpdateProvider'

export default function InfoCardList() {
	const { lastUpdate } = useContext(UpdateContext)
	const { data, loading, getData } = useAxios('globalreports')

	useEffect(() => {
		getData()
	}, [lastUpdate])

	return (
		<ul className='grid gap-4 mt-4 pb-8'>
			<InfoCard type='hours' data={data} loading={loading} />
			<InfoCard type='conversations' data={data} loading={loading} />
			<InfoCard type='publications' data={data} loading={loading} />
			<InfoCard type='videos' data={data} loading={loading} />
			<InfoCard type='returnVisits' data={data} loading={loading} />
		</ul>
	)
}
