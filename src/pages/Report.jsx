import InfoCard from '../components/InfoCard'
import { useEffectOnce } from 'react-use'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { useState } from 'react'
import StatCard from '../components/StatCard'
import useGetProperties from '../hooks/useGetProperties'

export default function Report() {
	useEffectOnce(() => {
		window.scrollTo({
			top: 0,
			behavior: 'instant',
		})
	})

	const { data, loading } = useAxios('globalreports')

	const location = useLocation()

	const getProperties = useGetProperties(location.pathname.split('/')[2])

	return (
		<div className='mt-6'>
			<StatCard data={data} loading={loading} type={getProperties().type} />
		</div>
	)
}
