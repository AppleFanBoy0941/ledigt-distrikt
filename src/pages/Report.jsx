import InfoCard from '../templates/InfoCard'
import { useEffectOnce } from 'react-use'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { useState } from 'react'
import StatCard from '../templates/StatCard'
import useGetProperties from '../hooks/useGetProperties'
import tailwindColors from '../assets/tailwindColors'

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

	const colors = tailwindColors(getProperties().type)

	return (
		<div className='mt-6 flex flex-col gap-8'>
			<StatCard data={data} loading={loading} type={getProperties().type} />

			<p className={`px-6 font-semibold text-sm ${colors.text[800]}`}>
				Det ser ikke så spændende ud, men bare vent. Der kommer snart mere information om din rapport her.
			</p>
		</div>
	)
}
