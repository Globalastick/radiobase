import { createMetadataClient } from '@radiolise/metadata-client'
import { useEffect } from 'react'
import { useAudioPlayerStore } from 'src/stores/audioPlayer.store'
import { useSettingsStore } from 'src/stores/settings.store'

const nowPlaying = createMetadataClient({
	url: 'wss://backend.radiolise.com/api/data-service',
})

export const useTrackTitle = () => {
	const isShowTrackTitle = useSettingsStore((state) => state.isShowTrackTitle)
	const audioPlayerState = useAudioPlayerStore((state) => state.audioPlayerState)
	const currentStation = useAudioPlayerStore((state) => state.currentStation)
	const setTrackTitle = useAudioPlayerStore((state) => state.setTrackTitle)

	useEffect(() => {
		const subscription = nowPlaying.subscribe((info) => {
			setTrackTitle(info.title)
		})
		return () => {
			subscription.unsubscribe()
		}
	}, [])

	useEffect(() => {
		if (!isShowTrackTitle || (isShowTrackTitle && audioPlayerState === 'pause')) {
			// Stop tracking metadata
			nowPlaying.trackStream(undefined)
			setTrackTitle('')
		} else {
			nowPlaying.trackStream(currentStation?.url_resolved)
		}
	}, [audioPlayerState, isShowTrackTitle, currentStation])
}
