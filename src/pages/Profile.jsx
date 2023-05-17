import { useContext, useState } from 'react'
import useAxios from '../hooks/useAxios'
import { AuthContext } from '../contexts/AuthProvider'
import SiteLoader from '../components/loaders/SiteLoader'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import InlineLoader from '../components/loaders/InlineLoader'

export default function Profile() {
	const { auth, setAuth } = useContext(AuthContext)
	const userID = auth ? JSON.parse(auth).id : 0

	const [signedOut, setSignedOut] = useState(false)

	const { data: user, loading, error } = useAxios('users/' + userID)

	console.log(user)

	const navigate = useNavigate()

	return (
		<AnimatePresence mode='popLayout'>
			{loading ? (
				<motion.div key='loader' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<SiteLoader fullPage />
				</motion.div>
			) : (
				<motion.div key='content' initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
					<header className='flex flex-col items-center gap-6 font-header -mt-4 px-4'>
						<div className='h-40 w-40 bg-gradient-to-tr from-sky-100 to-slate-50 shadow-2xl shadow-sky-600/25 rounded-[4.5rem] border-2 border-sky-100 grid place-items-center text-5xl font-black tracking-wider text-sky-600'>
							{user.initials}
						</div>
						<div className='text-center'>
							<h1 className='text-3xl font-black text-slate-800'>
								{user.first_name} {user.last_name}
							</h1>
							<p className='font-bold text-lg mt-2 text-slate-600'>
								<span className='text-slate-300'>@</span>
								{user.username}
							</p>
						</div>
					</header>
					<button
						onClick={() => {
							setAuth(null, { days: -1 })
							navigate(0)
							setSignedOut(true)
						}}
						className='bg-black font-header w-full font-bold text-white h-14 flex items-center justify-center mb-6 rounded-3xl shadow-2xl shadow-black/50 mt-8'
					>
						{signedOut ? <InlineLoader /> : 'Log ud'}
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
