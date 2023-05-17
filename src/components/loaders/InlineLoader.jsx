import { easeOut, motion } from 'framer-motion'

export default function InlineLoader({ color }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { ease: 'easeOut', delay: 0.2 } }}
			className='relative h-4 w-12 rounded-full overflow-hidden faded-mask'
		>
			<motion.div
				animate={{
					left: ['-25%', '125%'],
					x: ['-50%', '-50%'],
					transition: {
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'easeInOut',
						duration: 1.2,
					},
				}}
				className={`absolute h-4 w-4 rounded-full bg-white`}
			></motion.div>
			<motion.div
				animate={{
					left: ['-25%', '125%'],
					x: ['-50%', '-50%'],
					transition: {
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'easeInOut',
						duration: 1.2,
						delay: 0.4,
					},
				}}
				className={`absolute h-4 w-4 rounded-full bg-white`}
			></motion.div>
			<motion.div
				animate={{
					left: ['-25%', '125%'],
					x: ['-50%', '-50%'],
					transition: {
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'easeInOut',
						duration: 1.2,
						delay: 0.8,
					},
				}}
				className={`absolute h-4 w-4 rounded-full bg-white`}
			></motion.div>
		</motion.div>
	)
}
