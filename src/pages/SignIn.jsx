import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState, useContext } from 'react'
import InlineLoader from '../components/loaders/InlineLoader'
import useCookie from 'react-use-cookie'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'

export default function SignIn() {
	const [input, setInput] = useState('')
	const [username, setUsername] = useState('')
	const [loading, setLoading] = useState(false)
	const [showPasswordKeyboard, setShowPasswordKeyboard] = useState(false)
	const [error, setError] = useState('')
	// const [_, setAuth] = useCookie('auth')
	const [showIntro, setShowIntro] = useState(false)
	const { setAuth } = useContext(AuthContext)

	const navigate = useNavigate()

	async function onSubmit(e) {
		e.preventDefault()
		setLoading(true)
		setError('')

		if (!username) {
			await submitUsername()

			return
		}

		await submitPassword()
	}

	async function submitUsername() {
		try {
			const response = await axios.post(import.meta.env.VITE_API_AUTH + '/username', { username: input })
			console.log(response)

			setUsername(input)

			if (response.data.activated === false) {
				setInput(response.data.password)
				setShowIntro(true)
				return
			}

			setInput('')
			setShowPasswordKeyboard(true)
		} catch (error) {
			console.log('An error occurred:', error)
			if (error.response?.status === 404) {
				setError('Vi kunne desværre ikke finde en bruger med brugernavnet: ' + input)
				return
			}

			setError('Der skete en fejl, prøv igen om lidt')
		} finally {
			setLoading(false)
		}
	}

	async function submitPassword() {
		console.log(input)
		try {
			const response = await axios.post(import.meta.env.VITE_API_AUTH, { username: username, password: input })
			console.log(response)

			if (response.data.username && response.data.password) {
				setAuth(JSON.stringify(response.data), {
					days: 365,
				})
				navigate(0)
			}
		} catch (error) {
			if (error.response?.status === 404) {
				setError('Vi kunne desværre ikke finde en bruger med brugernavnet: ' + input)
				return
			}

			if (error.response?.status === 403) {
				setError('Forkert kode blev indtastet')
				return
			}

			setError('Der skete en fejl, prøv igen om lidt')
		} finally {
			setInput('')
			setLoading(false)
		}
	}
	return (
		<section className='bg-gradient-to-tr from-sky-500 to-sky-400 h-screen p-2 pt-16 flex flex-col'>
			<article className='px-4'>
				<h1 className='text-4xl font-extrabold text-white font-header'>Velkommen!</h1>
				<div className='font-medium leading-snug text-white flex flex-col gap-2 mt-6'>
					<p>Dette er en app lavet til at holde styr på, hvor langt vi når på ledigt distrikt i Dovre 2023.</p>
					<p>
						For hver dag laver du en rapport i løbet af dagen. Om aftenen vil din rapport automatisk blive gemt. Når rapporten
						er gemt, vil du ikke have mulighed for at redigere den igen, så husk at rapportere til tiden.
					</p>
					<p>Men lad os komme i gang. Først skal du logge ind med dit brugernavn.</p>
				</div>
			</article>
			<form onSubmit={onSubmit} className='mt-8 flex flex-col gap-2'>
				<AnimatePresence>
					{username ? (
						<>
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className='flex justify-between items-center px-4'
							>
								<p className='font-bold text-sky-200 font-header'>{username}</p>
								<button
									type='button'
									onClick={() => {
										setUsername('')
										setInput('')
										setLoading(false)
										setShowPasswordKeyboard(false)
									}}
									className='text-sky-200'
								>
									<X strokeWidth={3} />
								</button>
							</motion.div>
							{showIntro && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									className='flex justify-between items-center px-4 bg-sky-300 rounded-3xl'
								>
									<p className='font-medium text-sky-900 py-4'>
										Tillykke, du er nu klar til at logge ind! For at gøre det hele lidt lettere, har vi valgt en kode for dig.
										Du kan se koden herunder. Klik på "Log ind" for at komme i gang
									</p>
								</motion.div>
							)}
						</>
					) : null}
				</AnimatePresence>
				<AnimatePresence>
					{error ? (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className='flex justify-between items-center px-4 bg-sky-300 rounded-3xl'
						>
							<p className='font-bold text-red-400 py-4'>{error}</p>
						</motion.div>
					) : null}
				</AnimatePresence>
				<input
					type={showPasswordKeyboard ? 'password' : 'text'}
					aria-label='Indtast dit brugernavn'
					value={input}
					onChange={e => setInput(e.target.value)}
					placeholder={username ? 'Skriv dit kodeord' : 'Skriv dit brugernavn'}
					className='bg-sky-100 flex-1 flex w-full p-4 rounded-3xl border-2 border-sky-500/0 transition-colors focus:outline-none focus:border-sky-500 font-semibold placeholder:text-sky-600/50 font-header'
				/>
				<button
					disabled={!input}
					className={`p-4 ${
						input ? 'opacity-100' : 'opacity-25'
					} bg-orange-500 transition-opacity rounded-3xl border-2 border-orange-600 font-bold text-white flex justify-center items-center h-14 font-header`}
				>
					{loading ? <InlineLoader /> : 'Log ind'}
				</button>
			</form>
		</section>
	)
}
