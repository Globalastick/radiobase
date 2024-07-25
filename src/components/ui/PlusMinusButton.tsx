import './PlusMinusButton.scss'

export interface IPlusMinusButtonProps {
	isMinus: boolean
	onClick: () => void
}

export const PlusMinusButton = ({ isMinus, onClick }: IPlusMinusButtonProps) => {
	return (
		<>
			<button
				className={`plus-minus-button ${isMinus ? 'minus' : 'plus'}`}
				type="button"
				onClick={onClick}>
				<span className="visually-hidden">Show or hide station search options</span>
			</button>
		</>
	)
}
