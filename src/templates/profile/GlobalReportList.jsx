import { AnimatePresence, motion } from 'framer-motion'
import SiteLoader from '../../components/loaders/SiteLoader'
import useAxios from '../../hooks/useAxios'

export default function GlobalReportList() {
	const { data, loading } = useAxios('globalreports')

	console.log(data)

	return (
		<article className='my-6'>
			<h2 className='px-6 text-slate-600 font-header font-extrabold text-2xl'>Rapporter</h2>
			<motion.ul
				animate={{ height: 'fit-content' }}
				className='flex flex-col border border-slate-50 rounded-3xl shadow-xl shadow-slate-400/10'
			>
				<AnimatePresence mode='popLayout'>
					{loading ? (
						<motion.div
							key='loader'
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
						>
							<SiteLoader />
						</motion.div>
					) : (
						<motion.p key='data'>
							{data &&
								data.reports.map(report => (
									<li>
										<header>{report.date}</header>
									</li>
								))}
						</motion.p>
					)}
				</AnimatePresence>
			</motion.ul>
		</article>
	)
}
