import { motion } from 'framer-motion'

export default function SiteLoader({ showTitle, fullPage }) {
	return (
		<div className={`${fullPage && 'fixed inset-0'} flex items-center justify-center text-amber-300 font-header`}>
			<div className='flex flex-col items-center'>
				<div className='h-32 w-32 flex items-end gap-3 justify-center mb-4'>
					<motion.div
						animate={{
							opacity: [0, 1, 1, 1, 0],
							filter: ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'],
							transition: {
								repeat: Infinity,
								repeatType: 'loop',
								duration: 1.75,
							},
						}}
					>
						<motion.div
							animate={{
								width: [32, 32],
								height: [32, 72],
								transition: {
									repeat: Infinity,
									repeatType: 'loop',
									type: 'spring',
									duration: 0.75,
									repeatDelay: 1,
								},
							}}
							className='bg-amber-400 rounded-full shadow-xl shadow-amber-500/25'
						/>
					</motion.div>
					<motion.div
						animate={{
							opacity: [0, 1, 1, 1, 0],
							filter: ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'],
							transition: {
								repeat: Infinity,
								repeatType: 'loop',
								duration: 1.75,
								delay: 0.25,
							},
						}}
					>
						<motion.div
							animate={{
								width: [32, 32],
								height: [32, 104],
								transition: {
									repeat: Infinity,
									repeatType: 'loop',
									type: 'spring',
									duration: 0.75,
									repeatDelay: 1,
									delay: 0.25,
								},
							}}
							className='bg-amber-400 rounded-full shadow-xl shadow-amber-500/25'
						/>
					</motion.div>
					<motion.div
						animate={{
							opacity: [0, 1, 1, 1, 0],
							filter: ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'],
							transition: {
								repeat: Infinity,
								repeatType: 'loop',
								duration: 1.75,
								delay: 0.5,
							},
						}}
					>
						<motion.div
							animate={{
								width: [32, 32],
								height: [32, 80],
								transition: {
									repeat: Infinity,
									repeatType: 'loop',
									type: 'spring',
									duration: 0.75,
									repeatDelay: 1,
									delay: 0.5,
								},
							}}
							className='bg-amber-400 rounded-full shadow-xl shadow-amber-500/25'
						/>
					</motion.div>
				</div>
				{showTitle ? (
					<motion.div
						initial={{ y: 24, opacity: 0, height: 0 }}
						animate={{ y: 0, opacity: 1, height: 'auto' }}
						className='flex flex-col items-center'
					>
						<p className='uppercase tracking-wider font-semibold text-sm'>Ledigt Distrikt</p>
						<p className='font-extrabold text-3xl'>2023</p>
					</motion.div>
				) : null}
			</div>
		</div>
	)
}
