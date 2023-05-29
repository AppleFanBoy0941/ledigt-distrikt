import { AtSign, Check } from 'lucide-react'
import Input from '../components/inputs/Input'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useAxios from '../hooks/useAxios'
import InlineLoader from '../components/loaders/InlineLoader'

export default function CreateUser() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const [initials, setInitials] = useState('--')

	const [customUsername, setCustomUsername] = useState(false)
	const [username, setUsername] = useState('')

	const [isAdmin, setIsAdmin] = useState(false)

	const [message, setMessage] = useState('')
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		setInitials(`${firstName.split('')[0]?.toUpperCase() || '-'}${lastName.split('')[0]?.toUpperCase() || '-'}`)

		if (!firstName) {
			setUsername('')
			return
		}
		if (!customUsername) {
			const lastNameInitial = lastName.split('')[0]?.toUpperCase() || ''

			setUsername(firstName + lastNameInitial)
		}
	}, [firstName, lastName, customUsername])

	function customUpdateUsername(event) {
		setCustomUsername(true)
		setUsername(event.target.value)
	}

	const { loading, postData } = useAxios('users', false, false, true)

	async function onSubmit(event) {
		event.preventDefault()

		setMessage('')
		setIsError(false)

		const newUser = {
			first_name: firstName,
			last_name: lastName,
			username: username,
			initials: initials,
			role: isAdmin ? 'admin' : 'user',
		}

		const response = await postData(newUser)

		console.log(response)

		if (response.success) {
			setFirstName('')
			setLastName('')
		} else {
			setIsError(true)
			setMessage(response.message)
		}
	}

	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-4 mt-4'>
			<div className='h-32 w-32 mx-auto border border-slate-100 rounded-[3.5rem] bg-gradient-to-tr from-slate-50 to-white flex items-center justify-center gap-px text-4xl font-black font-header text-slate-400 shadow-xl shadow-slate-400/10 mb-4'>
				{initials.split('').map((initial, index) => (
					<motion.span
						layout
						key={`${initial}${index}`}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: initial === '-' ? 0.75 : 1, y: 0 }}
					>
						{initial}
					</motion.span>
				))}
			</div>
			<Input value={firstName} setValue={setFirstName} placeholder='Fornavn' indent />
			<Input value={lastName} setValue={setLastName} placeholder='Efternavn' indent />
			<Input
				icon={AtSign}
				value={username}
				onChange={customUpdateUsername}
				onBlur={e => e.target.value === '' && setCustomUsername(false)}
				placeholder='Brugernavn'
			/>
			<label className='flex justify-between items-center pl-6 pr-4 py-2 font-header font-semibold text-slate-400'>
				<p>Administratorbruger</p>
				<input type='checkbox' value={isAdmin} onChange={e => setIsAdmin(!isAdmin)} className='hidden' />
				<div
					className={`h-6 w-6 shadow-md ${
						isAdmin ? 'bg-sky-400 border-sky-500 shadow-sky-200' : 'bg-white border-slate-100 shadow-sky-200/0'
					} transition-all border rounded-lg grid place-items-center`}
				>
					<AnimatePresence>
						{isAdmin && (
							<motion.div
								initial={{
									opacity: 0,
									scale: 0.5,
								}}
								animate={{
									opacity: 1,
									scale: 1,
								}}
								exit={{
									opacity: 0,
									scale: 0.75,
								}}
							>
								<Check strokeWidth={4} className='h-4 w-4 text-white' />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</label>
			<motion.button
				whileTap={{ scale: 0.9 }}
				transition={{ type: 'spring', stiffness: 500, damping: 20 }}
				className='h-14 flex items-center justify-center font-header font-bold bg-sky-400 rounded-3xl text-white shadow-xl shadow-sky-600/30'
			>
				{loading ? <InlineLoader /> : 'Opret bruger'}
			</motion.button>
			<AnimatePresence mode='popLayout'>
				{message && (
					<motion.p
						key={message}
						initial={{ y: -16, opacity: 0 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						className={`px-6 font-semibold ${isError ? 'text-rose-400' : 'text-slate-400'}`}
					>
						{message}
					</motion.p>
				)}
			</AnimatePresence>
		</form>
	)
}
