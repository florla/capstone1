import React from 'react';


const Account = () => {
    return (
        <div>
             {/* Placeholder for greeting message */}
             <h5>Hello, User!</h5> {/* Placeholder value */}
            <div className="container">
                <h3>Dashboard</h3>
                {/* Placeholder for the chart */}
                <div className="chart-container">
                    <p>chart here</p>
                </div>
                {/* Placeholder for expense, income, and balance */}
                <div className="row">
                    <div className="col s12 m4">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Expenses</span>
                                <p>Total Expenses: $500</p> {/* Placeholder value */}
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Income</span>
                                <p>Total Income: $1000</p> {/* Placeholder value */}
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Balance</span>
                                <p>Current Balance: $500</p> {/* Placeholder value */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
