import Intro from "./components/Intro"
import Quiz from "./components/Quiz"
import './index.css'
import React from 'react'
import { nanoid } from 'nanoid'
import Loading from "./components/Loading"


export default function App() {

    const [checkAns, setCheckAns] = React.useState(false)
    
    const [useEff, setUseEff] = React.useState(false)

    const [playAgain, setPlayAgain] = React.useState(false)

    const [quizData, setQuizData] = React.useState([])

    const [loading, setLoading] = React.useState(false)


    React.useEffect(() => {
        setLoading(true)
        fetch("https://opentdb.com/api.php?amount=10&category=18")
            .then(res => res.json())
            .then(data => {
                const quizArray = []
                data.results.map(item => { item.incorrect_answers.push(item.correct_answer) })
                data.results.map(item => {
                    quizArray.push({
                        opt: item.incorrect_answers.map(item =>
                        ({
                            value: item,
                            bool: false,
                            id: nanoid()
                        })),
                        ques: item.question,
                        correct_ans: item.correct_answer,
                        isHeld: false,
                        tickHandler: tickHandler,
                        id: nanoid(),
                        match: false

                    })
                })
                quizArray.map(item => {
                    for (let i = item.opt.length - 1; i > 0; i--) {
                        let j = Math.floor(Math.random() * i)
                        let k = item.opt[i]
                        item.opt[i] = item.opt[j]
                        item.opt[j] = k

                    }
                })
                setLoading(false)
                setQuizData(quizArray)


            })

    }, [useEff])


    function tickHandler(value, c, checkAnsBtn) {

        if (checkAnsBtn === false) {
            setCheckAns(true)
            setQuizData(p => p.map(item =>
            (item.isHeld === true && item.id === c ? {
                ...item, opt: item.opt.map(k =>
                    ({ ...k, bool: false }))
            } : item)))

            setQuizData(p => p.map(item =>
            (item.id === c ? {
                ...item, isHeld: true, opt: item.opt.map(k =>
                    (k.value === value ? { ...k, bool: !k.bool } : { ...k }))
            } : { ...item })))
        }
    }

    const quizElement = quizData.map(item => <Quiz {...item} key={item.id} />)

    const [userRes, setUserRes] = React.useState({
        totalQues: 0,
        rightAns: 0
    })

    function matchAns() {
        const arrayLength = quizData.length
        let rAns = 0
        quizData.map(item => {
            item.opt.map(i => {
                if (i.bool && i.value === item.correct_ans) {
                    rAns += 1
                }
            })
        })
        setUserRes(prevUserRes => ({
            ...prevUserRes,
            totalQues: arrayLength,
            rightAns: rAns

        }))

        setPlayAgain(true)
        setQuizData(p => p.map(item => ({ ...item, match: true })))
        setCheckAns(true)

    }
    // console.log(quizData)

    function playAgainf() {
        setUseEff(prevU => !prevU)
        setPlayAgain(false)
        setCheckAns(false)

    }

    const [QuizPage, setOuizPage] = React.useState({
        clicked: false,
        showQuizPage: showQuizPage
    })

    function showQuizPage() {
        setOuizPage(prevData => ({
            ...prevData,
            clicked: true
        })
        )
        document.title = "Quiz | Quizzical"
    }

    return (
        <main>
            {QuizPage.clicked ?
                loading ? <Loading /> :
                    <div>
                        {quizElement} 
                {
                    playAgain ?
                        <div className="stm--btn">
                            <p>You scored {userRes.rightAns}/{userRes.totalQues} correct answers</p>
                            <button className="play--again" onClick={playAgainf}>Play again</button>
                        </div> : checkAns && <button onClick={() => matchAns()} className="check--ans">Check answers</button>
                }
                    </div>
                    :
                    <div>
                        <Intro {...QuizPage} />

                    </div>

            }
        </main>
    )


}

