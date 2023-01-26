import * as Tone from 'tone'
export default function sketch (p) {
    let wave;
    let ready = false;



    p.setup = () => {
        p.createCanvas(window.innerWidth, 600) 

        wave = new Tone.Waveform()
        Tone.Destination.connect(wave)
        console.log(wave)
        //Tone.Destination.volume.value = -9;
    }

    p.draw = () => {
        p.background(0)
    
        if (ready) {
            //sound
            p.stroke(255)
            let buffer = wave.getValue(0)
            
            //look for point when samples go from - to +
            let start = 0;
            for(let i = 1; i < buffer.length; i++) {
                if(buffer[i - 1] < 0 && buffer[i] >= 0) {
                    start = i;
                    break;
                }
            }
             
    
            let end = start + buffer.length;
            for (let i =start; i < end; i++) {
                //let x1 = p.map(i - 1, start, end, 0, p.width)
                let y1 = p.map(buffer[i - 1], -1, p.mouseX, 0, p.height)
                let x1 = p.map(buffer[i - 1], -1, 1, 0, p.height)
                let x2 = p.map(i, start, end, 0, p.width)
                let y2 = p.map(buffer[i], -1, 1, 0, p.height)
                p.line(x1, y1, x2, y2+ p.mouseX)
            }
        }
    }
    
    p.mousePressed = () => {
        if (!ready) {
            console.log('1')
            ready = true
        }
    }
}