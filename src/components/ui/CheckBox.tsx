import './CheckBox.scss'

interface Props {
	label: string
	isChecked: boolean
	onChange: () => void
}

export const CheckBox = ({ label, isChecked, onChange }: Props) => {
	return (
		<>
			<label className="checkbox">
				<input
					className="checkbox__input visually-hidden"
					type="checkbox"
					checked={isChecked}
					onChange={onChange}
				/>
				<span className="checkbox__emulator"></span>
				<span className="checkbox__label">{label}</span>
			</label>
		</>
	)
}
