import { createPortal } from 'react-dom'
import './Modal.scss'

interface Props {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
	if (!isOpen) {
		return null
	}

	return createPortal(
		<div className="modal">
			<div
				className="modal__background"
				onClick={onClose}>
				<div className="modal__button-close"></div>
				<div className="modal__inner">{children}</div>
			</div>
		</div>,
		document.body,
	)
}
