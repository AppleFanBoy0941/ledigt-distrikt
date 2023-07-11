import { Clock1, Clock2, Clock3, Clock4, Clock5, Clock6, Clock7, Clock8, Clock9, Clock10, Clock11, Clock12 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import ReportInput from '../components/inputs/ReportInput'
import { useContext } from 'react'
import useAxios from '../hooks/useAxios'
import { AuthContext } from '../contexts/AuthProvider'
import useLocalStorage from '../hooks/useLocalStorage'
import InlineLoader from '../components/loaders/InlineLoader'
import { useNavigate } from 'react-router-dom'
import { UpdateContext } from '../contexts/UpdateProvider'
import SmallLoader from '../components/loaders/SmallLoader'

export default function ReportCard() {
	const date = new Date()
	const weekdays = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']

	const [hours, setHours] = useLocalStorage('hours', 0)
	const [conversations, setConversations] = useLocalStorage('conversations', 0)
	const [returnVisits, setReturnVisits] = useLocalStorage('returnVisits', 0)
	const [publications, setPublications] = useLocalStorage('publications', 0)
	const [videos, setVideos] = useLocalStorage('videos', 0)

	const { setLastUpdate } = useContext(UpdateContext)

	const { auth } = useContext(AuthContext)

	const { data, loading, patchData } = useAxios(
		'users/' +
			JSON.parse(auth).id +
			'/reports?date=' +
			date.getFullYear() +
			'-' +
			(date.getMonth() + 1) +
			'-' +
			date.getDate() +
			'&createNewIfEmpty=true'
	)

	async function updateReport() {
		try {
			const response = await patchData({
				hours,
				conversations,
				returnVisits,
				publications,
				videos,
			})
			console.log(response)
		} catch (error) {
			console.log(error)
		}

		setHours(0)
		setConversations(0)
		setPublications(0)
		setReturnVisits(0)
		setVideos(0)

		setLastUpdate(new Date().getTime())
	}

	const time = date.getMinutes() >= 30 ? date.getHours() + 1 : date.getHours()
	const timeLeft = 24 - time

	const clock = time === 0 ? 12 : time > 12 ? time - 12 : time

	function reportHasChanged() {
		const sum = hours + conversations + publications + returnVisits + videos

		if (sum) return true

		return false
	}

	return (
		<div className='flex flex-col gap-4'>
			<motion.section
				variants={{
					initial: {
						y: 16,
						opacity: 0,
					},
					animate: {
						y: 0,
						opacity: 1,
						transition: {
							staggerChildren: 0.1,
						},
					},
				}}
				initial='initial'
				animate='animate'
				className='bg-white p-4 pb-6 rounded-3xl shadow-2xl shadow-slate-600/20 flex flex-col gap-8 overflow-hidden'
			>
				<header className='flex items-end justify-between select-none font-header'>
					<div>
						<motion.span
							variants={{
								initial: { y: 24, opacity: 0 },
								animate: { y: 0, opacity: 1 },
							}}
							className='text-xs font-extrabold uppercase tracking-wider text-slate-400 leading-none'
						>
							Min rapport
						</motion.span>
						<h2 className='text-3xl font-black text-slate-900 leading-none'>{weekdays[date.getDay()]}</h2>
					</div>
					<AnimatePresence mode='popLayout'>
						{loading ? (
							<motion.div key='loader' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
								<SmallLoader color='bg-slate-400' />
							</motion.div>
						) : (
							<motion.div
								key='loaded'
								initial={{ opacity: 0, x: 16 }}
								animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
								className={`flex flex-col items-end gap-1 ${timeLeft <= 6 ? 'text-red-300' : 'text-slate-200'}`}
							>
								{clock === 1 ? (
									<Clock1 className={`h-5 w-5 stroke-2`} />
								) : clock === 2 ? (
									<Clock2 className={`h-5 w-5 stroke-2`} />
								) : clock === 3 ? (
									<Clock3 className={`h-5 w-5 stroke-2`} />
								) : clock === 4 ? (
									<Clock4 className={`h-5 w-5 stroke-2`} />
								) : clock === 5 ? (
									<Clock5 className={`h-5 w-5 stroke-2`} />
								) : clock === 6 ? (
									<Clock6 className={`h-5 w-5 stroke-2`} />
								) : clock === 7 ? (
									<Clock7 className={`h-5 w-5 stroke-2`} />
								) : clock === 8 ? (
									<Clock8 className={`h-5 w-5 stroke-2`} />
								) : clock === 9 ? (
									<Clock9 className={`h-5 w-5 stroke-2`} />
								) : clock === 10 ? (
									<Clock10 className={`h-5 w-5 stroke-2`} />
								) : clock === 11 ? (
									<Clock11 className={`h-5 w-5 stroke-2`} />
								) : clock === 12 ? (
									<Clock12 className={`h-5 w-5 stroke-2`} />
								) : (
									<Clock2 className={`h-5 w-5 stroke-2`} />
								)}
								<p className={`text-xs font-semibold ${timeLeft <= 6 ? 'text-red-400' : 'text-slate-300'}`}>
									{timeLeft} {timeLeft === 1 ? 'time' : 'timer'} tilbage
								</p>
							</motion.div>
						)}
					</AnimatePresence>
				</header>
				<div className='grid gap-6'>
					<ReportInput type='hours' reportValue={data?.report.hours} value={hours} setValue={setHours} />
					<ReportInput
						type='conversations'
						reportValue={data?.report.conversations}
						value={conversations}
						setValue={setConversations}
					/>
					<ReportInput
						type='publications'
						reportValue={data?.report.publications}
						value={publications}
						setValue={setPublications}
					/>
					<ReportInput type='videos' reportValue={data?.report.videos} value={videos} setValue={setVideos} />
					<ReportInput
						type='returnVisits'
						reportValue={data?.report.returnVisits}
						value={returnVisits}
						setValue={setReturnVisits}
					/>
					<div className='flex flex-col gap-4'>
						<p className='text-sm text-slate-500'>
							Gem rapporten hver gang du har ændret på den for at være sikker på det bliver husket
						</p>
					</div>
				</div>
			</motion.section>
			<motion.button
				animate={{ opacity: reportHasChanged() ? 1 : 0.5 }}
				onClick={updateReport}
				disabled={!reportHasChanged()}
				className='font-header font-bold bg-sky-400 grid place-items-center rounded-3xl p-4 shadow-xl shadow-sky-600/25 text-sky-50 h-14'
			>
				<AnimatePresence mode='popLayout'>
					{loading ? (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<InlineLoader />
						</motion.div>
					) : (
						<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							Gem rapport
						</motion.p>
					)}
				</AnimatePresence>
			</motion.button>
		</div>
	)
}
