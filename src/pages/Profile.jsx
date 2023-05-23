import { useContext, useState } from 'react'
import useAxios from '../hooks/useAxios'
import { AuthContext } from '../contexts/AuthProvider'
import SiteLoader from '../components/loaders/SiteLoader'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import InlineLoader from '../components/loaders/InlineLoader'
import { ChevronRight, Eye, EyeOff } from 'lucide-react'

export default function Profile() {
	const { auth, setAuth } = useContext(AuthContext)
	const userID = auth ? JSON.parse(auth).id : 0

	const [signedOut, setSignedOut] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const { data, loading } = useAxios('users/' + userID)

	const navigate = useNavigate()

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
		<AnimatePresence mode='popLayout'>
			{loading ? (
				<motion.div key='loader' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<SiteLoader fullPage />
				</motion.div>
			) : (
				<motion.div key='content' initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
					<header className='flex flex-col items-center gap-6 font-header -mt-4 px-4'>
						<div className='h-40 w-40 bg-gradient-to-tr from-sky-100 to-slate-50 shadow-2xl shadow-sky-600/10 rounded-[4.5rem] border-2 border-sky-100 grid place-items-center text-5xl font-black tracking-wider text-sky-600'>
							{data.user.initials}
						</div>
						<div className='text-center'>
							<h1 className='text-3xl font-black text-slate-800'>
								{data.user.first_name} {data.user.last_name}
							</h1>
							<p className='font-bold text-lg mt-2 text-slate-600'>
								<span className='text-slate-300'>@</span>
								{data.user.username}
							</p>
						</div>
					</header>
					<section className='flex flex-col gap-6 mt-8'>
						<div className='p-2 rounded-3xl h-14 flex items-center bg-white border border-slate-50 shadow-xl shadow-slate-400/10 font-header font-bold text-slate-800 pl-6 pr-4'>
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
										{data.user.password.split('').map((letter, index) => (
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
										{data.user.password.split('').map((_, index) => {
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
							<motion.button
								whileTap={{ scale: 0.9 }}
								className='text-slate-400'
								onClick={() => setShowPassword(!showPassword)}
							>
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
						{data.user.role === 'super-admin' ? (
							<Link
								to='/profil/opret-bruger'
								className='flex items-center justify-between h-14 bg-white border border-slate-50 rounded-3xl shadow-xl shadow-slate-400/10 pl-6 pr-4 font-header font-bold text-slate-800'
							>
								Opret bruger
								<ChevronRight className='text-slate-400' />
							</Link>
						) : null}
						<button
							onClick={() => {
								setAuth(null, { days: -1 })
								navigate(0)
								setSignedOut(true)
							}}
							className='bg-black font-header w-full font-bold text-white h-14 flex items-center justify-center mb-6 rounded-3xl shadow-2xl shadow-black/50 mt-4'
						>
							{signedOut ? <InlineLoader /> : 'Log ud'}
						</button>
					</section>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
