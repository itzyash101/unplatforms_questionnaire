import React, { useState } from 'react';
import './AddQuestion.css'

export default function AddQuestion(props) {

    const [newQuestion, setQuestion] = useState('');
    const [newOption, setOption] = useState('');
    const [options, setOptions] = useState([]);

    const addOption = option => {
        // options.push(option);
        setOptions([...options, option]);
        setOption('');
        console.log('Option Added');
    };
    return (
        <div className='card-body'>
            <h4>Add Question</h4>
            <input
                type='text'
                placeholder='Type your question here'
                value={newQuestion}
                onChange={(e)=>setQuestion(e.target.value)}
                className="question-tb"
            />
            <div className='options'>
                {options.map(option => {
                    return (
                        <React.Fragment>
                            <input type='radio' className="form-check-input me-2 mt-2" id='new-option' name='new' />
                            <label for='new-option' className="mt-1">{option}</label> <br/>
                        </React.Fragment>
                    );
                })}
                <input
                    type='text'
                    placeholder='Add Option'
                    key='new_option'
                    value={newOption}
                    onChange={(e)=>setOption(e.target.value)}
                    className="my-2"
                />
                <button
                    onClick={()=>addOption(newOption)}
                    className="btn btn-primary btn-sm ms-2 mb-1"
                >
                    <i class="fa fa-plus" aria-hidden="true" />
                </button>
                <br/>
            </div>
            <button className="btn btn-success mb-2" onClick={()=>{

                    props.addQuestion({
                        question: newQuestion,
                        options: options
                    });
                    setOptions([]);
                    setQuestion('');
                }
            }>
                Add Question
            </button>
        </div>
    );
}
 