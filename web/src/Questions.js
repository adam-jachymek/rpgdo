import { fetchQuestions } from "./api/requests";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect, useMemo } from "react";

const Questions = () => {
    const { id: categoryId } = useParams()

    const { isLoading, data: questions } = useQuery(['questions', categoryId], () => fetchQuestions(categoryId));

    console.log(questions)

    const [questionIndex, setQuestionIndex] = useState(0)
    const currentQuestion = questions?.[questionIndex];

    console.log(currentQuestion);

    const answers = useMemo(() => {
        if (isLoading) {
            return [];
        }
        return ([currentQuestion?.correct_answer, ...currentQuestion?.incorrect_answers])
    }, [questionIndex, isLoading])

    console.log(answers)

    const isAnswerCorrect = (answer) => answer === currentQuestion?.correct_answer

    if (isLoading) {
        return <CircularProgress />
    }


    return (
        <div>
            <h3>Category: {currentQuestion.category} </h3>
            {currentQuestion.question}
            {answers.map((anserw) => (
                <button onClick={() => { isAnswerCorrect(anserw) }}>{anserw}</button>
            ))}
            <button onClick={() => { setQuestionIndex(questionIndex + 1) }}>NEXT</button>
        </div>
    )
}


export default Questions
