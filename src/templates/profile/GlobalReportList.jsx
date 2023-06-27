import { AnimatePresence, motion } from 'framer-motion'
import SiteLoader from '../../components/loaders/SiteLoader'
import useAxios from '../../hooks/useAxios'
import GlobalReportListItem from '../../components/GlobalReportListItem'
import { useEffect, useState } from 'react'
import { BookOpen, Film, MessageCircle, TimerReset, Users } from 'lucide-react'

export default function GlobalReportList() {
	const { data, loading } = useAxios('globalreports')

	console.log(data)

	const [totalHours, setTotalHours] = useState(null)
	const [totalConversations, setTotalConversations] = useState(null)
	const [totalPublications, setTotalPublications] = useState(null)
	const [totalVideos, setTotalVideos] = useState(null)
	const [totalReturnVisits, setTotalReturnVisits] = useState(null)

	useEffect(() => {
		if (!data) return

		setTotalHours(data.reports.reduce((acc, curr) => acc + curr.hours, 0))
		setTotalConversations(data.reports.reduce((acc, curr) => acc + curr.conversations, 0))
		setTotalPublications(data.reports.reduce((acc, curr) => acc + curr.publications, 0))
		setTotalVideos(data.reports.reduce((acc, curr) => acc + curr.videos, 0))
		setTotalReturnVisits(data.reports.reduce((acc, curr) => acc + curr.returnVisits, 0))
	}, data)

	return (
		<article className='my-6'>
			<h2 className='px-6 text-slate-600 font-header font-extrabold text-2xl'>Gruppens rapport</h2>
			<ul className='flex flex-col gap-4 mb-6'>
				<motion.div
					whileTap={{ scale: 0.9 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-fuchsia-500 to-fuchsia-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-fuchsia-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<TimerReset className='text-fuchsia-300' />
						<p className='font-semibold text-fuchsia-200'>Timer</p>
					</div>
					<motion.p
						key={totalHours}
						initial={{ opacity: 0, x: 24 }}
						animate={{ opacity: 1, x: 0 }}
						className='text-4xl font-extrabold text-white font-header'
					>
						{totalHours}
					</motion.p>
				</motion.div>
				<motion.div
					whileTap={{ scale: 0.9 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-amber-500 to-amber-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-amber-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<MessageCircle className='text-amber-300' />
						<p className='font-semibold text-amber-200'>Gode samtaler</p>
					</div>
					<motion.p
						key={totalConversations}
						initial={{ opacity: 0, x: 24 }}
						animate={{ opacity: 1, x: 0 }}
						className='text-4xl font-extrabold text-white font-header'
					>
						{totalConversations}
					</motion.p>
				</motion.div>
				<motion.div
					whileTap={{ scale: 0.9 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-rose-500 to-rose-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-rose-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<BookOpen className='text-rose-300' />
						<p className='font-semibold text-rose-200'>Publikationer</p>
					</div>
					<motion.p
						key={totalPublications}
						initial={{ opacity: 0, x: 24 }}
						animate={{ opacity: 1, x: 0 }}
						className='text-4xl font-extrabold text-white font-header'
					>
						{totalPublications}
					</motion.p>
				</motion.div>
				<motion.div
					whileTap={{ scale: 0.9 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-sky-500 to-sky-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-sky-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<Film className='text-sky-300' />
						<p className='font-semibold text-sky-200'>Film</p>
					</div>
					<motion.p
						key={totalVideos}
						initial={{ opacity: 0, x: 24 }}
						animate={{ opacity: 1, x: 0 }}
						className='text-4xl font-extrabold text-white font-header'
					>
						{totalVideos}
					</motion.p>
				</motion.div>
				<motion.div
					whileTap={{ scale: 0.9 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-emerald-500 to-emerald-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-emerald-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<Users className='text-emerald-300' />
						<p className='font-semibold text-emerald-200'>Genbesøg</p>
					</div>
					<motion.p
						key={totalReturnVisits}
						initial={{ opacity: 0, x: 24 }}
						animate={{ opacity: 1, x: 0 }}
						className='text-4xl font-extrabold text-white font-header'
					>
						{totalReturnVisits}
					</motion.p>
				</motion.div>
			</ul>
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
				<motion.ul
					key='data'
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex flex-col border border-slate-50 rounded-3xl shadow-xl shadow-slate-400/10 bg-white gap-4'
				>
					<AnimatePresence mode='popLayout'>
						{data && data.reports.map(report => <GlobalReportListItem key={report.id} report={report} />)}
					</AnimatePresence>
				</motion.ul>
			)}
		</article>
	)
}
