import React, { useEffect, Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Layout from './Layout'
import AuthProvider from './contexts/AuthProvider'
import SiteLoader from './components/loaders/SiteLoader'
import Layout from './Layout'
import UpdateProvider from './contexts/UpdateProvider'
import useLocalStorage from './hooks/useLocalStorage'
import GlobalReports from './pages/GlobalReports'

const SignIn = React.lazy(() => import('./pages/SignIn'))
const Home = React.lazy(() => import('./pages/Home'))
const Report = React.lazy(() => import('./pages/Report'))
const Profile = React.lazy(() => import('./pages/Profile'))
const CreateUser = React.lazy(() => import('./pages/CreateUser'))
const SeeUsers = React.lazy(() => import('./pages/SeeUsers'))

function App() {
	const [authCookie] = useLocalStorage('auth')

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
					path: '/profil/opret-bruger',
					element: <CreateUser />,
				},
				{
					path: '/samlede-rapporter',
					element: <GlobalReports />,
				},
				{
					path: '/brugere',
					element: <SeeUsers />,
				},
				{
					path: '*',
					element: <p>Not found</p>,
				},
			],
		},
	])

	return (
		<UpdateProvider>
			<AuthProvider>
				<Suspense fallback={<SiteLoader showTitle fullPage />}>
					<RouterProvider router={router} />
				</Suspense>
			</AuthProvider>
		</UpdateProvider>
	)
}

export default App
