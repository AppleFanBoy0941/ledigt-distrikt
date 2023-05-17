import { Info } from 'lucide-react'
import ReportCard from '../templates/ReportCard'
import InfoCardList from '../templates/InfoCardList'

export default function Home() {
	return (
		<div className='flex flex-col gap-6 mt-6'>
			<aside className='px-4 flex flex-col gap-1'>
				<Info className='text-slate-300' />
				<p className='text-slate-400 text-sm'>
					Husk at rapportere inden dagen er omme, ellers kommer det ikke med på rapporten.
				</p>
			</aside>
			<ReportCard />
			<InfoCardList />
		</div>
	)
}
