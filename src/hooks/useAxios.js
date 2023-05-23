import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthProvider'

export default function useAxios(endpoint, noToken, fullUrl = false, noGet = false) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const { auth } = useContext(AuthContext)

	const [username, setUsername] = useState(auth ? JSON.parse(auth).username : null)
	const [password, setPassword] = useState(auth ? JSON.parse(auth).password : null)

	// const { password } = JSON.parse(auth)

	function handleError(error) {
		console.log(error)
		setError({ status: error.response.status, error: error.response })
	}

	useEffect(() => {
		if (noGet) return setLoading(false)
		if (!username && !noToken) {
			setLoading(false)
			return
		}
		if (!endpoint) {
			setLoading(false)
			return
		}

		;(async function () {
			try {
				const response = await axios.get(fullUrl ? endpoint : `${import.meta.env.VITE_API_BASE}/${endpoint}`, {
					auth: {
						username,
						password,
					},
				})
				setData(response.data)
			} catch (err) {
				handleError(err)
			} finally {
				setLoading(false)
			}
		})()
	}, [endpoint, noToken, setData])

	async function getData(additionalEndpoint = '') {
		if (!username && !noToken) {
			setLoading(false)
			return
		}
		if (!endpoint) {
			setLoading(false)
			return
		}

		setLoading(true)

		try {
			const response = await axios.get(
				fullUrl ? endpoint + additionalEndpoint : `${import.meta.env.VITE_API_BASE}/${endpoint}/${additionalEndpoint}`,
				{
					auth: {
						username,
						password,
					},
				}
			)
			setData(response.data)
		} catch (err) {
			handleError(err)
		} finally {
			setLoading(false)
		}

		return data
	}

	async function postData(data, additionalEndpoint = '') {
		if (!username && !noToken) {
			setLoading(false)
			return
		}
		if (!endpoint) {
			setLoading(false)
			return
		}

		setLoading(true)

		let response

		try {
			response = await axios.post(
				fullUrl ? endpoint + additionalEndpoint : `${import.meta.env.VITE_API_BASE}/${endpoint}/${additionalEndpoint}`,
				data,
				{
					auth: {
						username,
						password,
					},
				}
			)

			if (noGet) {
				setData(response.data)
				setLoading(true)
				return response.data
			}
			const newData = await getData()

			setData(newData)
		} catch (err) {
			handleError(err)
			setLoading(false)
		}

		return response
	}

	async function patchData(data, additionalEndpoint = '') {
		setLoading(true)
		if (!username && !noToken) {
			setLoading(false)
			return
		}
		if (!endpoint) {
			setLoading(false)
			return
		}

		try {
			const response = await axios.patch(
				fullUrl ? endpoint + additionalEndpoint : `${import.meta.env.VITE_API_BASE}/${endpoint}/${additionalEndpoint}`,
				data,
				{
					auth: {
						username,
						password,
					},
				}
			)
			setData(response.data)
		} catch (err) {
			handleError(err)
		} finally {
			setLoading(false)
		}

		return data
	}

	async function deleteData(additionalEndpoint = '') {
		if (!username || !endpoint) {
			setLoading(false)
			return
		}

		setLoading(true)

		try {
			await axios.delete(
				fullUrl ? endpoint + additionalEndpoint : `${import.meta.env.VITE_API_BASE}/${endpoint}/${additionalEndpoint}`,
				{
					auth: {
						username,
						password,
					},
				}
			)

			const newData = await getData()

			setData(newData)
		} catch (err) {
			handleError(err)
		}

		return data
	}

	return { data, loading, error, getData, postData, patchData, deleteData }
}
