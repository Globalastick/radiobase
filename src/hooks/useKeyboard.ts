import { useCallback, useEffect } from 'react'
import { useAudioPlayerStore } from 'src/stores/audioPlayer.store'
import { useModalStore } from 'src/stores/modal.store'

const isInputInFocus = () => {
	const activeElement = document.activeElement

	if (
		(activeElement instanceof HTMLInputElement && activeElement.type !== 'range') ||
		activeElement instanceof HTMLTextAreaElement ||
		(activeElement instanceof HTMLElement && activeElement.isContentEditable)
	) {
		return true
	} else {
		return false
	}
}

export const useKeyboard = () => {
	const { togglePlayState, volume, setVolume } = useAudioPlayerStore((state) => state)
	const { setIsOpen } = useModalStore((state) => state)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (isInputInFocus()) return

			switch (event.code) {
				case 'Space':
					togglePlayState()
					break
				case 'Equal':
				case 'NumpadAdd':
					setVolume(volume + 5)
					break
				case 'Minus':
				case 'NumpadSubtract':
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
