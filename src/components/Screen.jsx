import React, { useState, useEffect } from 'react';
import Question from './Question'
import AddQuestion from './AddQuestion';
import Axios from 'axios';
import './Screen.css';

export default function Screen() {

    const [questions, updateQuestions] = useState([]);
    const [newId, setNewId] = useState(0);
    // const [questionsList, updateQuestionsList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((res) => {
            console.log('useEffect/Axios.get called');
            for(let i=0; i<res.data.length; i++) {
                res.data[i].qid = res.data[i].qid.toString();
                res.data[i].options = res.data[i].options.split(',');
            }
            updateQuestions([...res.data]);
            console.log(res.data);
        }).then(()=>{
            // 
        });
    }, []);
    const handleSave = () => {
        document.getElementById('saveMsg').innerHTML = "Questions saved successfully!!";
        Axios.post('http://localhost:3001/api/insert', {questions: questions,});
    };

    const addQuestion = questionSet => {
        console.log('Question Added');
        // questions.push(questionSet);
        setNewId(newId+1);
        questionSet.qid = newId.toString();
        updateQuestions([...questions, questionSet]);
    };
    const onDelete = qid => {
        console.log('Delete');
        updateQuestions([...questions.filter((questionSet) => questionSet.qid!==qid)]);
    };
    const questionUpdate = (qid, question) => {
        questions[questions.findIndex(q=>q.qid===qid)].question = question;
        updateQuestions([...questions]);
        console.log(questions);
    };
    return (
        <div className='card'>
            <div className='card-title mt-3'>
                <h3>Screening Questions</h3>
                <p>Narrow down your candidates</p>
            </div>
            <div className='card-text'>
                {questions.map(questionSet => 
                <Question 
                    key={questionSet.qid}
                    questionSet={questionSet}
                    questionUpdate={questionUpdate}
                    onDelete={onDelete}
                />)}
                <AddQuestion
                    key='new_question'
                    addQuestion = {addQuestion}
                />
                <div id="save-cancel">
                    <button
                        onClick={handleSave}
                        className="px-4 btn btn-dark me-4"
                    >
                        Save
                    </button>
                    <button
                        onClick={()=>window.location.reload(false)}
                        className="px-4 btn btn-secondary ms-4"
                    >
                        Cancel
                    </button>
                </div>
                <p className="mb-3 text-center" id="saveMsg"></p>
                {/* {questionsList.map(question => <p>{question.question}</p>)} */}
                {/* <p>{savedMsg.map((msg) => msg)}</p> */}
            </div> {/*End*/}
        </div>
    );
}
