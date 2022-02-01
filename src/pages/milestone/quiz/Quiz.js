import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import CHeader from '../../../components/CHeader/CHeader'
import CUserFinancialInfo from '../../../components/CUserFinancialInfo/CUserFinancialInfo'
import { firestore } from '../../../firebase';

const incomeContants = {
    MONTHLY_INCOME: 'monthlyIncome',
    MONTHLY_EXPENSES: 'monthlyExpenses',
    ASSETS: 'assets',
    LIABILITIES: 'liabilities',
    CREDIT_SCORE: 'creditScore',
}
const incomeContantsTitles = {
    [incomeContants.MONTHLY_INCOME]: 'Monthly Income',
    [incomeContants.MONTHLY_EXPENSES]: 'Monthly Expenses',
    [incomeContants.ASSETS]: 'Assets',
    [incomeContants.LIABILITIES]: 'Liabilities',
    [incomeContants.CREDIT_SCORE]: 'Credit Score',
}

function Quiz({onFinish,milestone}) {
    const [loading, setLoading] = useState();
    const [questions, setQuestions] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [result, setResult] = useState(null);
    const [incomeParam, setIncomeParam] = useState({
        [incomeContants.MONTHLY_EXPENSES]: 0,
        [incomeContants.ASSETS]: 0,
        [incomeContants.LIABILITIES]: 0,
        [incomeContants.MONTHLY_INCOME]: 0,
        [incomeContants.CREDIT_SCORE]: 0,
    })

    const history = useHistory();

    const handleNextQuestion = () => {

        //empty the results
        setResult(null);

        if ((questions.length - 1) > currentQuestion) {

            setCurrentQuestion(prev => prev + 1);
            return;

        }


     
        let netWorth = Object.values(incomeParam).reduce((total, value, index) => total + value, 0);
        netWorth -= incomeParam[incomeContants.LIABILITIES];
        netWorth -= incomeParam[incomeContants.LIABILITIES];


        onFinish(netWorth);

    }


    const onOptionClick = (answer) => {
        // get question
        let question = questions[currentQuestion].data();

        // check if answer is correct
        if (question.answer === answer) {
            // perform calculation on correct
            let { target, amount, type } = question.correctAnswer;

            setIncomeParam(prev => {
                let prevData = { ...prev };
                prevData[target] = type === 'increment' ? prevData[target] + parseInt(amount) : prevData[target] - parseInt(amount);
                return prevData;
            });
            setResult({ status: true, amount: amount, target: target, type: type });
        }
        else {
            // perform calculation on correct
            let { target, amount, type } = question.incorrectAnswer;
            setIncomeParam(prev => {
                let prevData = { ...prev };
                prevData[target] = type === 'increment' ? prevData[target] + parseInt(amount) : prevData[target] - parseInt(amount);
                return prevData;
            });
            setResult({ status: false, amount: amount, target: target, type: type });
        }
    }

    useEffect(() => {
        setLoading(true);
        firestore.collection('questions').where('milestone','==',milestone).get().then(res => {
            setQuestions(res.docs);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })
    }, []);

    const renderOption = (optionName) => {
        if (questions[currentQuestion]?.data()?.options?.[optionName]) {
            return <Button onClick={() => onOptionClick(optionName)}>
                {questions[currentQuestion]?.data()?.options?.[optionName]}
            </Button>
        }
        return null;

    }

    const renderResult = () => {
        return <div class={`result ${!result.status && 'incorrect'}`}>
            <h5>
                {result.status ? 'CORRECT!' : 'INCORRECT!'}
            </h5>
            <h5 className={`${result.type !== 'increment' && 'incorrect'}`}>
                Your {incomeContantsTitles[result.target]} has {result.type === 'increment' ? 'increased' : 'decreased'} by <strong>${result.amount}</strong>.</h5>
            <Button onClick={handleNextQuestion}>
                Next
            </Button>
        </div>

    }

    return (
        <>
            <div className="quiz-container">
                {loading ?
                    <h3> Loading ... </h3>
                    :
                    <>

                        {questions !== null ?
                            <>
                                <CUserFinancialInfo
                                    monthlyIncome={incomeParam[incomeContants.MONTHLY_INCOME]}
                                    monthlyExpenses={incomeParam[incomeContants.MONTHLY_EXPENSES]}
                                    assets={incomeParam[incomeContants.ASSETS]}
                                    liabilities={incomeParam[incomeContants.LIABILITIES]}
                                    creditScore={incomeParam[incomeContants.CREDIT_SCORE]}

                                />

                                {result ?
                                    <>  {renderResult()}</>
                                    :


                                    <div className="question-container">
                                        <h5>{questions[currentQuestion].data().question}</h5>
                                        <div className="options-container">

                                            {renderOption('a')}
                                            {renderOption('b')}
                                            {renderOption('c')}
                                            {renderOption('d')}

                                        </div>

                                    </div>
                                }

                            </>
                            :
                            <h3>No Data</h3>
                        }
                    </>
                }

            </div>
        </>
    )
}

export default Quiz
