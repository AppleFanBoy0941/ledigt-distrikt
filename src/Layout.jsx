import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Layout() {
	return (
		<div className='px-2 pt-24'>
			<Navigation />
			<Outlet />
		</div>
	)
}
