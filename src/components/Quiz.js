
import Option from "./Option"

export default function Quiz(props) {
    
    const optElmt = props.opt.map((item) => <Option
        opt={item}
        match={props.match}
        correct={props.correct_ans}
        hold={props.tickHandler}
        isHeld={props.isHeld}
        key={item.id} id={props.id} 
        />)

    return (

        <div className="quiz--main">
            <h2 className="ques">{props.ques}</h2>
            <div>
                {optElmt}
            </div>
        </div>


    )
}