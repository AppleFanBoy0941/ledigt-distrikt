import React, { useEffect, Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import useCookie from 'react-use-cookie'
// import Layout from './Layout'
import AuthProvider from './contexts/AuthProvider'
import SiteLoader from './components/loaders/SiteLoader'
import Layout from './Layout'

const SignIn = React.lazy(() => import('./pages/SignIn'))
const Home = React.lazy(() => import('./pages/Home'))
const Report = React.lazy(() => import('./pages/Report'))
const Profile = React.lazy(() => import('./pages/Profile'))

function App() {
	const [authCookie] = useCookie('auth')

	const router = createBrowserRouter([
		{
			element: !authCookie ? <SignIn /> : <Layout />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/profil',
					element: <Profile />,
				},
				{
					path: '/rapport/:id',
					element: <Report />,
				},
				{
					path: '*',
					element: <p>Not found</p>,
				},
			],
		},
	])

	return (
		<AuthProvider>
			<Suspense fallback={<SiteLoader showTitle fullPage />}>
				<RouterProvider router={router} />
			</Suspense>
		</AuthProvider>
	)
}

export default App
