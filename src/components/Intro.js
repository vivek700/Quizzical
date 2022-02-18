

export default function Intro(props) {
    
    return(
        <div className='intro'>
            <h1>Quizzical</h1>
            <p>Quiz is  a good thing.😃</p>
            <button onClick = {() => props.showQuizPage()} className="start--btn">Start quiz</button> 
        </div>
    )
}