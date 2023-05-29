import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

export default function Password({ password, background }) {
	const [showPassword, setShowPassword] = useState(false)

	const passwordVariants = {
		bubble: {
			initial: {
				y: 8,
				scale: 0,
				opacity: 0,
			},
			animate: {
				y: 0,
				scale: 1,
				opacity: 1,
			},
		},
	}

	return (
		<div
			className={`flex items-center font-header font-bold text-slate-800 ${
				background ? 'p-2 rounded-3xl h-14 bg-white border border-slate-50 shadow-xl shadow-slate-400/10 pl-6 pr-4' : 'p-1 pr-0'
			}`}
		>
			<AnimatePresence mode='popLayout'>
				{showPassword ? (
					<motion.p
						variants={{
							initial: { opacity: 0 },
							animate: { opacity: 1, transition: { staggerChildren: 0.02 } },
							exit: { opacity: 0 },
						}}
						initial='initial'
						animate='animate'
						exit='exit'
						key='password_on'
						className='flex-1'
					>
						{password.split('').map((letter, index) => (
							<motion.span
								variants={{
									initial: { x: 4, opacity: 0, scale: 0.8 },
									animate: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
								}}
								key={letter + index}
								className='inline-flex'
							>
								{letter}
							</motion.span>
						))}
					</motion.p>
				) : (
					<motion.div
						key='password_off'
						variants={{
							initial: { opacity: 0 },
							animate: { opacity: 1, transition: { staggerChildren: 0.03 } },
							exit: { opacity: 0 },
						}}
						initial='initial'
						animate='animate'
						exit='exit'
						className='flex-1 flex items-center gap-1'
					>
						{password.split('').map((_, index) => {
							if (index > 15) return null
							return (
								<motion.div
									key={index}
									variants={passwordVariants.bubble}
									className='h-2 w-2 bg-slate-500 rounded-full'
								></motion.div>
							)
						})}
					</motion.div>
				)}
			</AnimatePresence>
			<motion.button whileTap={{ scale: 0.9 }} className='text-slate-400' onClick={() => setShowPassword(!showPassword)}>
				<AnimatePresence mode='popLayout'>
					{showPassword ? (
						<motion.div key='password_on' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<Eye />
						</motion.div>
					) : (
						<motion.div key='password_off' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<EyeOff />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>
		</div>
	)
}
