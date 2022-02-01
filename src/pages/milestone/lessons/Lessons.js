import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import CHeader from '../../../components/CHeader/CHeader';
import { firestore } from '../../../firebase/index';

function Lessons({onFinish,milestone}) {
    const [loading, setLoading] = useState();
    const [lessons, setLessons] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(0);

    const handleNextLesson = () => {
        if ((lessons.length -1) > currentLesson) {

            setCurrentLesson(prev => prev + 1);
            return;

        }

        onFinish();

    }

    useEffect(() => {
        setLoading(true);
        let lessonType = localStorage.getItem('lessonType');
        firestore.collection('lessons').where('path','==',lessonType).where('milestone','==',milestone)
        .get().then(res => {
                setLessons(res.docs.sort((a,b)=>{
                    return parseInt(a.data().order) - parseInt(b.data().order)
                }));
           
           
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })
    }, []);

    return (
        <>
        <div className="lessons-container">
            {loading ?
                <h3> Loading ... </h3>
                :
                <>
                    {lessons !== null && lessons.length > 0 ?
                        <>
                            <div className="content">
                            
                                <img src={lessons[currentLesson].data().image} alt="" />
                                <div>  
                                    <h3>Lesson {currentLesson+1} - {lessons[currentLesson].data().title}</h3>
                                    <p>
                                        {lessons[currentLesson].data().description}

                                    </p>
                                </div>
                            </div>
                            <Button onClick={handleNextLesson}>
                                Next
                    </Button>
                    {currentLesson > 0 && <Button className="m-0 p-3" onClick={()=>setCurrentLesson(prev=>prev-1)} variant="link"> Go Back</Button> }

                        </>
                        :
                        <h3>No Lessons!</h3>
                    }
                </>
            }
        </div>
        </>
    )
}

export default Lessons
