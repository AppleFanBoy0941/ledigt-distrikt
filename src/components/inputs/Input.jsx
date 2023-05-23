export default function Input({ value, setValue, icon, indent, ...props }) {
	const Icon = icon

	return (
		<label className='flex items-center gap-2 border border-slate-100 shadow-xl shadow-slate-600/5 h-14 px-4 rounded-3xl bg-white'>
			{icon ? <Icon className='text-slate-400' /> : indent ? <div className='h-6 w-6' /> : null}
			<input
				value={value}
				onChange={e => {
					if (setValue) {
						setValue(e.target.value)
					} else {
						props.onChange(e)
					}
				}}
				{...props}
				className='flex-1 focus:outline-none bg-transparent'
			/>
		</label>
	)
}
