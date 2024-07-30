import { useTranslation } from 'react-i18next'
import { Modal } from 'src/components/ui/Modal'
import { useConfirmStore } from 'src/stores/confirmDialog.store'
import { useFavoriteStationsStore } from 'src/stores/favoriteStations.store'
import { useSettingsStore } from 'src/stores/settings.store'
import { LanguageSelect } from './LanguageSelect'
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

	const { t } = useTranslation()

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
					<h2 className="settings__title">{t('settings.settings')}</h2>
					<div className="settings__group">
						<h3 className="settings__label">{t('settings.general')}</h3>
						<CheckBox
							label={t('settings.autoplay-last-selected-station')}
							isChecked={isAutoplayLastLelectedStaion}
							onChange={toggleIsAutoplayLastSelectedStaion}
						/>
						<CheckBox
							label={t('settings.show-track-title')}
							isChecked={isShowTrackTitle}
							onChange={() => {
								toggleIsShowTrackTitle()
							}}
						/>
						<CheckBox
							label={t('settings.dark-theme')}
							isChecked={theme === 'themeDark'}
							onChange={() => {
								toggleTheme()
							}}
						/>
					</div>
					<div className="settings__group">
						<h3 className="settings__label">{t('settings.language')}</h3>
						<LanguageSelect />
					</div>
					<div className="settings__group">
						<h3 className="settings__label">{t('settings.reset')}</h3>
						<div className="settings__reset-buttons-group">
							<Button
								color="danger"
								onClick={() => {
									openConfirmDialog(
										t('settings.reset-favorite-stations'),
										resetFavoriteStations,
									)
								}}>
								{t('settings.reset-favorite-stations')}
							</Button>
							<Button
								color="danger"
								onClick={() => {
									openConfirmDialog(
										t('settings.reset-settings'),
										resetAllSettings,
									)
								}}>
								{t('settings.reset-settings')}
							</Button>
						</div>
					</div>
					<div className="settings__group">
						<h3 className="settings__label">{t('hotkeys.hotkeys')}</h3>
						<div className="hotkey">
							<div className="hotkey__keys-group">
								<kbd className="hotkey__key">+</kbd>/
								<kbd
									className="hotkey__key"
									title={t('hotkeys.mouse-wheel-up-title')}>
									{t('hotkeys.mouse-wheel-up')}
								</kbd>
							</div>
							<span className="hotkey__description">
								{t('hotkeys.mouse-wheel-up-description')}
							</span>
						</div>
						<div className="hotkey">
							<div className="hotkey__keys-group">
								<kbd className="hotkey__key">-</kbd>/
								<kbd
									className="hotkey__key"
									title={t('hotkeys.mouse-wheel-up-title')}>
									{t('hotkeys.mouse-wheel-down')}
								</kbd>
							</div>
							<span className="hotkey__description">
								{t('hotkeys.mouse-wheel-down-description')}%
							</span>
						</div>
						<div className="hotkey">
							<kbd className="hotkey__key">{t('hotkeys.spase')}</kbd>
							<span className="hotkey__description">{t('hotkeys.play-pause')}</span>
						</div>
					</div>
					<div className="settings__group">
						<h3 className="settings__label">{t('drag-and-drop.drag-and-drop')}</h3>
						<div>{t('drag-and-drop.description')}</div>
					</div>
				</div>
			</Modal>
			<ConfirmDialog />
		</>
	)
}
