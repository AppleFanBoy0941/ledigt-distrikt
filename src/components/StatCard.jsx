import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import tailwindColors from '../assets/tailwindColors'
import useGetProperties from '../hooks/useGetProperties'
import InlineLoader from './loaders/InlineLoader'

export default function StatCard({ type, data, loading }) {
	const colors = tailwindColors(type)
	const [info, setInfo] = useState(null)
	const [current, setCurrent] = useState(null)
	const [total, setTotal] = useState(null)

	const date = new Date(
		`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`.replace(/-/g, '/')
	).toISOString()

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
		<motion.div className={`${colors.background[400]} p-6 rounded-3xl shadow-2xl font-header ${colors.shadow[600]} grid gap-3`}>
			<header className='flex items-center justify-between'>
				<div className={`flex items-center ${colors.text[200]} gap-2`}>
					<Icon strokeWidth={3} />
					<span className={`text-sm uppercase tracking-wider font-extrabold ${colors.text[50]}`}>{getProperties().name}</span>
				</div>
			</header>
			<motion.div>
				<AnimatePresence mode='popLayout'>
					{loading ? (
						<motion.div
							key='loader'
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 32, opacity: 1, transition: { delay: 0.5 } }}
							exit={{ opacity: 0 }}
						>
							<div className='p-2 flex justify-center'>
								<InlineLoader />
							</div>
						</motion.div>
					) : (
						<motion.div
							key='data'
							initial={{ height: 32, opacity: 0 }}
							animate={{ height: 128, opacity: 1, transition: { delay: 0.25, type: 'spring', stiffness: 200, damping: 20 } }}
							exit={{ height: 0 }}
							className='grid place-items-center'
						>
							<div className={`flex flex-col items-center p-2 text-center font-medium ${colors.text[200]}`}>
								<p className='text-lg font-extrabold font-header text-center text-white'>Ups!</p>
								<p>Det har vi vist ikke fået lavet endnu.</p>
								<p>Men der kommer snart en ny opdatering der fikser det.</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
			<section>
				<div className='flex items-baseline justify-between'>
					<div className='h-[60px]'>
						<AnimatePresence mode='popLayout'>
							{current?.count ? (
								<motion.span
									key={current.count}
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									className='inline-block text-6xl font-black text-white'
								>
									{current.count}
								</motion.span>
							) : (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 0.75 }}
									exit={{ opacity: 0 }}
									className={`inline-block h-[51px] w-12 rounded-lg ${colors.background[300]}`}
								/>
							)}
						</AnimatePresence>
						{current?.count ? (
							<motion.span
								initial={{ x: 24, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								className={`inline-block ml-1 font-black ${colors.text[100]}`}
							>
								i dag
							</motion.span>
						) : null}
					</div>
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
