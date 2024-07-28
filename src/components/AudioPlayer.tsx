import React, { useEffect, useRef } from 'react'
import { useTrackTitle } from 'src/hooks/useTrackTitle'
import { useAudioPlayerStore } from 'src/stores/audioPlayer.store'
import { useSettingsStore } from 'src/stores/settings.store'
import './AudioPlayer.scss'

export const AudioPlayer = () => {
	const play = useAudioPlayerStore((state) => state.play)
	const isAutoplay = useSettingsStore((state) => state.isAutoplayLastSelectedStaion)
	const volume = useAudioPlayerStore((state) => state.volume)
	const setVolume = useAudioPlayerStore((state) => state.setVolume)

	const handleVolumeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = Number(event.target.value)
		setVolume(newVolume)
	}

	const wheelTimeout = useRef<NodeJS.Timeout>()

	const handleVolumeOnWheel = (event: React.WheelEvent) => {
		const newVolume = volume + (event.deltaY < 0 ? 5 : -5)
		setVolume(newVolume)

		// while wheel is moving, do not release the lock
		clearTimeout(wheelTimeout.current)

		// flag indicating to lock page scrolling (setTimeout returns a number)
		wheelTimeout.current = setTimeout(() => {
			wheelTimeout.current = undefined
		}, 300)
	}

	// block the body from scrolling (or any other element)
	useEffect(() => {
		const cancelWheel = (event: WheelEvent) => wheelTimeout.current && event.preventDefault()
		document.body.addEventListener('wheel', cancelWheel, { passive: false })
		return () => document.body.removeEventListener('wheel', cancelWheel)
	}, [])

	useEffect(() => {
		isAutoplay && play()
	}, [])

	useTrackTitle()

	return (
		<div className="audio-player">
			<div className="audio-player__volume-wrapper">
				<input
					className="audio-player__volume-input"
					type="range"
					step={1}
					min={0}
					max={100}
					value={volume}
					onChange={handleVolumeOnChange}
					onWheel={handleVolumeOnWheel}
				/>
				<div className="audio-player__volume-percentage">{volume}%</div>
			</div>
		</div>
	)
}
