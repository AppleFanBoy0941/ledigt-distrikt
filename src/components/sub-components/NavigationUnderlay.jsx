import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function NavigationUnderlay({ children }) {
	const [isTop, setIsTop] = useState(true)

	function handleScroll() {
		const scrollPosition = window.scrollY

		if (scrollPosition > 24) {
			setIsTop(false)
		} else {
			setIsTop(true)
		}
	}

	useEffect(() => {
		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<motion.nav
			animate={{
				boxShadow: isTop ? '0 0.5rem 1rem rgb(71 85 105 / 0)' : '0 0.5rem 1rem rgb(71 85 105 / 0.1)',
				background: isTop ? 'rgb(248 250 252 / 0)' : 'rgb(248 250 252 / 1)',
			}}
			className={`fixed top-0 left-0 z-50 right-0 pt-6 p-2`}
		>
			{children}
		</motion.nav>
	)
}
