import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import CHeader from '../../components/CHeader/CHeader'
import { useHistory } from 'react-router'
import { firestore } from '../../firebase';

function Leaderboard() {
    const history = useHistory();
    const [loading, setLoading] = useState();
    const [results, setResults] = useState(null);
    let user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {

        setLoading(true);

        firestore.collection('results').orderBy('score','desc').get().then( res => {

            setResults(res.docs);
            setLoading(false);

        }).catch( err => {

            setLoading(false);

        });

    }, []);

    const RenderResultItem = ({item,index}) => {
        console.log(item)
        return <div className="result-item">

            <span>
                {item.name.slice(0, 2).toUpperCase()}   
            </span>

            <h6> Net Worth: ${item.score} </h6>
            <h6>#{index + 1}</h6>

        </div>

    }


    return (
        <>

            <CHeader networth={user.score} />

            <div className="leaderboard-container">

                {loading ?

                    <h3> Loading ... </h3>

                    :

                    <>

                        {results !== null ?

                            <>

                                <h1>Leaderboard</h1>

                                <h5>How do you stack up against the compentation?</h5>

                                <div className="results-container">
                                {   results.map((it,index)=>{
                                   return <RenderResultItem item={it.data()} index={index}  />
                                })

                                }

                                </div>

                                <Button onClick={() => history.push('/finish')}>
                                    Next
                                </Button>

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

export default Leaderboard
