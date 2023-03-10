import * as Tone from "tone"
import { SynthContext, SequencerSynthsContext } from '../../../App';
import React, {useContext, useState} from 'react'
import './filter.css'

export default function Filter(props: any) {
    
    const oscFilter = new Tone.Filter().toDestination();
    const [selectedFilterType, setSelectedFilterType] = useState('lowpass')
    //oscFilter.debug = true;
    const synth = useContext(SynthContext).connect(oscFilter)
    const sequencerSynths = useContext(SequencerSynthsContext)
    sequencerSynths.forEach(sequencerSynth => sequencerSynth.connect(oscFilter))
    const setFilterType = (value: string) => {
        switch(value) {
            case "lowpass":  
            case "highpass":
            case "bandpass":
            case "lowshelf":
            case "highshelf":
            case "notch":
            case "allpass":
            case "peaking":
                oscFilter.type = value;
                break;
        }
    }

    const setCutOff = (event: React.ChangeEvent<HTMLInputElement>) => {
       console.log(oscFilter.frequency.value)

        oscFilter.frequency.value = event.target.value 
    }

    const isFilterTypeSelected = (value: string): boolean => selectedFilterType === value;

    const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFilterType(event?.currentTarget.value)
        setFilterType(selectedFilterType)
    }

    const setDetune = (event: React.ChangeEvent<HTMLInputElement>) => {
        oscFilter.set({detune: parseInt(event.target.value)})
        console.log(oscFilter.get())
    }
    
    return(
        <div className="filter">
            <div className="filter-options-container">
                <h2>Select Filter</h2>

                <div className="filter-selection">
                    <label className="filter-option">
                        <input type="radio" id="lowpass" name="filter-type" value="lowpass" checked={isFilterTypeSelected("lowpass")} onChange={handleRadioClick}/>
                        <span>Lowpass</span>
                    </label>
                    <label className="filter-option">
                        <input type="radio" id="highpass" name="filter-type" value="highpass" checked={isFilterTypeSelected("highpass")} onChange={handleRadioClick}/>
                        <span>Highpass</span>
                    </label>
                    <label className="filter-option">
                        <input type="radio" id="lowshelf" name="filter-type" value="lowshelf" checked={isFilterTypeSelected("lowshelf")} onChange={handleRadioClick}/>
                        <span>Lowshelf</span>
                    </label>
                    <label className="filter-option">
                        <input type="radio" id="highshelf" name="filter-type" value="highshelf" checked={isFilterTypeSelected("highshelf")} onChange={handleRadioClick}/>
                        <span>Highshelf</span>
                    </label>
                </div>        
            </div>

            <div className="filter-container">
                <h2>Filter Settings</h2>
                <div className="filter-controls">
                    <div className="cutoff">
                        <input onChange={setCutOff} type="range" className='vertical' min="0" max="25000" step="1" ></input>
                        <label>CutOff</label>
                    </div>
                    <div className="filter-detune">
                        <input onChange={setDetune} type="range" className='vertical' min="-25" max="100" step="1" ></input>
                        <label>Detune</label>
                    </div>
                </div>
            </div>
        </div>
    )
}