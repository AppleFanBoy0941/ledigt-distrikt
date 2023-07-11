import { AnimatePresence, motion } from 'framer-motion'
import SiteLoader from '../../components/loaders/SiteLoader'
import useAxios from '../../hooks/useAxios'
import GlobalReportListItem from '../../components/GlobalReportListItem'
import { useEffect, useState } from 'react'
import { BookOpen, Film, List, MessageCircle, TimerReset, Users } from 'lucide-react'
import SingleLink from '../../components/links/SingleLink'
import SmallLoader from '../../components/loaders/SmallLoader'

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
			<header className='flex justify-between items-center pl-6 pr-2'>
				<h2 className='text-slate-400 font-header font-extrabold text-2xl mb-1'>Gruppens rapport</h2>
				{loading && <SmallLoader color='bg-slate-600' />}
			</header>
			<ul className='flex flex-col gap-4 mb-6'>
				<motion.div
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-fuchsia-500 to-fuchsia-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-fuchsia-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<TimerReset className='text-fuchsia-300' />
						<p className='font-semibold text-fuchsia-100 font-header'>Timer</p>
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
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-amber-500 to-amber-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-amber-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<MessageCircle className='text-amber-300' />
						<p className='font-semibold text-amber-100 font-header'>Gode samtaler</p>
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
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-rose-500 to-rose-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-rose-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<BookOpen className='text-rose-300' />
						<p className='font-semibold text-rose-100 font-header'>Publikationer</p>
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
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-sky-500 to-sky-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-sky-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<Film className='text-sky-300' />
						<p className='font-semibold text-sky-100 font-header'>Film</p>
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
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 200, damping: 10 }}
					className='bg-gradient-to-t from-emerald-500 to-emerald-400 p-6 rounded-3xl flex justify-between items-center shadow-xl shadow-emerald-400/25 h-20'
				>
					<div className='flex items-center gap-2'>
						<Users className='text-emerald-300' />
						<p className='font-semibold text-emerald-100 font-header'>Genbesøg</p>
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
			<SingleLink to='/samlede-rapporter' icon={List}>
				Alle rapporter
			</SingleLink>
		</article>
	)
}
