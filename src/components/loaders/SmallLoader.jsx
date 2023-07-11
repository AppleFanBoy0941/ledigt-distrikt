import { motion } from 'framer-motion'

export default function SmallLoader({ color }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { ease: 'easeOut', delay: 0.2 } }}
			exit={{ opacity: 0, scale: 0.7 }}
			className={`relative h-4 w-4 rounded-full overflow-hidden faded-mask`}
		>
			<motion.div
				animate={{
					left: [-16, 16 * 2],
					x: ['-50%', '-50%'],
					transition: {
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'easeInOut',
						duration: 1.5,
					},
				}}
				className={`absolute h-4 w-4 rounded-full ${color ? color : 'bg-white'}`}
			/>
		</motion.div>
	)
}
