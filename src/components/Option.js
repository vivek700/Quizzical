
export default function Option(props) {

    return (
        <span
            onClick={() => props.hold(props.opt.value, props.id, props.match)}
            className={props.match ?
                props.opt.value === props.correct ?
                    "opt--green" : props.opt.bool ?
                        "opt--red" : "opt--fade" : props.opt.bool ?
                    "opt--ans1" : "opt"}>
            {props.opt.value}
        </span>
    )
}