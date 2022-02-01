import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import CHeader from '../../components/CHeader/CHeader';
import { firestore } from '../../firebase';
import Lessons from './lessons/Lessons';
import Quiz from './quiz/Quiz';
const steps = {
    LESSONS: 'Lesson',
    QUIZ: 'Quiz'
}
function Milestone() {
    const [loading, setLoading] = useState();
    const [milestones, setMilestones] = useState(null);
    const [netWorth, setNetWorth] = useState(0);
    const [currentMilestone, setCurrentMilestone] = useState(0);
    const [currentStep, setCurrentStep] = useState(steps.LESSONS);

    const history = useHistory();

    const handleNextMilestone = () => {
        if ((milestones.length -1)  > currentMilestone) {

            setCurrentMilestone(prev => prev + 1);
            return false;

        }

        return true;

    }

    const handleOnFinishQuiz =(nW) => {
        setNetWorth(prev=>prev + nW);
        console.log('step',currentMilestone,)
       
        let isCompleted = handleNextMilestone();
        console.log('isCompleted',isCompleted,)
        if(!isCompleted){
            setCurrentStep(steps.LESSONS);
            return
        }

        setLoading(true);
        let user = JSON.parse(localStorage.getItem('user')) || {};
        firestore.collection('results').add({ ...user, score: netWorth + nW }).then(res => {
            localStorage.setItem('user', JSON.stringify({ ...user, score: netWorth + nW, currentResult: res.id }));
            setLoading(false);
            history.push('/leaderboard');

        }).catch(err => {
            setLoading(false);
        });

    }

    const handleOnFinishLessons =() =>{
        setCurrentStep(steps.QUIZ);
    }

    useEffect(() => {
        setLoading(true);
        let lessonType = localStorage.getItem('lessonType');
        firestore.collection('milestones').where('path', '==', lessonType).get().then(res => {
            setMilestones(res.docs.sort((a, b) => {
                return parseInt(a.data().order) - parseInt(b.data().order)
            }));
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })
    }, []);
console.log(currentMilestone)
    return (
        <>
             <CHeader showNetWorth={currentStep === steps.LESSONS} />

            {loading ?
                <div className="d-flex align-items-center justify-content-center w-100 h-100"> <h3> Loading ... </h3></div>
                :
                <>
                    {milestones !== null && milestones.length > 0 ?

                        <>
                            { currentStep === steps.LESSONS ?
                                <Lessons milestone={milestones[currentMilestone]?.data()?.milestone} onFinish={handleOnFinishLessons} /> :
                                <Quiz milestone={milestones[currentMilestone]?.data()?.milestone} onFinish={handleOnFinishQuiz} />
                            }
                        </>

                        :
                        <div className="d-flex align-items-center justify-content-center w-100 h-100"> <h3>No data!</h3></div>
                    }
                </>
            }
        </>
    )
}

export default Milestone
