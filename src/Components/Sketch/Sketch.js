import { current } from '@reduxjs/toolkit';
import * as Tone from 'tone'
export default function sketch (p) {
    let wave, currentState, messItUp;
    const states = ['triangle', 'osc', 'circles', 'bezier']

    const colour = {
        red: 255,
        green: 255,
        blue: 255
    }

    const buttonColour = {red: 182, green: 11, blue: 182}

    const previousBtn = {
        width: 150,
        height: 50,
        text: 'Previous'
    }

    const nextBtn = {
        width: 150,
        height: 50,
        text: 'Next'
    }

    const discoBtn  = {
        width: 150,
        height: 50,
        isActive: false,
        colour: {red: 182, green: 11, blue: 182},
        text: 'Disco'
    }

    const randomColourBtn = {
        width: 150,
        height: 50,
        text: 'Random Colour'
    }

    const buttons = []



    p.setup = () => {
        p.createCanvas(window.innerWidth - 20, 800) 
        currentState = 0;
        messItUp = true;
        wave = new Tone.Waveform()
        Tone.Destination.connect(wave)
        
        previousBtn['x'] = 5
        previousBtn['y'] =  p.height - previousBtn.height - 5

        buttons.push(previousBtn)

        nextBtn['x'] = 5 + (nextBtn.width * 1.2)
        nextBtn['y'] =  p.height - previousBtn.height - 5

        buttons.push(nextBtn)

        randomColourBtn['x'] = p.width - randomColourBtn.width - 5
        randomColourBtn['y'] = p.height - randomColourBtn.height - 5;

        buttons.push(randomColourBtn)

        discoBtn['x'] = p.width - (discoBtn.width * 2) - 35
        discoBtn['y'] = p.height - discoBtn.height - 5

        buttons.push(discoBtn)


    }

    p.draw = () => {
        p.background(0)
        
        //sound
        p.stroke(colour.red, colour.green, colour.blue)
        p.fill(colour.red, colour.green, colour.blue)
        let buffer = wave.getValue()
        
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
            if(discoBtn.isActive) {
                p.stroke(p.random(255), p.random(255), p.random(255))
                if(messItUp) {
                    p.fill(p.random(255), p.random(255), p.random(255))
                }
            }
            const dataPoints = {}
            //let x1 =  p.map(buffer[i- 1], -1, p.mouseX, 0, p.height)
            
            dataPoints.x1 = p.map(i - 1, start, end, 0, p.width)
            dataPoints.y1 = p.map(buffer[i - 1], -1, 1, 0, p.height)
            dataPoints.x2 = p.map(i, start, end, 0, p.width)
            dataPoints.y2 = p.map(buffer[i], -1, 1, 0, p.height)

            if(messItUp) {
                dataPoints.x1 =  p.map(buffer[i- 1], -1, p.mouseX, 0, p.height)
            }

            console.log(states[currentState])
            switch(states[currentState]) {
                case 'triangle': 
                    if(messItUp) {
                        dataPoints.y1 = p.map(buffer[i- 1], -1, p.mouseX, 0, p.height)
                    }
                    triangle(dataPoints);
                break;
                case 'osc':
                    osc(dataPoints)
                    break;
                case 'circles':
                    console.log('hi')
                    dataPoints.y1 = p.map(buffer[i- 1], -1, p.mouseX, 0, p.height)
                    
                    circlePattern(dataPoints, i)
                    break;
                case 'bezier':
                    bezier(dataPoints, i)
                    break;
            }
        }

      
        p.textSize(16)
    
        buttons.forEach(button => {
            p.stroke(buttonColour.red, buttonColour.green, buttonColour.blue)
            p.fill(buttonColour.red, buttonColour.green, buttonColour.blue)
            p.rect(button['x'], button['y'], button.width, button.height)
            p.fill(255, 255, 255)
            p.text(button.text, button.x + (button.width / 2) , button.y + (button.height / 2))
            p.textAlign(p.CENTER, p.CENTER)
        })
    }

    p.mouseClicked = () => {
        console.log(currentState)
        discoLights()
        randomColour()
        next()
        previous()
    } 

    p.keyTyped = () => {
        if (p.key==='r') {
            messItUp = !messItUp
        }
    }

    const triangle = (dataPoints) => {
        p.line(dataPoints.x1, dataPoints.y1, dataPoints.x2, dataPoints.y2 + p.mouseX)
    }

    const osc = (dataPoints) => {
        p.line(dataPoints.x1, dataPoints.y1, dataPoints.x2, dataPoints.y2)
    }

    const circlePattern = (dataPoints, i) => {
        console.log('good day')
        if(i % 7 === 0) {
            p.circle(dataPoints.y1, dataPoints.x2, 20)
            p.circle(dataPoints.x1, dataPoints.y2, 20)
        }
    }

    const bezier = (dataPoints , i) => {
        if(i % 5 === 0) {
            p.bezier(dataPoints.x2, dataPoints.y2, 50, 200 - dataPoints.y1, p.mouseX + (dataPoints.y1 / i), 840 % i, 23 + dataPoints.x1, 28 )
        }
    }   

    const randomColour = () => {
        if(checkForClick(randomColourBtn)) {
            console.log('random')
            colour.red = p.random(255)
            colour.green = p.random(255)
            colour.blue = p.random(255)
        }
    }

    const checkForClick = button => {
        if(
            p.mouseX > button['x'] && 
            p.mouseX < button['x'] + button.height &&
            p.mouseY > button['y'] &&
            p.mouseY < button['y'] + button.height
        ) {
            return true;
        } 
    } 

    const discoLights = () => {
        {
            if(checkForClick(discoBtn)) {
                discoBtn.isActive = !discoBtn.isActive
            }
            
        }
    }

    const next = () => {
        if(checkForClick(nextBtn)) {
            if(currentState === states.length - 1 ) {
                currentState = 0;
            } else {
                currentState++;
            }
        }
    }

    const previous  = () => {
        if(checkForClick(previousBtn)) {
            if(currentState === 0) {
                currentState = states.length - 1;
            } else {
                currentState--;
            }
        }
    }
    

}


