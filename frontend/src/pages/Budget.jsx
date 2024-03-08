
import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
// import sourceData from "./data/sourceData.json";

const BudgetTracker = () => {
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
    const [totalBalance, setTotalBalance] = useState(localStorage.getItem('totalBalance'));
    const [totalIncome, setTotalIncome] = useState(parseFloat(localStorage.getItem('totalIncome')));
    const [totalExpenses, setTotalExpenses] = useState(parseFloat(localStorage.getItem('totalExpenses')));
    const [incomeDescription, setIncomeDescription] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [incomeList, setIncomeList] = useState(JSON.parse(localStorage.getItem('incomes')));
    const [expenseList, setExpenseList] = useState(JSON.parse(localStorage.getItem('expenses')));
    const [budgetList, setBudgetList] = useState(JSON.parse(localStorage.getItem('budgetList')));
    const [budgetTip, setBudgetTip] = useState('');
    const [balanceColor, setBalanceColor] = useState('rgba(79, 195, 247, 0.8)');

    useEffect(() => {
        const calculateTotalBalance = () => {
            setTotalBalance(totalIncome - totalExpenses);
        };
        calculateTotalBalance();
        localStorage.setItem('incomes', JSON.stringify(incomeList));
        localStorage.setItem('expenses', JSON.stringify(expenseList));
        localStorage.setItem('totalIncome', JSON.stringify(totalIncome));
        localStorage.setItem('totalExpenses', JSON.stringify(totalExpenses));
        localStorage.setItem('budgetList', JSON.stringify(budgetList));
        localStorage.setItem('totalBalance', JSON.stringify(totalBalance));
        if(totalBalance < 0){
            setBalanceColor('rgba(244, 67, 54, 0.8)');
        } else {
            setBalanceColor('rgba(79, 195, 247, 0.8)');
        }
    }, [totalIncome, totalExpenses, incomeList, expenseList, budgetList, totalBalance]);

    const addIncome = () => {
        const income = parseFloat(incomeAmount);
        setTotalIncome(totalIncome + income);
        setTotalBalance(totalBalance + income);
        let incomeId = `${incomeList.length+1}${Math.random(100)}`;
        setIncomeList([...incomeList, { description: incomeDescription, amount: incomeAmount, category: 'Income', id: `${incomeId}` }]);
        let newBalanceTotal = {category: 'Balance', amount: budgetList.find(budget => budget.category === 'Balance').amount + parseFloat(incomeAmount)};
        setBudgetList([newBalanceTotal, ...budgetList.filter(budget => budget.category !== 'Balance')]);
        setIncomeDescription('');
        setIncomeAmount('');
    };

    const addExpense = () => {
        const expense = parseFloat(expenseAmount);
        let newBalanceTotal = {category: 'Balance', amount: budgetList.find(budget => budget.category === 'Balance').amount - expense};
        setTotalExpenses(totalExpenses + expense);
        setTotalBalance(totalBalance - expense);
        let expenseId = `${expenseList.length+1}${Math.random(100)}`;
        setExpenseList([...expenseList, { description: expenseDescription, amount: expenseAmount, category: expenseCategory, id: `${expenseId}` }]);
        let newCategoryTotal = {category: expenseCategory, amount: budgetList.find(budget => budget.category === expenseCategory).amount + expense};
        setBudgetList([newBalanceTotal, ...budgetList.filter(budget => budget.category !== expenseCategory&&budget.category !== 'Balance'), newCategoryTotal]);
        setExpenseDescription('');
        setExpenseAmount('');
        setExpenseCategory('');
    };

    const removeIncome = (id) => {
        let newBalanceTotal = {category: 'Balance', amount: budgetList.find(budget => budget.category === 'Balance').amount - incomeList.find(income => income.id === id).amount};
        setBudgetList([newBalanceTotal, ...budgetList.filter(budget => budget.category !== 'Balance')]);
        setTotalIncome(totalIncome - incomeList.find(income => income.id === id).amount);
        const newIncomeList = incomeList.filter(income => income.id !== id);
        setIncomeList(newIncomeList);
        localStorage.setItem('incomes', JSON.stringify(incomeList));
    };

    const removeExpense = (id) => {
        let newBalanceTotal = {category: 'Balance', amount: parseFloat(budgetList.find(budget => budget.category === 'Balance').amount) + parseFloat(expenseList.find(expense => expense.id === id).amount)};
        let newCategoryTotal = {category: expenseList.find(expense => expense.id === id).category, amount: budgetList.find(budget => budget.category === expenseList.find(expense => expense.id === id).category).amount - expenseList.find(expense => expense.id === id).amount};
        setBudgetList([newBalanceTotal, ...budgetList.filter(budget => budget.category !== expenseList.find(expense => expense.id === id).category && budget.category !== 'Balance'), newCategoryTotal]);
        setTotalExpenses(totalExpenses - expenseList.find(expense => expense.id === id).amount);
        const newExpenseList = expenseList.filter(expense => expense.id !== id);
        setExpenseList(newExpenseList);
        localStorage.setItem('expenses', JSON.stringify(expenseList));
    };

    const handleCategoryChange = (e) => {
        setExpenseCategory(e.target.value);
    };

    const getTip = async () => {
        setBudgetTip('Loading...');
        await fetch('https://capstone1-mlth.onrender.com/getBudgetTip?incomes=' + JSON.stringify(incomeList) + '&expenses=' + JSON.stringify(expenseList), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json()).then(data => {
            setBudgetTip(data.tip);
        });
    }

    return (
        <main className="container">
        <h5 className="center">Summary</h5>
        <section className="row summary-section">
          <div className="col s4">
            <div className="card-panel gradient-green" style={{ marginBottom: '20px' }}>
              <h5 className="center white-text summary-header">Total Income</h5>
              <p className="center white-text summary-text">${totalIncome}</p>
            </div>
          </div>
          <div className="col s4">
            <div className="card-panel gradient-blue" style={{ marginBottom: '20px' }}>
              <h5 className="center white-text summary-header">Total Expenses</h5>
              <p className="center white-text summary-text">${totalExpenses}</p>
            </div>
          </div>
          <div className="col s4">
            <div className="card-panel gradient-teal" style={{ marginBottom: '20px' }}>
              <h5 className="center white-text summary-header">Total Balance</h5>
              <p className="center white-text summary-text">${totalBalance}</p>
            </div>
          </div>
        </section>
   
      
<section className="row forms-container" id="forms-section">
                <form className="col s6 budget-form" id="income-form">
                    <h5 className="center">Add Income</h5>
                    <div className="input-field">
                        <input type="text" id="income-description" placeholder='Income Description' value={incomeDescription} onChange={(e) => setIncomeDescription(e.target.value)} required />
                    </div>
                    <div className="input-field">
                        <input type="number" id="income-amount" placeholder='Amount' value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} required />
                    </div>
                    <button type="button" className="waves-effect waves-light btn" onClick={addIncome}>Add Income</button>
                </form>
                <form className="col s6 budget-form" id="expense-form">
                    <h5 className="center">Add Expense</h5>
                    <div className="input-field">
                        <input type="text" id="expense-description" placeholder='Expense Description' value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} required />
                    </div>
                    <div className="input-field">
                        <input type="number" id="expense-amount" placeholder='Amount' value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} required />
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
                <div className="row forms-container" id="budgetlist">
                    <div className="col s12 m6">
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
                                        <td>${income.amount}</td>
                                        <button type="button" className="waves-effect waves-light btn" onClick={() => {removeIncome(income.id)} }>Delete</button>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col s12 m6">
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
                                        <td>${expense.amount}</td>
                                        <td>{expense.category}</td>
                                        <button type="button" className="waves-effect waves-light btn" onClick={() => {removeExpense(expense.id)} }>Delete</button>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div className="graph-tips-container">  {/* New custom class name */}
            <section className="row">
                <div className="col s12 m6">
                    <div className="center">
                        <h5>Budget Graph</h5>
                        <div className="revenueCard" style={{ margin: '0 auto', width: 'fit-content' }}>
                        <Doughnut
                            data={{
                                labels: budgetList.map((data) => data.category),
                                datasets: [
                                    {
                                        label: "Amount",
                                        data: budgetList.map((data) => data.amount),
                                        backgroundColor: [
                                            balanceColor,
                                            "rgba(0, 128, 255, 0.8)", 
                                            "rgba(173, 216, 230, 0.8)", 
                                            "rgba(77, 144, 232, 0.8)",
                                            "rgba(47, 99, 79, 0.8)", 
                                            "rgba(0, 176, 89, 0.8)", 
                                            "rgba(102, 187, 106, 0.8)", 
                                            "rgba(181, 230, 216, 0.8)",
                                        ],
                                        borderColor: [
                                            balanceColor,
                                            "rgba(0, 128, 255, 0.8)", 
                                            "rgba(173, 216, 230, 0.8)", 
                                            "rgba(77, 144, 232, 0.8)",
                                            "rgba(47, 99, 79, 0.8)", 
                                            "rgba(0, 176, 89, 0.8)", 
                                            "rgba(102, 187, 106, 0.8)", 
                                            "rgba(181, 230, 216, 0.8)",
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
                </div>
                <div className="col s12 m6">
                    <div className="col s12">
                        <div className="center">
                            <h5>Budget Tips</h5>
                            <p id='budgetTipText'>{budgetTip}</p>
                            <button type="button" className="waves-effect waves-light btn" onClick={getTip}>Get Budget Tip</button>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </main>
    );
};

export default BudgetTracker;