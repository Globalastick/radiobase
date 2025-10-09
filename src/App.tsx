import 'src/styles'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AudioPlayer } from './components/AudioPlayer'
import { Header } from './components/Header'
import { useKeyboard } from './hooks/useKeyboard'
import { MainPage } from './pages/MainPage'
import { PageNotFound } from './pages/PageNotFound'
import { StationPage } from './pages/StationPage'
import { useSettingsStore } from './stores/settings.store'
import 'src/App.scss'

function App() {
	const theme = useSettingsStore((state) => state.theme)

	useKeyboard()

	useEffect(() => {
		document.documentElement.dataset.theme = theme
	}, [theme])

	return (
		<div className={`app container ${theme}`}>
			<Header />
			<main className="main">
				<Routes>
					<Route
						path={'/'}
						element={<MainPage />}
					/>
					<Route
						path={'/station/:stationuuid'}
						element={<StationPage />}
					/>
					<Route
						path={'*'}
						element={<PageNotFound />}
					/>
				</Routes>
			</main>
			<div className="void-third-block-for-space-between"> </div>

			<AudioPlayer />
		</div>
	)
}

export default App
