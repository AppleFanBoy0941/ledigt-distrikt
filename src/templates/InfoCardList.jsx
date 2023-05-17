import InfoCard from '../components/InfoCard'
import useAxios from '../hooks/useAxios'

export default function InfoCardList() {
	const { data, loading } = useAxios('globalreports')

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
