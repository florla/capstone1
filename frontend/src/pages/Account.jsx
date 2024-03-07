import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import sourceData from "./data/sourceData.json";

// Update default chart colors
defaults.color = "black";

const Account = () => {
    const [fullName, setFullName] = useState('');
    
    const navigate = useNavigate(); 

    if (!localStorage.getItem('totalIncome')|| isNaN(localStorage.getItem('totalIncome'))) {
        localStorage.setItem('totalIncome', JSON.stringify(0));
    }
    if (!localStorage.getItem('totalExpenses')|| isNaN(localStorage.getItem('totalExpenses'))) {
        localStorage.setItem('totalExpenses', JSON.stringify(0));
    }
    if(!localStorage.getItem('totalBalance')|| isNaN(localStorage.getItem('totalBalance'))){
        localStorage.setItem('totalBalance', JSON.stringify(0));
    }
    if (!localStorage.getItem('incomes')) {
        localStorage.setItem('incomes', JSON.stringify([]));
    }
    if (!localStorage.getItem('expenses')) {
        localStorage.setItem('expenses', JSON.stringify([]));
    }
    if(!localStorage.getItem('budgetList')){
        localStorage.setItem('budgetList', JSON.stringify([
            {category: 'Balance', amount: 0},
            {category: 'Food', amount: 0},
            {category: 'Transportation', amount: 0},
            {category: 'Housing', amount: 0},
            {category: 'Utilities', amount: 0},
            {category: 'Entertainment', amount: 0},
            {category: 'Healthcare', amount: 0},
            {category: 'Other', amount: 0},
        ]));
    }
    const totalBalance = localStorage.getItem('totalBalance');
    const totalIncome = localStorage.getItem('totalIncome');
    const totalExpenses = localStorage.getItem('totalExpenses');
    const incomeList = JSON.parse(localStorage.getItem('incomes'));
    const expenseList = JSON.parse(localStorage.getItem('expenses'));
    const budgetList = JSON.parse(localStorage.getItem('budgetList'));
    const [balanceColor, setBalanceColor] = useState('rgba(79, 195, 247, 0.8)');




    useEffect(() => {
        const storedFullName = localStorage.getItem('fullName'); 
        if (storedFullName) setFullName(storedFullName);
        if(totalBalance < 0){
            setBalanceColor('rgba(244, 67, 54, 0.8)');
        } else {
            setBalanceColor('rgba(79, 195, 247, 0.8)');
        }
    }, [totalBalance]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('fullName');
        localStorage.removeItem('superadmin');
        navigate('/login');
    };
    return (

        <div>
            <h4 className="center">Hello, {fullName} </h4>
            <section className="row">
                <h5 className="center">Summary</h5>
                <div className="col s4" style={{ display: 'flex' }}>
                    <div className="card-panel gradient-green" style={{ marginBottom: '20px', flex: 1 }}>

                        <h5 className="center white-text">Total Income</h5>
                        <p className="center white-text">${totalIncome}</p>
                    </div>
                </div>
                <div className="col s4" style={{ display: 'flex' }}>
                    <div className="card-panel gradient-blue" style={{ marginBottom: '20px', flex: 1 }}>
                        <h5 className="center white-text">Total Expenses</h5>
                        <p className="center white-text">${totalExpenses}</p>
                    </div>
                </div>
                <div className="col s4" style={{ display: 'flex' }}>
                    <div className="card-panel gradient-teal" style={{ marginBottom: '20px', flex: 1 }}>
                        <h5 className="center white-text">Total Balance</h5>
                        <p className="center white-text">${totalBalance}</p>
                    </div>
                </div>
            </section>

            <h5 className="center">Stats</h5>
            <div className="App">
                <div className="dataCard customerCard">
                    <Bar
                        data={{
                            labels: budgetList.map((data) => data.category),
                            datasets: [
                                {
                                    label: "Amount",
                                    data: budgetList.map((data) => data.amount),
                                    backgroundColor: [
                                        balanceColor,
                                        "rgba(187, 222, 251, 0.8)",
                                        "rgba(0, 150, 136, 0.8)",
                                        "rgba(77, 182, 172, 0.8)",
                                        "rgba(129, 199, 132, 0.8)",
                                        "rgba(200, 230, 201, 0.8)",
                                        "rgba(129, 199, 132, 0.8)",
                                        "rgba(200, 230, 201, 0.8)",
                                    ],
                                    borderRadius: 5,
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Revenue Source",
                                },

                            },
                        }}
                    />
                </div>


                <div className="dataCard categoryCard">
                    <Doughnut
                        data={{
                            labels: budgetList.map((data) => data.category),
                            datasets: [
                                {
                                    label: "Amount",
                                    data: budgetList.map((data) => data.amount),
                                    backgroundColor: [
                                        balanceColor,
                                        "rgba(187, 222, 251, 0.8)",
                                        "rgba(0, 150, 136, 0.8)",
                                        "rgba(77, 182, 172, 0.8)",
                                        "rgba(129, 199, 132, 0.8)",
                                        "rgba(200, 230, 201, 0.8)",
                                        "rgba(129, 199, 132, 0.8)",
                                        "rgba(200, 230, 201, 0.8)",
                                    ],
                                    borderColor: [
                                        balanceColor,
                                        "rgba(187, 222, 251, 1)",
                                        "rgba(0, 150, 136, 1)",
                                        "rgba(77, 182, 172, 1)",
                                        "rgba(129, 199, 132, 1)",
                                        "rgba(200, 230, 201, 1)",
                                        "rgba(129, 199, 132, 1)",
                                        "rgba(200, 230, 201, 1)",
                                    ],
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Revenue Sources",
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className="center">
                <button onClick={handleLogout}className="btn red">Logout</button>

            </div>
        </div>
    );
};

export default Account;

