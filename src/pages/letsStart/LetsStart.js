import { Button } from 'react-bootstrap';
import React, { useState } from 'react'
import CHeader from '../../components/CHeader/CHeader';
import CUserFinancialInfo from '../../components/CUserFinancialInfo/CUserFinancialInfo';
import BannerImage from '../../assets/images/ban.jpg';
import { useHistory } from 'react-router';
import { lessonTypes } from '../../utils/constants';


function LetsStart() {
    const [currentStep, setStep] = useState(1);
    const history = useHistory();

    const handleFinish= (lessonType)=>{
        localStorage.setItem('lessonType',lessonType);
        history.push('/milestones');
    }


    switch (currentStep) {

        case 1:
            return <>

                <CHeader />

                <div class="lets-start-container">
                    <CUserFinancialInfo />
                    <p>
                        Here is your scorecard.<br />
                        The objective of the game is to have the highest net worth. In this game, everyone starts with a $0 Net Worth.
                        <br />
                        The decisions you make as you progress through your milestones and lessons will have either a negative or positive impact on your net worth.
                        <br />
                        <br />
                         Don’t worry if you don’t know what a net worth is right now, you will learn shortly!
                    </p>

                    <Button onClick={()=>setStep(prev=>prev+1)}>
                        Next
                     </Button>
                </div>

            </>
        case 2:
            return <>

                <CHeader networth={50000} />

                <div class="lets-start-container">
                   <div class="content">
                   <div >
                        <img src={BannerImage} alt="" />
                        <p>
                        CONGRATULATIONS here is $50,000! Will you pay for college, start a business, buy a Tesla, buy some bitcoins or blow it as fast as it came?
                        <br/>
                        <br/>
                        I know there are a million things you can think of doing with this money, but will you make the right decision that will be good for you now and in the future.

                        </p>
                        </div>
                        <p>
                    High School is finally over.. <br/>The real journey begins....
                    </p>
                   </div>

                   

                    <Button onClick={()=>setStep(prev=>prev+1)}>
                        Next
                     </Button>
                </div>

            </>
        case 3:
            return <>

                <CHeader />

                <div class="lets-start-container">
                   <div class="content">
                   <div >
                        <img src={BannerImage} alt="" />
                        <p>
                        Actually I was just kidding I don’t have $50,000 to give to you. Choose what path you will go down and maybe someday you can just give me $50K! 

                        </p>
                        </div>
                       <div className="buttons-container">
                            <Button onClick={()=>handleFinish(lessonTypes.COLLEGE)}>
                                Go to College
                            </Button>
                            <Button onClick={()=>handleFinish(lessonTypes.START_BUSINESS)}>
                                Start Business
                            </Button>
                            <Button onClick={()=>handleFinish(lessonTypes.GO_TO_WORK)}>
                                Go to Work
                            </Button>
                            <Button onClick={()=>handleFinish(lessonTypes.I_DONT_KNOW)}>
                               I don't know
                            </Button>
                       </div>
                   </div>

                </div>

            </>
        default:
            return null;
    }
}

export default LetsStart
