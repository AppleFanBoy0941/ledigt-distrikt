import { motion } from 'framer-motion'

export default function GlobalReportListItem({ report }) {
	const date = new Date(report.date.replace(/-/g, '/'))

	const weekdays = ['Søn', 'Man', 'Tirs', 'Ons', 'Tors', 'Fre', 'Lør']
	const months = [
		'januar',
		'februar',
		'marts',
		'april',
		'maj',
		'juni',
		'juli',
		'august',
		'september',
		'oktober',
		'november',
		'december',
	]

	return (
		<li className='pt-6 px-6 pb-2'>
			<header>
				<h3 className='font-header text-xl font-bold text-slate-500'>
					{weekdays[date.getDay()]}. d. {date.getDate()}. {months[date.getMonth()]}
				</h3>
			</header>
			<ul>
				<Item type='Timer' count={report.hours} bg />
				<Item type='Publikationer' count={report.publications} />
				<Item type='Videoer' count={report.videos} bg />
				<Item type='Genbesøg' count={report.returnVisits} />
				<Item type='Gode samtaler' count={report.conversations} bg />
			</ul>
		</li>
	)
}

function Item({ type, count, bg }) {
	return (
		<motion.li
			initial={{ opacity: 0, x: -24 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			className={`-mx-4 p-4 py-2 rounded-2xl flex justify-between items-center ${bg && 'bg-slate-50'}`}
		>
			<p className='font-medium text-slate-400'>{type}</p>
			<p className='text-3xl font-header font-black text-slate-700'>{count}</p>
		</motion.li>
	)
}
