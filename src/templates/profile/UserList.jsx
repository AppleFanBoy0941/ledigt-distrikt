import { ChevronRight, Contact, Loader2, Trash, User } from 'lucide-react'
import useAxios from '../../hooks/useAxios'
import { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Password from '../../components/sub-components/Password'
import SiteLoader from '../../components/loaders/SiteLoader'
import { AuthContext } from '../../contexts/AuthProvider'
import InlineLoader from '../../components/loaders/InlineLoader'

export default function UserList() {
	const [activeUser, setActiveUser] = useState(null)
	const [lastUpdated, setLastUpdated] = useState(new Date().getTime())

	const { data, loading, getData } = useAxios('users')

	useEffect(() => {
		async function update() {
			await getData()
			setActiveUser(null)
		}

		update()
	}, [lastUpdated])

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
					animate={{ opacity: 1, y: 0, height: 'auto' }}
					className='rounded-3xl overflow-hidden flex flex-col gap-1 mb-8'
				>
					<AnimatePresence mode='popLayout'>
						{data?.users.map(user => (
							<motion.li
								key={user._id}
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0, x: 0 }}
								exit={{ opacity: 0, scale: 0.8 }}
							>
								<UserListItem user={user} highlight={activeUser} setHighlight={setActiveUser} update={setLastUpdated} />
							</motion.li>
						))}
					</AnimatePresence>
				</motion.ul>
			)}
		</AnimatePresence>
	)
}

function UserListItem({ user, highlight, setHighlight, update }) {
	const isActive = user && user._id === highlight
	const { auth } = useContext(AuthContext)

	console.log(user)

	const role = JSON.parse(auth).role
	const id = JSON.parse(auth).id

	const { deleteData, loading } = useAxios('users/' + user._id, null, false, true)

	async function deleteUser() {
		await deleteData()

		update(new Date().getTime())
	}

	function showDeleteButton() {
		if (user._id === id) return false
		if (role === 'super-admin') return true

		return false
	}

	return (
		<motion.div
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
						<div className='flex flex-col pt-4 gap-2 pl-2'>
							<div className='flex items-center gap-2'>
								<Contact strokeWidth={2.5} className='text-slate-400' />
								<p className='font-bold font-header text-slate-600 flex items-center gap-px'>{user.username}</p>
							</div>
							<Password password={user.password} />
							{showDeleteButton() && (
								<button
									onClick={deleteUser}
									className='ml-auto bg-rose-400 flex items-center gap-2 p-2 pl-3 pr-3 rounded-full text-sm font-bold text-rose-50 -mr-2'
								>
									Slet bruger
									<AnimatePresence mode='popLayout'>
										{loading ? (
											<motion.div key='loader' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
												<motion.div
													animate={{
														rotate: [0, 360],
														transition: { ease: 'linear', repeat: Infinity, repeatType: 'loop', duration: 2 },
													}}
												>
													<Loader2 className='h-4 w-4' />
												</motion.div>
											</motion.div>
										) : (
											<motion.div key='icon' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
												<Trash className='h-4 w-4' />
											</motion.div>
										)}
									</AnimatePresence>
								</button>
							)}
						</div>
					</motion.section>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
