import { useTranslation } from 'react-i18next'
import { useConfirmStore } from 'src/stores/confirmDialog.store'
import { Button } from './Button'
import { Modal } from './Modal'
import './ConfirmDialog.scss'

export const ConfirmDialog = () => {
	const isOpen = useConfirmStore((state) => state.isOpen)
	const title = useConfirmStore((state) => state.title)
	const onConfirm = useConfirmStore((state) => state.onConfirm)
	const onClose = useConfirmStore((state) => state.onClose)

	const { t } = useTranslation()

	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm()
		}
		onClose()
	}

	if (!isOpen) {
		return null
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}>
			<div className="confirm-dialog">
				<h3 className="confirm-dialog__title">{title}</h3>
				<div className="confirm-dialog__text">{t('confirm-dialog.are-you-sure')}</div>
				<div className="confirm-dialog__buttons">
					<Button
						color="danger"
						onClick={handleConfirm}>
						{t('confirm-dialog.confirm')}
					</Button>
					<Button onClick={onClose}>{t('confirm-dialog.cancel')}</Button>
				</div>
			</div>
		</Modal>
	)
}
