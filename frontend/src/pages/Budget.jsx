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
            <h1>Budget Tracker</h1>
            <section className="summary">
                <div className="balance">
                    <h2>Balance</h2>
                    <p>Total Balance: <br /><span id="total-balance">{totalBalance}</span></p>
                </div>
                <div className="income-summary">
                    <h2>Income</h2>
                    <p>Total Income: <br /><span id="total-income">{totalIncome}</span></p>
                </div>
                <div className="expense-summary">
                    <h2>Expenses</h2>
                    <p>Total Expenses: <br /><span id="total-expenses">{totalExpenses}</span></p>
                </div>
            </section>
            <section className="forms-container">
                <form id="income-form">
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
                <form id="expense-form">
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
