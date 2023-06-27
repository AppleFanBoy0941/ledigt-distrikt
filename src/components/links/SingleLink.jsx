import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SingleLink({ to, children, icon, showChevron = true }) {
	const Icon = icon

	return (
		<Link
			to={to}
			className='flex items-center justify-between h-14 bg-white border border-slate-50 rounded-3xl shadow-xl shadow-slate-400/10 pl-6 pr-4 font-header font-bold text-slate-800'
		>
			<div className='flex items-center gap-3'>
				{icon ? <Icon className='text-slate-400 -ml-2' /> : null}
				{children}
			</div>
			{showChevron ? <ChevronRight className='text-slate-400' /> : null}
		</Link>
	)
}
