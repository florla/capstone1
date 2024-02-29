import React, { useState } from 'react';

const BudgetTracker = () => {
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [incomeDescription, setIncomeDescription] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');

    const addIncome = () => {
        const income = parseFloat(incomeAmount);
        setTotalIncome(totalIncome + income);
        setTotalBalance(totalBalance + income);
        setIncomeDescription('');
        setIncomeAmount(0);
    };

    const addExpense = () => {
        const expense = parseFloat(expenseAmount);
        setTotalExpenses(totalExpenses + expense);
        setTotalBalance(totalBalance - expense);
        setExpenseDescription('');
        setExpenseAmount(0);
    };

    return (
        <main className="container">
            <h1 className="center">Budget Tracker</h1>
            <section className="row summary">
                <div className="col s4">
                    <div className="card-panel teal lighten-2" style={{ marginBottom: '20px' }}>
                        <h2 className="center white-text">Balance</h2>
                        <p className="center white-text">Total Balance:<br /><span id="total-balance" className="white-text">{totalBalance}</span></p>
                    </div>
                </div>
                <div className="col s4">
                    <div className="card-panel teal lighten-2" style={{ marginBottom: '20px' }}>
                        <h2 className="center white-text">Income</h2>
                        <p className="center white-text">Total Income:<br /><span id="total-income" className="white-text">{totalIncome}</span></p>
                    </div>
                </div>
                <div className="col s4">
                    <div className="card-panel teal lighten-2" style={{ marginBottom: '20px' }}>
                        <h2 className="center white-text">Expenses</h2>
                        <p className="center white-text">Total Expenses:<br /><span id="total-expenses" className="white-text">{totalExpenses}</span></p>
                    </div>
                </div>
            </section>
            <section className="row forms-container">
                <form className="col s6" id="income-form">
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
                    <div className="input-field">
                        <input type="text" id="expense-description" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} required />
                        <label htmlFor="expense-description">Expense Description</label>
                    </div>
                    <div className="input-field">
                        <input type="number" id="expense-amount" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} required />
                        <label htmlFor="expense-amount">Amount</label>
                    </div>
                    <button type="button" className="waves-effect waves-light btn" onClick={addExpense}>Add Expense</button>
                </form>
            </section>
        </main>
    );
};

export default BudgetTracker;
