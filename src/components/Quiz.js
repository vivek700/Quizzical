
import Option from "./Option"

export default function Quiz(props) {

    console.log(props)
    
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
            <h2 className="ques">Ques :- {props.ques}</h2>
            <div>
                {optElmt}
            </div>
        </div>


    )
}