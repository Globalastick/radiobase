import { IStation } from 'src/types/station.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type PlayerStateType = 'idle' | 'playing' | 'pause' | 'loading' | 'error'

interface IAudioPlayerState {
	audio: HTMLAudioElement
	audioPlayerState: PlayerStateType
	volume: number
	trackTitle: string
	currentStation: IStation | null
	attempsToChangeSrc: number
	setVolume: (volume: number) => void
	setTrackTitle: (newTitle: string) => void
	unloadSourceUrl: () => void
	pause: () => void
	play: () => void
	togglePlayState: () => void
	updateCurrentStationState: (newStationInfo: IStation) => void
}

export const useAudioPlayerStore = create<IAudioPlayerState>()(
	persist(
		(set, get) => ({
			audio: new Audio(),
			audioPlayerState: 'pause',
			volume: 42,
			trackTitle: 'Track title',
			currentStation: null,
			attempsToChangeSrc: 0,
			setVolume: (volume) => {
				const protectedVolume = Math.min(Math.max(volume, 0), 100)
				set(() => ({ volume: protectedVolume }))
				get().audio.volume = protectedVolume / 100
			},
			setTrackTitle: (newTitle) => set({ trackTitle: newTitle }),
			unloadSourceUrl: () => {
				get().audio.src = ''
				get().audio.load()
			},
			pause: () => {
				get().unloadSourceUrl()
				set({ audioPlayerState: 'pause' })
			},
			play: () => {
				get().unloadSourceUrl()
				set({ audioPlayerState: 'loading', attempsToChangeSrc: 0 })

				const audio = new Audio(get().currentStation?.url_resolved)
				audio.volume = get().volume / 100
				audio.load()

				audio.onloadeddata = () => {
					audio.play()
					set({ audioPlayerState: 'playing' })
				}
				audio.onerror = () => {
					// Ignores the error caused by passing an empty string to audio.src
					if (audio.src.includes(window.location.hostname)) {
						return
					}
					if (get().attempsToChangeSrc < 1) {
						set((state) => ({ attempsToChangeSrc: state.attempsToChangeSrc + 1 }))
						audio.src = get().currentStation?.url as string
						audio.load()
					} else {
						set({ audioPlayerState: 'error' })
					}
				}
				set({ audio })
			},
			togglePlayState: () => {
				if (['idle', 'pause', 'error'].includes(get().audioPlayerState)) {
					get().play()
				} else {
					get().pause()
				}
			},
			updateCurrentStationState: (newStationInfo) => {
				if (newStationInfo.stationuuid === get().currentStation?.stationuuid) {
					get().togglePlayState()
				} else {
					set({ currentStation: newStationInfo, trackTitle: '' })
					get().play()
				}
			},
		}),
		{
			name: 'audio-player',
			partialize: (state) => ({ volume: state.volume, currentStation: state.currentStation }),
		},
	),
)
