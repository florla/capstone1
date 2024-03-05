import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import sourceData from "./data/sourceData.json";

const BudgetTracker = () => {
    if (!localStorage.getItem('incomes')) {
        localStorage.setItem('incomes', JSON.stringify([]));
    }
    if (!localStorage.getItem('expenses')) {
        localStorage.setItem('expenses', JSON.stringify([]));
    }
    if (!localStorage.getItem('totalIncome')) {
        localStorage.setItem('totalIncome', JSON.stringify(0));
    }
    if (!localStorage.getItem('totalExpenses')) {
        localStorage.setItem('totalExpenses', JSON.stringify(0));
    }
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(parseFloat(localStorage.getItem('totalIncome')));
    const [totalExpenses, setTotalExpenses] = useState(parseFloat(localStorage.getItem('totalExpenses')));
    const [incomeDescription, setIncomeDescription] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [incomeList, setIncomeList] = useState(JSON.parse(localStorage.getItem('incomes')));
    const [expenseList, setExpenseList] = useState(JSON.parse(localStorage.getItem('expenses')));

    useEffect(() => {
        const calculateTotalBalance = () => {
            setTotalBalance(totalIncome - totalExpenses);
        };
        calculateTotalBalance();
        localStorage.setItem('incomes', JSON.stringify(incomeList));
        console.log(JSON.parse(localStorage.getItem('incomes')))
        localStorage.setItem('expenses', JSON.stringify(expenseList));
        console.log(JSON.parse(localStorage.getItem('expenses')))
        localStorage.setItem('totalIncome', JSON.stringify(totalIncome));
        localStorage.setItem('totalExpenses', JSON.stringify(totalExpenses));
    }, [totalIncome, totalExpenses, incomeList, expenseList]);

    const addIncome = () => {
        const income = parseFloat(incomeAmount);
        setTotalIncome(totalIncome + income);
        setTotalBalance(totalBalance + income);
        setIncomeList([...incomeList, { description: incomeDescription, amount: incomeAmount, id: `${incomeList.length+1}${Math.random(100)}` }]);
        setIncomeDescription('');
        setIncomeAmount('');
    };

    const addExpense = () => {
        const expense = parseFloat(expenseAmount);
        setTotalExpenses(totalExpenses + expense);
        setTotalBalance(totalBalance - expense);
        setExpenseList([...expenseList, { description: expenseDescription, amount: expenseAmount, category: expenseCategory, id: `${expenseList.length+1}${Math.random(100)}` }]);
        setExpenseDescription('');
        setExpenseAmount('');
        setExpenseCategory('');
    };

    const removeIncome = (id) => {
        setTotalIncome(totalIncome - incomeList.find(income => income.id === id).amount);
        const newIncomeList = incomeList.filter(income => income.id !== id);
        setIncomeList(newIncomeList);
        localStorage.setItem('incomes', JSON.stringify(incomeList));
    };

    const removeExpense = (id) => {
        setTotalExpenses(totalExpenses - expenseList.find(expense => expense.id === id).amount);
        const newExpenseList = expenseList.filter(expense => expense.id !== id);
        setExpenseList(newExpenseList);
        localStorage.setItem('expenses', JSON.stringify(expenseList));
    };

    const handleCategoryChange = (e) => {
        setExpenseCategory(e.target.value);
    };

    const getTip = async () => {
        await fetch('http://localhost:5000/getBudgetTip?incomes=' + JSON.stringify(incomeList) + '&expenses=' + JSON.stringify(expenseList))
        .then(response => response.json()).then(data => {
            alert(data.tip);
        });
    }

    return (
        <main className="container">
            <h5 className="center">Summary</h5>
            <section className="row">
                <div className="col s4">
                    <div className="card-panel gradient-green" style={{ marginBottom: '20px' }}>
                        <h5 className="center white-text">Total Income</h5>
                        <p className="center white-text">{totalIncome}</p>
                    </div>
                </div>
                <div className="col s4">
                    <div className="card-panel gradient-blue" style={{ marginBottom: '20px' }}>
                        <h5 className="center white-text">Total Expenses</h5>
                        <p className="center white-text">{totalExpenses}</p>
                    </div>
                </div>
                <div className="col s4">
                    <div className="card-panel gradient-teal" style={{ marginBottom: '20px' }}>
                        <h5 className="center white-text">Total Balance</h5>
                        <p className="center white-text">{totalBalance}</p>
                    </div>
                </div>
            </section>
            <section className="row forms-container">
                <form className="col s6" id="income-form">
                    <h5 className="center">Add Income</h5>
                    <div className="input-field">
                        <input type="text" id="income-description" value={incomeDescription} onChange={(e) => setIncomeDescription(e.target.value)} required />
                        <label htmlFor="income-description">Income Description</label>
                    </div>
                    <div className="input-field">
                        <input type="number" id="income-amount" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} required />
                        <label htmlFor="income-amount">Amount</label>
                    </div>
                    <button type="button" className="waves-effect waves-light btn" onClick={addIncome}>Add Income</button>
                </form>
                <form className="col s6" id="expense-form">
                    <h5 className="center">Add Expense</h5>
                    <div className="input-field">
                        <input type="text" id="expense-description" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} required />
                        <label htmlFor="expense-description">Expense Description</label>
                    </div>
                    <div className="input-field">
                        <input type="number" id="expense-amount" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} required />
                        <label htmlFor="expense-amount">Amount</label>
                    </div>
                    <div className="input-field">
                        <select className="browser-default" value={expenseCategory} onChange={handleCategoryChange}>
                            <option value="" disabled>Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Housing">Housing</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="button" className="waves-effect waves-light btn" onClick={addExpense}>Add Expense</button>
                </form>
            </section>
            <section className="row">
                <div className="col s12 m6">
                    <div className="dataCard categoryCard">
                        <Doughnut
                            data={{
                                labels: sourceData.map((data) => data.label),
                                datasets: [
                                    {
                                        label: "Count",
                                        data: sourceData.map((data) => data.value),
                                        backgroundColor: [
                                            "rgba(79, 195, 247, 0.8)",
                                            "rgba(187, 222, 251, 0.8)",
                                            "rgba(0, 150, 136, 0.8)",
                                            "rgba(77, 182, 172, 0.8)",
                                            "rgba(129, 199, 132, 0.8)",
                                            "rgba(200, 230, 201, 0.8)",
                                            "rgba(129, 199, 132, 0.8)",
                                            "rgba(200, 230, 201, 0.8)",
                                        ],
                                        borderColor: [
                                            "rgba(79, 195, 247, 1)",
                                            "rgba(187, 222, 251, 1)",
                                            "rgba(0, 150, 136, 1)",
                                            "rgba(77, 182, 172, 1)",
                                            "rgba(129, 199, 132, 1)",
                                            "rgba(200, 230, 201, 1)",
                                            "rgba(129, 199, 132, 1)",
                                            "rgba(200, 230, 201, 1)",
                                        ],
                                        borderWidth: 1,
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
                <div className="col s12 m6">
                    <div className="col s12">
                        <h5 className="center">Income List</h5>
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incomeList.map((income, index) => (
                                    <tr key={index}>
                                        <td>{income.description}</td>
                                        <td>{income.amount}</td>
                                        <button type="button" className="waves-effect waves-light btn" onClick={() => {removeIncome(income.id)} }>Delete</button>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col s12">
                        <h5 className="center">Expense List</h5>
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenseList.map((expense, index) => (
                                    <tr key={index}>
                                        <td>{expense.description}</td>
                                        <td>{expense.amount}</td>
                                        <td>{expense.category}</td>
                                        <button type="button" className="waves-effect waves-light btn" onClick={() => {removeExpense(expense.id)} }>Delete</button>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section className="row">
                <button type="button" className="waves-effect waves-light btn" onClick={getTip}>Get Budget Tip</button>
            </section>
        </main>
    );
};

export default BudgetTracker;
