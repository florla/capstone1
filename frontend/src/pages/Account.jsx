import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

// Update default chart colors
defaults.color = "black";

const Account = () => {
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate(); 

    if (!localStorage.getItem('totalIncome') || isNaN(localStorage.getItem('totalIncome'))) {
        localStorage.setItem('totalIncome', JSON.stringify(0));
    }
    if (!localStorage.getItem('totalExpenses') || isNaN(localStorage.getItem('totalExpenses'))) {
        localStorage.setItem('totalExpenses', JSON.stringify(0));
    }
    if (!localStorage.getItem('totalBalance') || isNaN(localStorage.getItem('totalBalance'))) {
        localStorage.setItem('totalBalance', JSON.stringify(0));
    }
    if (!localStorage.getItem('incomes')) {
        localStorage.setItem('incomes', JSON.stringify([]));
    }
    if (!localStorage.getItem('expenses')) {
        localStorage.setItem('expenses', JSON.stringify([]));
    }
    if (!localStorage.getItem('budgetList')) {
        localStorage.setItem('budgetList', JSON.stringify([
            { category: 'Balance', amount: 0 },
            { category: 'Food', amount: 0 },
            { category: 'Transportation', amount: 0 },
            { category: 'Housing', amount: 0 },
            { category: 'Utilities', amount: 0 },
            { category: 'Entertainment', amount: 0 },
            { category: 'Healthcare', amount: 0 },
            { category: 'Other', amount: 0 },
        ]));
    }

    const totalBalance = localStorage.getItem('totalBalance');
    const balanceColor = totalBalance < 0 ? 'rgba(244, 67, 54, 0.8)' : 'rgba(79, 195, 247, 0.8)';
    const budgetList = JSON.parse(localStorage.getItem('budgetList'));

    useEffect(() => {
        const storedFullName = localStorage.getItem('fullName');
        if (storedFullName) setFullName(storedFullName);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('fullName');
        localStorage.removeItem('superadmin');
        navigate('/login');
    };

    return (
        <div className="center-align">
            <h4>Hello, {fullName}</h4>
            <section className="row balance">
                <div className="col s12" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="card-panel gradient-teal" style={{ marginBottom: '20px', flex: 1 }}>
                        <h5 className="white-text">Total Balance</h5>
                        <p className="white-text">${totalBalance}</p>
                    </div>
                </div>
            </section>

            <h5>Stats</h5>
            <div className="App">
                <div className="revenueCard" style={{ margin: '0 auto', display: 'flex', justifyContent: "center"}}>
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
            </div>
            <div className="logout">
                <button onClick={handleLogout} className="btn red">Logout</button>
            </div>
        </div>
    );
};

export default Account;
