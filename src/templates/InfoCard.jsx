import { AnimatePresence, motion } from 'framer-motion'
import tailwindColors from '../assets/tailwindColors'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetProperties from '../hooks/useGetProperties'
import InlineLoader from '../components/loaders/InlineLoader'

export default function InfoCard({ type, data, loading }) {
	const colors = tailwindColors(type)
	const [info, setInfo] = useState(null)
	const [current, setCurrent] = useState(null)
	const [total, setTotal] = useState(null)

	const navigate = useNavigate()

	const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`

	useEffect(() => {
		if (data) {
			setInfo(
				data.reports.map(item => {
					return {
						count: item[type],
						date: item.date,
					}
				})
			)

			setCurrent(
				data.reports
					.map(item => {
						return {
							count: item[type],
							date: item.date,
						}
					})
					.find(item => item.date === date)
			)

			setTotal(
				data.reports.reduce((total, report) => {
					return (total += report[type])
				}, 0)
			)
		}
	}, [loading])

	const getProperties = useGetProperties(type)

	const Icon = getProperties().icon

	return (
		<motion.div
			onClick={() => {
				navigate('/rapport/' + getProperties().url)
			}}
			className={`${colors.background[400]} p-4 rounded-3xl shadow-xl font-header ${colors.shadow[400]} grid gap-3`}
		>
			<header className='flex items-center justify-between'>
				<div className={`flex items-center ${colors.text[200]} gap-1`}>
					<Icon strokeWidth={3} className='h-4 w-4' />
					<span className={`text-xs uppercase tracking-wider font-extrabold ${colors.text[50]}`}>{getProperties().name}</span>
				</div>
				<button className='rounded-full'>
					<AnimatePresence mode='popLayout'>
						{loading ? (
							<InlineLoader small />
						) : (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
								<ChevronRight strokeWidth={3} className={`h-4 w-4 ${colors.text[200]}`} />
							</motion.div>
						)}
					</AnimatePresence>
				</button>
			</header>
			<section className='flex flex-col'>
				<div className='flex items-end justify-between'>
					<div className='h-12'>
						<motion.span
							key={current?.count}
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							className='inline-block text-5xl font-black text-white'
						>
							{current?.count || 0}
						</motion.span>
						<motion.span layout className={`inline-block ml-1 font-black ${colors.text[100]}`}>
							i dag
						</motion.span>
					</div>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='flex items-end gap-1'>
						<div className={`h-1 w-1 ${colors.background[300]} rounded-full`}></div>
						<div className={`h-3 w-1 ${colors.background[300]} rounded-full`}></div>
						<div className={`h-5 w-1 ${colors.background[300]} rounded-full`}></div>
						<div className={`h-4 w-1 ${colors.background[300]} rounded-full`}></div>
						<div className={`h-4 w-1 ${colors.background[200]} rounded-full`}></div>
						<div className={`h-1 w-1 ${colors.background[300]} opacity-50 rounded-full`}></div>
						<div className={`h-1 w-1 ${colors.background[300]} opacity-50 rounded-full`}></div>
					</motion.div>
				</div>
			</section>
			<AnimatePresence mode='popLayout'>
				<motion.footer
					initial={{ opacity: 0, x: -4 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 4 }}
					key={total}
					className={`font-semibold text-sm ${colors.text[200]}`}
				>
					{total || '-'} i alt
				</motion.footer>
			</AnimatePresence>
		</motion.div>
	)
}
