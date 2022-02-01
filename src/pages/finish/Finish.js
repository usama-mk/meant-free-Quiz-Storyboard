import React, { useEffect, useState } from 'react'
import CHeader from '../../components/CHeader/CHeader'
import { firestore } from '../../firebase';

function Finish() {

    let user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState();
    const [results, setResults] = useState(null);
    useEffect(() => {

        setLoading(true);

        firestore.collection('results').orderBy('score', 'desc').get().then(res => {

            setResults(res.docs);
            setLoading(false);
            console.log(res.docs)

        }).catch(err => {
            console.log(err)
            setLoading(false);

        });

    }, []);

    const renderResultItem = () => {
        let rank = results?.findIndex(it=>it.id === user.currentResult);
        return <div className="result-item">

            <span>
                {user.name.slice(0, 2).toUpperCase()}
            </span>

            <h6>Net Worth: ${user.score}</h6>

            <h6>#{rank + 1 }</h6>

        </div>
    }


    return (
        <>

            <CHeader showNetWorth={false} />

            <div className="finish-container">

                {loading ?

                    <h3> Loading ... </h3>

                    :

                    <>

                        <h1>Great Job!</h1>

                        {renderResultItem()}

                        <p><b>Share with your progress with your friends! </b></p>

                        <div className="social-icons">
                            <a href="">
                                <img src={require('../../assets/images/facebook.png').default} alt="" />
                            </a>
                            <a href="">
                                <img src={require('../../assets/images/insta.png').default} alt="" />
                            </a>
                            <a href="">
                                <img src={require('../../assets/images/twitter.png').default} alt="" />
                            </a>
                        </div>
                    </>
                }
            </div>

        </>
    )
}

export default Finish;
