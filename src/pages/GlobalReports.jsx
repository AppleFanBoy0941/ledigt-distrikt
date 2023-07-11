import GlobalReportListItem from '../components/GlobalReportListItem'
import SiteLoader from '../components/loaders/SiteLoader'
import useAxios from '../hooks/useAxios'
import { motion } from 'framer-motion'

export default function GlobalReports() {
	const { data, loading } = useAxios('globalreports')

	console.log(data)

	return (
		<>
			{loading ? (
				<motion.div key='loader'>
					<SiteLoader fullPage />
				</motion.div>
			) : (
				<motion.ul key='data' className='flex flex-col gap-6 pb-12'>
					{data && data.reports.map(report => <GlobalReportListItem key={report.id} report={report} />)}
				</motion.ul>
			)}
		</>
	)
}
