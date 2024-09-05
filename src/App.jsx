import { useRef, useState } from 'react'
import './App.css'


function Sound({soundSrc = "/chiado-tv.mp3", soundName = "Chiado de TV"}) {
	/**
	 * @type {React.MutableRefObject<HTMLAudioElement>}
	 */
	const audio = useRef()
	const [playing, setPlaying] = useState(false)

	function togglePlay(e) {
		e.preventDefault()
		console.log(e.button)
		switch(e.button) {
			case 0:
				setPlaying(playing => !playing)
				if(playing) {
					// mudar sprite do botão para normal
					audio.current.pause()
					return false
				}
				// mudar sprite do botão para tocando (amassado)
				audio.current.play()
			break;
			case 1:
				
			break;
			case 2:
				let parallelAudio = new Audio(soundSrc)
				parallelAudio.oncanplaythrough = () => parallelAudio.play()
				parallelAudio.onpause = () => {
					parallelAudio = null
				}
			break;
		}
		return false
	}

	return(
		<>
			<div>
				<p>{soundName}</p>
				<button onMouseDown={togglePlay} onContextMenu={(e) => e.preventDefault()}></button>
				<audio controls ref={audio}>
					<source src={soundSrc} type="audio/mpeg"/>
				</audio>
			</div>
		</>
	)
}


function App() {

  return (
    <>
		<Sound/>
    </>
  )
}

export default App
