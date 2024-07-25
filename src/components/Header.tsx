import { Link } from 'react-router-dom'
import GithubIconSvg from 'src/assets/icons/github.svg?react'
import LogoIconSvg from 'src/assets/icons/logo.svg?react'
import SettingsIconSvg from 'src/assets/icons/settings.svg?react'
import { useModalStore } from 'src/stores/modal.store'
import { useSettingsStore } from 'src/stores/settings.store'
import { Settings } from './Settings'
import './Header.scss'

export const Header = () => {
	const toggleTheme = useSettingsStore((state) => state.toggleTheme)
	const isOpen = useModalStore((state) => state.isOpen)
	const setIsOpen = useModalStore((state) => state.setIsOpen)

	return (
		<header className="header">
			<Link
				className="header__logo"
				to="/">
				<LogoIconSvg />
				<h1>RADIOBASE</h1>
			</Link>
			<nav className="header__menu">
				<ul className="header__menu-list">
					<li
						className="header__menu-item"
						title="Github">
						<Link to={'/github'}>
							<GithubIconSvg />
						</Link>
					</li>
					<li
						className="header__menu-item header__menu-item-settings"
						title="Settings"
						onClick={() => setIsOpen(true)}>
						<SettingsIconSvg width={20} />
					</li>
					<li
						className="header__menu-item"
						title="Change theme">
						<div
							className="theme-changer"
							onClick={() => toggleTheme()}></div>
					</li>
				</ul>
			</nav>

			<Settings
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</header>
	)
}
