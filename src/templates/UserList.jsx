import { ChevronRight, Trash } from 'lucide-react'
import useAxios from '../hooks/useAxios'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Password from '../components/sub-components/Password'
import SiteLoader from '../components/loaders/SiteLoader'

export default function UserList() {
	const [activeUser, setActiveUser] = useState(null)

	const { data, loading } = useAxios('users')

	return (
		<AnimatePresence mode='popLayout'>
			{loading ? (
				<motion.div
					key='loader'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { delay: 0.2 } }}
					exit={{ opacity: 0 }}
					className='pt-12'
				>
					<SiteLoader />
				</motion.div>
			) : (
				<motion.ul
					key='content'
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					className='rounded-3xl overflow-hidden flex flex-col gap-1 mb-8'
				>
					{data?.users.map(user => (
						<UserListItem key={user._id} user={user} highlight={activeUser} setHighlight={setActiveUser} />
					))}
				</motion.ul>
			)}
		</AnimatePresence>
	)
}

function UserListItem({ user, highlight, setHighlight }) {
	const isActive = user && user._id === highlight

	return (
		<motion.li
			animate={{ opacity: highlight === null ? 1 : isActive ? 1 : 0.25 }}
			className='rounded-lg bg-slate-100  p-2 pr-4 overflow-hidden'
		>
			<header onClick={() => setHighlight(isActive ? null : user._id)} className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<div className='h-12 w-12 rounded-2xl bg-white flex items-center justify-center font-header font-extrabold border border-slate-200 shadow-lg shadow-slate-400/10 text-sky-400 tracking-wider shrink-0'>
						{user.initials}
					</div>
					<div className={`h-2 w-2 rounded-full shrink-0 ${user.activated ? 'bg-emerald-400' : 'bg-rose-500'}`}></div>
					<p className='font-header font-extrabold text-slate-800 leading-tight shrink'>
						{user.first_name} {user.last_name}
					</p>
				</div>
				<div className='flex items-center gap-2'>
					{user.role === 'admin' && (
						<div className='text-xs font-black bg-slate-300 text-white rounded-md p-1 px-2 h-6 w-6 flex items-center justify-center font-header shrink-0'>
							A
						</div>
					)}
					{user.role === 'super-admin' && (
						<div className='text-xs font-black bg-sky-400 text-white rounded-md p-1 px-2 h-6 w-6 flex items-center justify-center font-header shrink-0'>
							S
						</div>
					)}
					<button className='text-slate-400'>
						<ChevronRight strokeWidth={3} className={`transition-transform h-4 w-4 ${isActive ? 'rotate-90' : 'rotate-0'}`} />
					</button>
				</div>
			</header>
			<AnimatePresence>
				{isActive && (
					<motion.section
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
					>
						<div className='flex flex-col pt-4 gap-2'>
							<Password password={user.password} />
							<button className='ml-auto bg-rose-400 flex items-center gap-2 p-2 pl-3 pr-3 rounded-full text-sm font-bold text-rose-50 -mr-2'>
								Slet bruger
								<Trash className='h-4 w-4' />
							</button>
						</div>
					</motion.section>
				)}
			</AnimatePresence>
		</motion.li>
	)
}
