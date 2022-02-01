import React from 'react'

function CUserFinancialInfo({monthlyIncome=0, monthlyExpenses=0,assets=0,liabilities=0, creditScore=0,}) {
        let netWorth = monthlyIncome + monthlyExpenses + creditScore + assets -liabilities;
        let user = JSON.parse(localStorage.getItem('user'));
    return (
        <div class="c-user-finan-info">
                <span>
                {user?.name?.slice(0, 2)?.toUpperCase()}
                </span>

                <div class="info">
                    <ul>
                        <li>Monthly Income: ${monthlyIncome}</li>
                        <li>Monthly Expenses: ${monthlyExpenses}</li>
                        <li>Assets: ${assets}</li>
                        <li>Liabilities: -${liabilities}</li>
                        <li>Credit Score: ${creditScore}</li>
                    </ul>
                    <h4>
                       Net Worth: ${netWorth} 
                    </h4>
                </div>
        </div>  
    )
}

export default CUserFinancialInfo
