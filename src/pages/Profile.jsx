import { useContext, useState } from 'react'
import useAxios from '../hooks/useAxios'
import { AuthContext } from '../contexts/AuthProvider'
import SiteLoader from '../components/loaders/SiteLoader'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import InlineLoader from '../components/loaders/InlineLoader'
import { ChevronRight, UserPlus, Users } from 'lucide-react'
import Password from '../components/sub-components/Password'
import SingleLink from '../components/links/SingleLink'
import GlobalReportList from '../templates/profile/GlobalReportList'

export default function Profile() {
	const { auth, setAuth } = useContext(AuthContext)
	const userID = auth ? JSON.parse(auth).id : 0

	const [signedOut, setSignedOut] = useState(false)

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
							{data?.user.initials}
						</div>
						<div className='text-center'>
							<h1 className='text-3xl font-black text-slate-800'>
								{data?.user.first_name} {data?.user.last_name}
							</h1>
							<p className='font-bold text-lg mt-2 text-slate-600'>
								<span className='text-slate-300'>@</span>
								{data?.user.username}
							</p>
						</div>
					</header>
					<section className='flex flex-col gap-4 mt-8'>
						<Password password={data?.user.password} background />
						{data?.user.role.endsWith('admin') ? (
							<>
								<GlobalReportList />
								<SingleLink to='/brugere' icon={Users}>
									Se brugere
								</SingleLink>
							</>
						) : null}
						{data?.user.role === 'super-admin' ? (
							<SingleLink to='/profil/opret-bruger' icon={UserPlus}>
								Opret bruger
							</SingleLink>
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
