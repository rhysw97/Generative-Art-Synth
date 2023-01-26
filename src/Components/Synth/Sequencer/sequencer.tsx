import React, {useContext, useEffect, useState, useRef} from 'react';
import './sequencer.css'
import Step from './step/step';
import * as Tone from 'tone';
import { SequencerSynthsContext } from '../../../App';

interface SequencerProps {
    sequenceLength: number
    notes: string[]
}
export default function Sequencer(props: SequencerProps) {
  
    const sequencerSynths = useContext(SequencerSynthsContext) 
    const [sequence, setSequence] = useState([])
    const currentStep = useRef(0);
    useEffect(() => {
        const grid: any  = []
        props.notes.forEach(note => {
            const row = []
            for(let i = 0; i < props.sequenceLength; i++) {
                row.push({index: i, active: false})
            }
            grid.push(row)
        })
        setSequence(grid)
        currentStep.current = 0;
    },[])

    const changeGain = (event: React.ChangeEvent<HTMLInputElement>) => {
        sequencerSynths.forEach(synth => {
            console.log(synth.get())
            synth.set({volume: parseInt(event.target.value)})
        })
    }
    
    const repeat = (time: any) => {
        let step = currentStep.current % props.sequenceLength
        for(let i = 0; i < sequence.length; i++) {
            let synth = sequencerSynths[i];
            let note = props.notes[i];
            let row: any[] = sequence[i]

            if(row[step].active) {
                synth.triggerAttackRelease(note, '16n', time)
            }
        }
        currentStep.current++;
    }

    return (
        <div className="sequencer">
            <h2>Sequencer</h2>
            <div className="sequencer-controls">
                <div className='sequencer-buttons'>
                    <p id="playButton" onClick={() => {
                        Tone.start();
                        Tone.Transport.start()
                        Tone.Transport.bpm.value = 80;
                        Tone.Transport.scheduleRepeat(repeat, '16n')
                    }}>Play</p>
                    <p id="stopButton" onClick={() => Tone.Transport.stop()}>Stop</p>
                </div>
                <div className="gain">
                    <label>Gain</label>
                    <input  type="range" min="-25" max="30" step="1"  onChange={changeGain}></input>
                </div>
            </div>

            <div className="grid-container">
                {sequence.map((array: any, outerIndex: number) => <div className='grid-row' key={outerIndex}>
                    {array.map((object: any, innerIndex: number) => <Step
                        key={innerIndex}
                        height='50px'
                        width='50px'
                        position={[outerIndex, innerIndex]}
                        active={object.active}
                        onClick={(active: boolean, position: any) => {
                            const tempSequence: any = [...sequence];
                            tempSequence[position[0]][position[1]] = {index: position[1] ,active: active }
                            setSequence(tempSequence)
                        }}
                    />)}
                </div>)}
            </div>
        </div>
    )
}