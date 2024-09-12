import { useEffect, useRef, useState } from 'react'
import './App.css'


function Sound({ soundSrc = "../public/audios/chiado-tv.mp3", soundName = "Chiado de TV" }) {
	/**
	 * @type {React.MutableRefObject<HTMLAudioElement>}
	 */
	const audio = useRef()
	const buttonRef = useRef()
	const [playing, setPlaying] = useState(false);
	
	function toggleButtonVisual(isPlaying){
		setPlaying(() => isPlaying)
		if(isPlaying) {
			buttonRef.current.style.backgroundPosition = "right"
			buttonRef.current.style.backgroundColor = "red"
		} else {
			buttonRef.current.style.backgroundPosition = "left"
			buttonRef.current.style.backgroundColor = "green"
		}
	}

	function onPlayEnded() {
		toggleButtonVisual(false)
	}

	function togglePlay(e) {
		e.preventDefault()
		switch (e.button) {
			case 0:
				setPlaying(playing => !playing)
				if (playing) {
					// mudar sprite do botão para normal
					audio.current.pause()
					toggleButtonVisual(false)
					return false
				}
				// mudar sprite do botão para tocando (amassado)
				toggleButtonVisual(true)
				audio.current.play()
				break;
			case 1:
				audio.current.pause()
				audio.current.currentTime = 0
				toggleButtonVisual(false)
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
				<Sound soundName='Chiado de TV' soundSrc='./public/audios/Chiado_de_TV-Repórteres.m4a' />
				<Sound soundName='Ato 1 - Cena 1' soundSrc='./public/audios/Ato_1-Cena_1.m4a' />
				<Sound soundName='Notificação do Cancelamento' soundSrc='./public/audios/Notificação_Cancelamento.m4a'/>
				<Sound soundName='Dança do Cancelamento' soundSrc='./public/audios/Dança_do_Cancelamento.m4a'/>
				<Sound soundName='Dança do Humanidades 2' soundSrc='./public/audios/Dança_do_Humanidades_2.m4a'/>
			</div>
			<div className='controls'>
				<h1>Controles</h1>
				<p>Botão esquerdo: Tocar/Pausar audio</p>
				<p>Botão direito: Pausar e reiniciar audio</p>
				<p>Botão do meio: Tocar o audio em paralelo</p>
			</div>
		</>
	)
}

export default App
