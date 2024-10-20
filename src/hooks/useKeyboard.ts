import { useCallback, useEffect } from 'react'
import { useAudioPlayerStore } from 'src/stores/audioPlayer.store'
import { useModalStore } from 'src/stores/modal.store'

const textInputSelector = [
	'input[type="text"]',
	'input[type="email"]',
	'input[type="password"]',
	'input[type="search"]',
	'textarea',
	'[contenteditable="true"]',
].join(', ')

const isTextInputInFocus = () => {
	return document.activeElement?.matches(textInputSelector) || false
}

export const useKeyboard = () => {
	const { togglePlayState, volume, setVolume, showVolumePercentageWithTimeout } =
		useAudioPlayerStore((state) => state)
	const { setIsOpen } = useModalStore((state) => state)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (isTextInputInFocus()) return

			switch (event.code) {
				case 'Space':
					togglePlayState()
					break
				case 'Equal':
				case 'NumpadAdd':
					showVolumePercentageWithTimeout()
					setVolume(volume + 5)
					break
				case 'Minus':
				case 'NumpadSubtract':
					showVolumePercentageWithTimeout()
					setVolume(volume - 5)
					break
				case 'Escape':
					setIsOpen(false)
					break
			}
		},
		[togglePlayState, volume],
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])
}
