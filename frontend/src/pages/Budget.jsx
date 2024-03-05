import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import sourceData from "./data/sourceData.json";

const BudgetTracker = () => {
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [incomeDescription, setIncomeDescription] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [incomeList, setIncomeList] = useState(Array.from({ length: 4 }, () => ({ description: '', amount: '' })));
    const [expenseList, setExpenseList] = useState(Array.from({ length: 4 }, () => ({ description: '', amount: '', category: '' })));

    useEffect(() => {
        const calculateTotalBalance = () => {
            setTotalBalance(totalIncome - totalExpenses);
        };
        calculateTotalBalance();
    }, [totalIncome, totalExpenses]);

    const addIncome = () => {
        const income = parseFloat(incomeAmount);
        setTotalIncome(totalIncome + income);
        setTotalBalance(totalBalance + income);
        setIncomeList([...incomeList, { description: incomeDescription, amount: incomeAmount }]);
        setIncomeDescription('');
        setIncomeAmount('');
    };

    const addExpense = () => {
        const expense = parseFloat(expenseAmount);
        setTotalExpenses(totalExpenses + expense);
        setTotalBalance(totalBalance - expense);
        setExpenseList([...expenseList, { description: expenseDescription, amount: expenseAmount, category: expenseCategory }]);
        setExpenseDescription('');
        setExpenseAmount('');
        setExpenseCategory('');
    };

    const handleCategoryChange = (e) => {
        setExpenseCategory(e.target.value);
    };

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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BudgetTracker;
