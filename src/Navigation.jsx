import { ChevronLeft } from 'lucide-react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import useAxios from './hooks/useAxios'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthProvider'
import NavigationUnderlay from './components/sub-components/NavigationUnderlay'

export default function Navigation() {
	const { auth } = useContext(AuthContext)
	const { data } = useAxios(`users/${auth !== null ? JSON.parse(auth).id : 0}`)

	const location = useLocation()
	const navigate = useNavigate()

	const reportTitles = {
		timer: 'Timer',
		samtaler: 'Gode samtaler',
		publikationer: 'Publikationer',
		film: 'Film',
		genbesog: 'Genbesøg',
	}

	const routes = [
		{
			path: '/',
			showTitle: true,
			name: 'Dovre 2023',
			showBackButton: false,
			showProfile: true,
		},
		{
			path: '/profil',
			showTitle: false,
			name: null,
			showBackButton: true,
			showProfile: false,
		},
		{
			path: '/rapport',
			showTitle: false,
			name: reportTitles[location.pathname.split('/')[2]],
			showBackButton: true,
			showProfile: false,
		},
		{
			path: '/profil/opret-bruger',
			showTitle: false,
			name: 'Opret bruger',
			showBackButton: true,
			showProfile: false,
		},
		{
			path: '/brugere',
			showTitle: true,
			name: 'Brugere',
			showBackButton: true,
			showProfile: true,
		},
	].reverse()

	function getRouteInfo() {
		return routes.find(route => location.pathname.startsWith(route.path))
	}

	return (
		<NavigationUnderlay>
			<div className='flex items-center pl-4 font-header h-14'>
				<motion.div animate={{ marginLeft: getRouteInfo().showBackButton ? -16 : 0 }} className='flex-1 flex items-end'>
					<motion.button
						initial={{ width: 0, opacity: 1 }}
						animate={{ width: getRouteInfo().showBackButton ? 32 : 0, opacity: 1 }}
						onClick={() => navigate(-1)}
						className='h-9 w-8 flex'
					>
						<ChevronLeft className='h-8 w-8 text-slate-400' />
					</motion.button>

					<div className='flex-1'>
						<AnimatePresence>
							{getRouteInfo().showTitle ? (
								<motion.span
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									className='flex text-xs font-extrabold uppercase tracking-wider text-slate-400 leading-none overflow-y-hidden'
								>
									Ledigt Distrikt
								</motion.span>
							) : null}
						</AnimatePresence>
						<AnimatePresence mode='popLayout'>
							<motion.h1
								key={getRouteInfo().name}
								initial={{ opacity: 0, x: -4 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 4 }}
								className='text-4xl font-black leading-none text-slate-950'
							>
								{getRouteInfo().name}
							</motion.h1>
						</AnimatePresence>
					</div>
				</motion.div>
				<AnimatePresence>
					{getRouteInfo().showProfile ? (
						<motion.div
							initial={{ opacity: 0, y: 16, scale: 0.8 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
						>
							<Link
								to='/profil'
								className='flex rounded-3xl shrink-0 h-14 w-14 bg-white items-center justify-center border border-slate-200 shadow-lg shadow-slate-600/5'
							>
								<span className='font-black tracking-wider text-slate-600'>
									{!data?.user ? (
										<div className='h-5 w-7 bg-slate-100 rounded-md'></div>
									) : (
										<motion.span initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
											{data.user.initials}
										</motion.span>
									)}
								</span>
							</Link>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</NavigationUnderlay>
	)
}
