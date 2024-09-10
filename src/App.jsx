import { useEffect, useRef, useState } from 'react'
import './App.css'


function Sound({ soundSrc = "/chiado-tv.mp3", soundName = "Chiado de TV" }) {
	/**
	 * @type {React.MutableRefObject<HTMLAudioElement>}
	 */
	const audio = useRef()
	const buttonRef = useRef()
	const [playing, setPlaying] = useState(false);

	function onPlayEnded() {
		buttonRef.current.style.backgroundPosition = "left"
		setPlaying(() => false)
	}

	function togglePlay(e) {
		e.preventDefault()
		switch (e.button) {
			case 0:
				setPlaying(playing => !playing)
				if (playing) {
					// mudar sprite do botão para normal
					buttonRef.current.style.backgroundPosition = "left"
					audio.current.pause()
					return false
				}
				// mudar sprite do botão para tocando (amassado)
				buttonRef.current.style.backgroundPosition = "right"
				audio.current.play()
				break;
			case 1:
				audio.current.pause()
				audio.current.currentTime = 0
				buttonRef.current.style.backgroundPosition = "left"
				setPlaying(() => false)
			break;
			case 2:
				let parallelAudio = new Audio(soundSrc)
				parallelAudio.volume = audio.current.volume
				parallelAudio.oncanplaythrough = () => parallelAudio.play()
				parallelAudio.onpause = () => {
					parallelAudio = null
				}
				parallelAudio.ondurationchange = () => {
					parallelAudio.volume = audio.current.volume
				}
				break;
		}
	}

	return (
		<>
			<div className="box">
				<p>{soundName}</p>
				<button onMouseDown={togglePlay} onKeyDown={(e) => {

				}} onContextMenu={(e) => e.preventDefault()} ref={buttonRef}></button>
				<audio controls ref={audio} onEnded={onPlayEnded}>
					<source src={soundSrc} type="audio/mpeg" />
				</audio>
			</div>
		</>
	)
}


function App() {

	return (
		<>
			<div className="megaBox">
				<Sound />
				<Sound />
				<Sound />
				<Sound />
				<Sound />
				<Sound />
				<Sound />
				<Sound soundName='Mega Sena' soundSrc='/mega-sena.mp3' />
				<div className='box2'>
					<h1>Controles</h1>
					<p>Botão esquerdo: </p>
					<p>Botão direito: </p>
					<p>Botão do meio: </p>
				</div>
			</div>
		</>
	)
}

export default App
