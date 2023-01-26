import "./step.css"

interface StepProps {
    height: string
    width: string
    position: any
    onClick: Function
    active: boolean
}
//Some changes I'd make: I'd update Step to remove all of its state and only use the prop for whether its active or not. And you can compute its color based on that prop. So it's completely controlled by the parent 
export default function Step(props: StepProps) {
    
    const colour = props.active ? 'purple' : 'white'
    
    return (
        <div>
            <div className="step" onClick={() => {
                props.onClick(!props.active, props.position)   
            }} style={{
                height: props.height,
                width: props.width,
                backgroundColor: colour,
            }}></div>
        </div>
    )
}