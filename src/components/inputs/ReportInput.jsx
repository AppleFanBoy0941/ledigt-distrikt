import { Minus, Plus } from 'lucide-react'
import tailwindColors from '../../assets/tailwindColors'
import debounce from 'lodash.debounce'
import { useState, useMemo, useCallback } from 'react'
import { AnimatePresence, color, motion } from 'framer-motion'

export default function ReportInput({ type, value, setValue, reportValue }) {
	const colors = tailwindColors(type)

	const titles = {
		hours: 'Timer',
		conversations: 'Gode samtaler',
		returnVisits: 'Genbesøg',
		publications: 'Publikationer',
		videos: 'Film',
	}

	function decrement() {
		if (value <= reportValue * -1) return
		setValue(value - 1)
	}

	function increment() {
		setValue(value + 1)
	}

	function showDecrementButton() {
		if (reportValue > 0) return true
		if (value > 0) return true

		return false
	}

	return (
		<div className='flex justify-between items-center'>
			<div className='font-header'>
				<h5 className='text-xs text-slate-600 font-semibold leading-none'>{titles[type]}</h5>
				{reportValue !== undefined ? (
					<motion.p
						key={reportValue}
						initial={{ y: 4, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className={`text-4xl font-black leading-none ${reportValue < 1 ? colors.text[200] : colors.text[400]}`}
					>
						{reportValue}
					</motion.p>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className={`h-9 w-6 rounded-md ${colors.background[100]}`}
					/>
				)}
			</div>
			<div className={`flex items-center gap-4`}>
				<AnimatePresence>
					{value !== 0 && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1, transition: { ease: 'easeOut', duration: 0.1 } }}
							exit={{ opacity: 0, scale: 0.8, transition: { ease: 'easeIn', duration: 0.1 } }}
						>
							<motion.p
								initial={{ opacity: 0, x: 8 }}
								animate={{ opacity: 1, x: 0 }}
								key={value}
								className='text-slate-500 font-semibold mr-2'
							>
								{value > 0 && '+'}
								{value}
							</motion.p>
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence mode='wait'>
					{showDecrementButton() && (
						<motion.button
							type='button'
							onClick={decrement}
							initial={{ x: 32, scale: 0.5 }}
							animate={{ scale: 1, rotate: 0, x: 0, width: 48 }}
							exit={{ scale: 0.8, opacity: 0, transition: { delay: 0.15, ease: 'easeIn', duration: 0.05 } }}
							whileTap={{ scale: 0.8, rotate: -5, width: 48 }}
							className={`h-12 w-12 grid place-items-center border-[3px] rounded-full ${colors.border[300]} ${colors.text[300]}`}
						>
							<Minus className='' strokeWidth={3} />
						</motion.button>
					)}
				</AnimatePresence>
				<motion.button
					type='button'
					onClick={increment}
					animate={{ scale: 1, rotate: 0 }}
					whileTap={{ scale: 0.8, rotate: 5 }}
					className={`grid place-items-center h-12 w-12 rounded-full text-white ${colors.background[400]}`}
				>
					<Plus strokeWidth={3} />
				</motion.button>
			</div>
		</div>
	)
}
