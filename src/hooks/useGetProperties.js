import { TimerReset, MessageCircle, BookOpen, Film, Users } from 'lucide-react'

export default function useGetProperties(type) {
	const properties = [
		{ type: 'hours', icon: TimerReset, name: 'Timer', url: 'timer' },
		{
			type: 'conversations',
			icon: MessageCircle,
			name: 'Gode samtaler',
			url: 'samtaler',
		},
		{
			type: 'publications',
			icon: BookOpen,
			name: 'Publikationer',
			url: 'publikationer',
		},
		{
			type: 'videos',
			icon: Film,
			name: 'Film',
			url: 'film',
		},
		{
			type: 'returnVisits',
			icon: Users,
			name: 'Genbesøg',
			url: 'genbesog',
		},
	]

	function getProperties() {
		const findType = properties.find(item => item.type === type)

		if (findType) {
			return findType
		}

		return properties.find(item => item.url === type)
	}

	return getProperties
}
