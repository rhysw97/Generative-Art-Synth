import React from 'react'
import './Modal.css'

interface ModalProps {
    show: boolean
    close: any
}

export default function Modal(props: ModalProps) {

    if (!props.show) {
        return null
    }

    return (
        <div className='modal' onClick={props.close}>
            <div className='modal-content' onClick= {event => event.stopPropagation()}>
                <div className='modal-header'>
                    <h1>Generative Art Synth</h1>
                </div>
                <div className="modal-body">
                    <h2>Instructions</h2>
                    <p>This is a synth that produces generative art based on the waveforms of the Oscillator</p>
                    <p>To get started please press play in either the drone controls or the sequencer controls</p>
                    <p>Please note you will have to click on some of the buttons within the sequencer so that they are active (purple)</p>
                </div>
                <div className="modal-footer">
                    <p className="close-button" onClick={props.close}>Close</p>
                </div>
            </div>
        </div>
    )
}