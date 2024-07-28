import { Modal } from 'src/components/ui/Modal'
import { useConfirmStore } from 'src/stores/confirmDialog.store'
import { useFavoriteStationsStore } from 'src/stores/favoriteStations.store'
import { useSettingsStore } from 'src/stores/settings.store'
import { Button } from './ui/Button'
import { CheckBox } from './ui/CheckBox'
import { ConfirmDialog } from './ui/ConfirmDialog'
import './Settings.scss'

interface Props {
	isOpen: boolean
	onClose: () => void
}

export const Settings = ({ isOpen, onClose }: Props) => {
	const resetAllSettings = useSettingsStore((state) => state.resetAllSettings)
	const resetFavoriteStations = useFavoriteStationsStore((state) => state.resetFavoriteStations)
	const isAutoplayLastLelectedStaion = useSettingsStore(
		(state) => state.isAutoplayLastSelectedStaion,
	)
	const toggleIsAutoplayLastSelectedStaion = useSettingsStore(
		(state) => state.toggleIsAutoplayLastSelectedStaion,
	)
	const theme = useSettingsStore((state) => state.theme)
	const toggleTheme = useSettingsStore((state) => state.toggleTheme)
	const isShowTrackTitle = useSettingsStore((state) => state.isShowTrackTitle)
	const toggleIsShowTrackTitle = useSettingsStore((state) => state.toggleIsShowTrackTitle)
	const openConfirmDialog = useConfirmStore((state) => state.open)

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}>
				<div
					className="settings"
					onClick={(event) => {
						event.stopPropagation()
					}}>
					<h2 className="settings__title">Settings</h2>
					<div className="settings__group">
						<h3 className="settings__label">General</h3>
						<CheckBox
							label="Autoplay last selected station"
							isChecked={isAutoplayLastLelectedStaion}
							onChange={toggleIsAutoplayLastSelectedStaion}
						/>
						<CheckBox
							label="Show track title (may not work for some stations)"
							isChecked={isShowTrackTitle}
							onChange={() => {
								toggleIsShowTrackTitle()
							}}
						/>
						<CheckBox
							label="Dark theme"
							isChecked={theme === 'themeDark'}
							onChange={() => {
								toggleTheme()
							}}
						/>
					</div>
					<div className="settings__group">
						<div className="settings__reset-buttons-group">
							<Button
								color="danger"
								onClick={() => {
									openConfirmDialog(
										'Reset favorite stations',
										resetFavoriteStations,
									)
								}}>
								Reset favorite stations
							</Button>
							<Button
								color="danger"
								onClick={() => {
									openConfirmDialog('Reset settings', resetAllSettings)
								}}>
								Reset settings
							</Button>
						</div>
					</div>
					<div className="settings__group">
						<h3 className="settings__label">Hotkeys</h3>
						<div className="hotkey">
							<div className="hotkey__keys-group">
								<kbd className="hotkey__key">+</kbd>/
								<kbd
									className="hotkey__key"
									title="When hovering over the volume control">
									Mouse wheel up
								</kbd>
							</div>
							<span className="hotkey__description">Increase volume by 5%</span>
						</div>
						<div className="hotkey">
							<div className="hotkey__keys-group">
								<kbd className="hotkey__key">-</kbd>/
								<kbd
									className="hotkey__key"
									title="When hovering over the volume control">
									Mouse wheel down
								</kbd>
							</div>
							<span className="hotkey__description">Decrease volume by 5%</span>
						</div>
						<div className="hotkey">
							<kbd className="hotkey__key">Space</kbd>
							<span className="hotkey__description">Play/Pause</span>
						</div>
					</div>
					<div className="settings__group">
						<h3 className="settings__label">Drag-and-drop</h3>
						<div>Sort your favorite stations by drag and drop.</div>
					</div>
				</div>
			</Modal>
			<ConfirmDialog />
		</>
	)
}
