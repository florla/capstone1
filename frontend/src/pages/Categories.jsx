import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Categories_Main() {
    const [topic, setTopic] = useState("");
    const [expertise, setExpertise] = useState("");
    const [number, setNumber] = useState("");
    const [style, setStyle] = useState("");
    const [message, setMessage] = useState('');

    // Separate states for dropdown visibility
    const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
    const [isExpertiseDropdownOpen, setIsExpertiseDropdownOpen] = useState(false);
    const [isNumberDropdownOpen, setIsNumberDropdownOpen] = useState(false);
    const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);

    const handleTopicChange = (e) => {
        setTopic(e.target.innerText);
        setIsTopicDropdownOpen(false);
    };
    const handleExpertiseChange = (e) => {
        setExpertise(e.target.innerText);
        setIsExpertiseDropdownOpen(false);
    };
    const handleNumberChange = (e) => {
        setNumber(e.target.innerText);
        setIsNumberDropdownOpen(false);
    };
    const handleStyleChange = (e) => {
        setStyle(e.target.innerText);
        setIsStyleDropdownOpen(false);
    };

    // Separate toggle functions for each dropdown
    const toggleTopicDropdown = () => {
        setIsTopicDropdownOpen(!isTopicDropdownOpen);
        // Close other dropdowns
        setIsExpertiseDropdownOpen(false);
        setIsNumberDropdownOpen(false);
        setIsStyleDropdownOpen(false);
    };
    const toggleExpertiseDropdown = () => {
        setIsExpertiseDropdownOpen(!isExpertiseDropdownOpen);
        setIsTopicDropdownOpen(false);
        setIsNumberDropdownOpen(false);
        setIsStyleDropdownOpen(false);
    };
    const toggleNumberDropdown = () => {
        setIsNumberDropdownOpen(!isNumberDropdownOpen);
        setIsTopicDropdownOpen(false);
        setIsExpertiseDropdownOpen(false);
        setIsStyleDropdownOpen(false);
    };
    const toggleStyleDropdown = () => {
        setIsStyleDropdownOpen(!isStyleDropdownOpen);
        setIsTopicDropdownOpen(false);
        setIsExpertiseDropdownOpen(false);
        setIsNumberDropdownOpen(false);
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const details = {
            topic: topic,
            expertise: expertise,
            numQuestions: number,
            style: style,
        };
        try {
            if (topic === "" || expertise === "" || number === "" || style === "") {
                setMessage('Please fill in all the fields.');
                return;
            } else {
                setMessage('Submitting...');
                let res = await axios.get('http://localhost:5000/questions', {
                    params: details,
                });
                let result = await res.data;
                navigate('/quiz', { state: { results: result } });
            }

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <div class="page2">
                <div className="container">
                    <link
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"
                    />
                    <div className="section">
                        <div className="row">
                            <div className="col">
                                <h3>Quiz Generation Options</h3>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col mb-4">
                                Please choose your preferences below to generate your personalized
                                quiz
                            </div>
                            <br />
                            {message && <div className="col mb-4" style={{ color: message.includes('Please') ? 'red' : '#2196F3' }}>{message}</div>}
                        </div>

                        <br />
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="input-field col s12">
                                <div className="select-wrapper">
                                    <input
                                        className="select-dropdown dropdown-trigger"
                                        type="text"
                                        data-target="select-options-91d287a4-382f-2363-e295-63f8907bb9ec"
                                        value={topic}
                                        id="topic"
                                        onClick={toggleTopicDropdown}
                                    />
                                    <ul
                                        id="select-options-91d287a4-382f-2363-e295-63f8907bb9ec"
                                        className="dropdown-content select-dropdown"
                                        tabIndex={0}
                                        style={{
                                            display: isTopicDropdownOpen ? "block" : "none",
                                            width: "444.297px",
                                            left: 0,
                                            top: 0,
                                            height: 400,
                                            transformOrigin: "0px 0px",
                                            opacity: 1,
                                            transform: "scaleX(1) scaleY(1)",
                                        }}
                                    >
                                        <li
                                            className="disabled selected"
                                            id="select-options-91d287a4-382f-2363-e295-63f8907bb9ec0"
                                            tabIndex={0}
                                            onClick={handleTopicChange}
                                        >
                                            <span>{topic}</span>
                                        </li>
                                        <li
                                            id="select-options-91d287a4-382f-2363-e295-63f8907bb9ec1"
                                            tabIndex={0}
                                            onClick={handleTopicChange}
                                        >
                                            <span>golang</span>
                                        </li>
                                        <li
                                            id="select-options-91d287a4-382f-2363-e295-63f8907bb9ec2"
                                            tabIndex={0}
                                            onClick={handleTopicChange}
                                        >
                                            <span>aws</span>
                                        </li>
                                        <li
                                            id="select-options-91d287a4-382f-2363-e295-63f8907bb9ec3"
                                            tabIndex={0}
                                            onClick={handleTopicChange}
                                        >
                                            <span>javascript</span>
                                        </li>
                                        <li
                                            id="select-options-91d287a4-382f-2363-e295-63f8907bb9ec4"
                                            tabIndex={0}
                                            onClick={handleTopicChange}
                                        >
                                            <span>CI/CD</span>
                                        </li>
                                        <li
                                            id="select-options-91d287a4-382f-2363-e295-63f8907bb9ec5"
                                            tabIndex={0}
                                            onClick={handleTopicChange}
                                        >
                                            <span>home gardens</span>
                                        </li>
                                        <li
                                            id="select-options-91d287a4-382f-2363-e295-63f8907bb9ec6"
                                            tabIndex={0}
                                            onClick={handleTopicChange}
                                        >
                                            <span>coffee</span>
                                        </li>
                                        <li
                                            id="select-options-91d287a4-382f-2363-e295-63f8907bb9ec7"
                                            tabIndex={0}
                                            onClick={handleTopicChange}
                                        >
                                            <span>finger foods</span>
                                        </li>
                                    </ul>
                                    <svg
                                        className="caret"
                                        height={24}
                                        viewBox="0 0 24 24"
                                        width={24}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M7 10l5 5 5-5z" />
                                        <path d="M0 0h24v24H0z" fill="none" />
                                    </svg>
                                    <select id="topic" tabIndex={-1}>
                                        <option value={topic} disabled="" selected="" />
                                        <option value="golang">golang</option>
                                        <option value="aws">aws</option>
                                        <option value="javascript">javascript</option>
                                        <option value="ci/cd">CI/CD</option>
                                        <option value="growing you own garden">home gardens</option>
                                        <option value="coffee">coffee</option>
                                        <option value="finger food">finger foods</option>
                                    </select>
                                </div>
                                <label>Topic</label>
                            </div>

                            <div className="input-field col s12">
                                <div className="select-wrapper">
                                    <input
                                        className="select-dropdown dropdown-trigger"
                                        type="text"
                                        id="expertise"
                                        data-target="select-options-91d287a4-382f-2363-e295-63f8907bb9ec"
                                        value={expertise}
                                        onClick={toggleExpertiseDropdown}
                                    />
                                    <ul
                                        id="select-options-e750b8e0-a890-599e-3a83-d29f46ffb565"
                                        className={`dropdown-content select-dropdown ${isExpertiseDropdownOpen ? "active" : ""
                                            }`}
                                        tabIndex="0"
                                        style={{
                                            display: isExpertiseDropdownOpen ? "block" : "none",
                                            width: "444.297px",
                                            left: 0,
                                            top: 0,
                                            height: 200,
                                            transformOrigin: "0px 0px",
                                            opacity: 1,
                                            transform: "scaleX(1) scaleY(1)",
                                        }}
                                    >
                                        <li
                                            className="disabled selected"
                                            id="select-options-e750b8e0-a890-599e-3a83-d29f46ffb5650"
                                            tabIndex="0"
                                            onClick={handleExpertiseChange}
                                        >
                                            <span>{expertise}</span>
                                        </li>
                                        <li
                                            id="select-options-e750b8e0-a890-599e-3a83-d29f46ffb5651"
                                            tabIndex="0"
                                            onClick={handleExpertiseChange}
                                        >
                                            <span>novice</span>
                                        </li>
                                        <li
                                            id="select-options-e750b8e0-a890-599e-3a83-d29f46ffb5652"
                                            tabIndex="0"
                                            onClick={handleExpertiseChange}
                                        >
                                            <span>intermediate</span>
                                        </li>
                                        <li
                                            id="select-options-e750b8e0-a890-599e-3a83-d29f46ffb5653"
                                            tabIndex="0"
                                            onClick={handleExpertiseChange}
                                        >
                                            <span>expert</span>
                                        </li>
                                    </ul>
                                    <svg
                                        className="caret"
                                        height={24}
                                        viewBox="0 0 24 24"
                                        width={24}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M7 10l5 5 5-5z" />
                                        <path d="M0 0h24v24H0z" fill="none" />
                                    </svg>
                                    <path d="M7 10l5 5 5-5z" />
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <select id="expertise" tabIndex={-1}>
                                        <option value={expertise} disabled="" selected=""></option>
                                        <option value="novice">novice</option>
                                        <option value="intermediate">intermediate</option>
                                        <option value="expert">expert</option>
                                    </select>
                                </div>
                                <label>Expertise</label>
                            </div>

                            <div className="input-field col s12">
                                <div className="select-wrapper">
                                    <input
                                        className="select-dropdown dropdown-trigger"
                                        type="text"
                                        id="numquestions"
                                        data-target="select-options-9ce5f51b-888e-8cc2-e1a6-6ba3a95d714d"
                                        value={number}
                                        onClick={toggleNumberDropdown}
                                    />
                                    <ul
                                        id="select-options-9ce5f51b-888e-8cc2-e1a6-6ba3a95d714d"
                                        className={`dropdown-content select-dropdown ${isNumberDropdownOpen ? "active" : ""
                                            }`}
                                        tabIndex="0"
                                        style={{
                                            display: isNumberDropdownOpen ? "block" : "none",
                                            width: "444.297px",
                                            left: 0,
                                            top: 0,
                                            height: 200,
                                            transformOrigin: "0px 0px",
                                            opacity: 1,
                                            transform: "scaleX(1) scaleY(1)",
                                        }}
                                    >
                                        <li
                                            className="disabled"
                                            id="select-options-9ce5f51b-888e-8cc2-e1a6-6ba3a95d714d0"
                                            tabIndex={0}
                                            onClick={handleNumberChange}
                                        >
                                            <span>{number}</span>
                                        </li>
                                        <li
                                            id="select-options-9ce5f51b-888e-8cc2-e1a6-6ba3a95d714d1"
                                            tabIndex={0}
                                            className="selected"
                                            onClick={handleNumberChange}
                                        >
                                            <span>5</span>
                                        </li>
                                        <li
                                            id="select-options-9ce5f51b-888e-8cc2-e1a6-6ba3a95d714d2"
                                            tabIndex={0}
                                            onClick={handleNumberChange}
                                        >
                                            <span>10</span>
                                        </li>
                                        <li
                                            id="select-options-9ce5f51b-888e-8cc2-e1a6-6ba3a95d714d3"
                                            tabIndex={0}
                                            onClick={handleNumberChange}
                                        >
                                            <span>15</span>
                                        </li>
                                    </ul>
                                    <svg
                                        className="caret"
                                        height={24}
                                        viewBox="0 0 24 24"
                                        width={24}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M7 10l5 5 5-5z" />
                                        <path d="M0 0h24v24H0z" fill="none" />
                                    </svg>
                                    <select id="numquestions" tabIndex={-1}>
                                        <option value={number} disabled="" />
                                        <option value={5} selected="">
                                            5
                                        </option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                    </select>
                                </div>
                                <label>Number of questions</label>
                            </div>

                            <div className="input-field col s12">
                                <div className="select-wrapper">
                                    <input
                                        className="select-dropdown dropdown-trigger"
                                        type="text"
                                        id="questionstyle"
                                        data-target="select-options-72005b65-09d1-16b3-aca8-3e496995585a"
                                        value={style}
                                        onClick={toggleStyleDropdown}
                                    />
                                    <ul
                                        id="select-options-72005b65-09d1-16b3-aca8-3e496995585a"
                                        className={`dropdown-content select-dropdown ${isStyleDropdownOpen ? "active" : ""
                                            }`}
                                        tabIndex="0"
                                        style={{
                                            display: isStyleDropdownOpen ? "block" : "none",
                                            width: "444.297px",
                                            left: 0,
                                            top: 0,
                                            height: 400,
                                            transformOrigin: "0px 0px",
                                            opacity: 1,
                                            transform: "scaleX(1) scaleY(1)",
                                        }}
                                    >
                                        <li
                                            className="disabled"
                                            id="select-options-72005b65-09d1-16b3-aca8-3e496995585a0"
                                            tabIndex={0}
                                            onClick={handleStyleChange}
                                        >
                                            <span>{style}</span>
                                        </li>
                                        <li
                                            id="select-options-72005b65-09d1-16b3-aca8-3e496995585a1"
                                            tabIndex={0}
                                            onClick={handleStyleChange}
                                        >
                                            <span>master oogway</span>
                                        </li>
                                        <li
                                            id="select-options-72005b65-09d1-16b3-aca8-3e496995585a2"
                                            tabIndex={0}
                                            onClick={handleStyleChange}
                                        >
                                            <span>1940's gangster</span>
                                        </li>
                                        <li
                                            id="select-options-72005b65-09d1-16b3-aca8-3e496995585a3"
                                            tabIndex={0}
                                            onClick={handleStyleChange}
                                        >
                                            <span>like I'm an 8 year old</span>
                                        </li>
                                        <li
                                            id="select-options-72005b65-09d1-16b3-aca8-3e496995585a4"
                                            tabIndex={0}
                                            className="selected"
                                            onClick={handleStyleChange}
                                        >
                                            <span>normal</span>
                                        </li>
                                        <li
                                            id="select-options-72005b65-09d1-16b3-aca8-3e496995585a5"
                                            tabIndex={0}
                                            onClick={handleStyleChange}
                                        >
                                            <span>jedi</span>
                                        </li>
                                        <li
                                            id="select-options-72005b65-09d1-16b3-aca8-3e496995585a6"
                                            tabIndex={0}
                                            onClick={handleStyleChange}
                                        >
                                            <span>captain jack sparrow</span>
                                        </li>
                                        <li
                                            id="select-options-72005b65-09d1-16b3-aca8-3e496995585a7"
                                            tabIndex={0}
                                            onClick={handleStyleChange}
                                        >
                                            <span>matthew mcconaughey</span>
                                        </li>
                                    </ul>
                                    <svg
                                        className="caret"
                                        height={24}
                                        viewBox="0 0 24 24"
                                        width={24}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M7 10l5 5 5-5z" />
                                        <path d="M0 0h24v24H0z" fill="none" />
                                    </svg>
                                    <select id="questionstyle" tabIndex={-1}>
                                        <option value={style} disabled="" />
                                        <option value="master oogway">master oogway</option>
                                        <option value="1940's gangster">1940's gangster</option>
                                        <option value="like i'm an 8 year old">
                                            like I'm an 8 year old
                                        </option>
                                        <option value="normal" selected="">
                                            normal
                                        </option>
                                        <option value="master yoda">jedi</option>
                                        <option value="captain jack sparrow">
                                            captain jack sparrow
                                        </option>
                                        <option value="matthew mcconaughey">
                                            matthew mcconaughey
                                        </option>
                                    </select>
                                </div>
                                <label>Style of questions</label>
                            </div>

                            <div className="input-field col s12">
                                <button
                                    id="btn-categories"
                                    className="btn waves-effect waves-light"
                                >
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


