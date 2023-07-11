import { motion, AnimatePresence } from 'framer-motion'
import InlineLoader from '../../components/loaders/InlineLoader'
import { useState } from 'react'
import { ArrowRightToLine, ArrowRightFromLine } from 'lucide-react'

export default function UpdatePeriod() {
	const [fromDate, setFromDate] = useState('')
	const [toDate, setToDate] = useState('')

	return (
		<form className='my-8 flex flex-col'>
			<h2 className='text-2xl px-6 font-header font-extrabold text-slate-600 mb-1'>Opdater tidsramme</h2>
			<div className='group bg-white flex border items-center border-slate-50 rounded-3xl shadow-xl shadow-slate-400/10 focus-within:border-slate-100 overflow-hidden transition-colors font-header font-bold'>
				<label className='flex-1 p-8 flex flex-col items-center focus-within:bg-slate-50/50 transition-colors'>
					<input
						value={fromDate}
						onKeyDown={e => {
							console.log(e)
							console.log(fromDate.toString().length >= 8 && e.key !== 'Backspace')
							if (fromDate.toString().length >= 8 && e.key !== 'Backspace') {
								return
							}
							if (e.key === 'Backspace') {
								setFromDate(fromDate.slice(0, -1))
								return
							}
							if (/^[0-9]$/i.test(e.key)) {
								console.log('det er et tal!')
								setFromDate(fromDate.toString() + e.key)
								return
							}
						}}
						type='number'
						className='opacity-0 h-0 w-0 focus:outline-none bg-transparent text-center text-xl'
					/>
					<ArrowRightFromLine className='mb-1 text-slate-300' />
					<div className='flex h-7 text-xl justify-center text-slate-600 font-semibold'>
						<motion.p
							key={fromDate.toString().slice(0, 2)}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							layout
						>
							{fromDate.toString().slice(0, 2)}
						</motion.p>
						{fromDate.toString().length > 2 && (
							<>
								<motion.p key='spacer-day-to-month' layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
									-
								</motion.p>
								<motion.p
									key={fromDate.toString().slice(2, 4)}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									layout
								>
									{fromDate.toString().slice(2, 4)}
								</motion.p>
							</>
						)}
						{fromDate.toString().length > 4 && (
							<>
								<motion.p key='spacer-month-to-year' initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} layout>
									-
								</motion.p>
								<motion.p
									key={fromDate.toString().slice(4, 8)}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									layout
								>
									{fromDate.toString().slice(4, 8)}
								</motion.p>
							</>
						)}
					</div>
				</label>
				<div className='opacity-100 group-hover:opacity-0 transition-opacity h-16 w-1 bg-gradient-to-t from-slate-50/0 via-slate-50/50 to-slate-50/0 -mx-[2px]' />
				<label className='flex-1 p-8 flex flex-col items-center focus-within:bg-slate-50/50 transition-colors'>
					<input
						value={toDate}
						onKeyDown={e => {
							if (toDate.toString().length >= 8 && e.key !== 'Backspace') {
								return
							}
							if (e.key === 'Backspace') {
								setToDate(toDate.slice(0, -1))
								return
							}
							if (/^[0-9]$/i.test(e.key)) {
								setToDate(toDate.toString() + e.key)
								return
							}
						}}
						type='number'
						className='opacity-0 h-0 w-0 focus:outline-none bg-transparent text-center text-xl'
					/>
					<ArrowRightToLine className='mb-1 text-slate-300' />
					<div className='flex h-7 text-xl justify-center text-slate-600 font-semibold'>
						<motion.p key={toDate.toString().slice(0, 2)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} layout>
							{toDate.toString().slice(0, 2)}
						</motion.p>
						{toDate.toString().length > 2 && (
							<>
								<motion.p key='spacer-day-to-month' layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
									-
								</motion.p>
								<motion.p
									key={toDate.toString().slice(2, 4)}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									layout
								>
									{toDate.toString().slice(2, 4)}
								</motion.p>
							</>
						)}
						{toDate.toString().length > 4 && (
							<>
								<motion.p key='spacer-month-to-year' initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} layout>
									-
								</motion.p>
								<motion.p
									key={toDate.toString().slice(4, 8)}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									layout
								>
									{toDate.toString().slice(4, 8)}
								</motion.p>
							</>
						)}
					</div>
				</label>
			</div>
			<motion.button
				// animate={{ opacity: reportHasChanged() ? 1 : 0.5 }}
				// onClick={updateReport}
				// disabled={!reportHasChanged()}
				className='font-header font-bold bg-sky-400 grid place-items-center rounded-3xl p-4 shadow-xl shadow-sky-600/25 text-sky-50 h-14 mt-4'
			>
				<AnimatePresence mode='popLayout'>
					{/* {loading ? (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<InlineLoader />
						</motion.div>
					) : ( */}
					<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						Opdater
					</motion.p>
					{/* )} */}
				</AnimatePresence>
			</motion.button>
		</form>
	)
}
