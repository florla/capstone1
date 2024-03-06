import React, { useState, useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import sourceData from "./data/sourceData.json";

// Update default chart colors
defaults.color = "black";

const Account = () => {
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        // Fetch the fullName from local storage
        const storedFullName = localStorage.getItem('userFullName');
        if (storedFullName) {
            setFullName(storedFullName);
        }
    }, []);

    return (
        <div className="App">
            <h2>Welcome, {fullName}</h2> {/* Display the user's fullName */}
            <section className="row">
                {/* Your existing content for cards */}
                <div className="col s4">
                    <div className="card-panel gradient-green" style={{ marginBottom: '20px' }}>
                        <h5 className="center white-text">Total Income</h5>
                        <p className="center white-text">0</p>
                    </div>
                </div>
                <div className="col s4">
                    <div className="card-panel gradient-blue" style={{ marginBottom: '20px' }}>
                        <h5 className="center white-text">Total Expenses</h5>
                        <p className="center white-text">0</p>
                    </div>
                </div>
                <div className="col s4">
                    <div className="card-panel gradient-teal" style={{ marginBottom: '20px' }}>
                        <h5 className="center white-text">Total Balance</h5>
                        <p className="center white-text">0</p>
                    </div>
                </div>
            </section>

            <div className="dataCard customerCard">
                {/* Your existing Bar chart code */}
                <Bar
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
                                borderRadius: 5,
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Revenue Source",
                            },
                        },
                    }}
                />
            </div>

            <div className="dataCard categoryCard">
                {/* Your existing Doughnut chart code */}
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
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Revenue Sources",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Account;

