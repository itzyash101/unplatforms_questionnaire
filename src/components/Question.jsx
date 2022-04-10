import React, { useState } from 'react';
export default function Question(props) {

    const [updatedQuestion, updateQuestion] = useState(props.questionSet.question);
    const [question, setQuestion] = useState(props.questionSet.question);
    // const [options, setOptions] = useState(['Option-1', 'Option-2', 'Option-3']);
    const handleEdit = () => {
        setQuestion(<input
                type='text'
                placeholder='Edit your question here'
                name='question'
                defaultValue={updatedQuestion}
                onChange={(e)=>updateQuestion(e.target.value)}
                />
        );
    };
    return (
        <div className='card-body mb-3 pb-0 position-relative' style={{borderRadius: 18}} id={props.questionSet.qid}>
            <span className='question'>{question}</span>
            <span className='position-absolute top-0 end-0'>
                <button 
                    onClick={handleEdit}
                    className="btn btn-primary btn-sm mt-3"
                >
                    Edit&nbsp;&nbsp;<i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                    onClick={() => {
                            setQuestion(updatedQuestion);
                            props.questionUpdate(props.questionSet.qid, updatedQuestion);
                        }
                    }
                    className="btn btn-success btn-sm mt-3 ms-2 me-3"
                >
                    Save &nbsp;&nbsp;<i class="fa fa-check" aria-hidden="true"></i>
                </button>
            </span>
            <div className='options'>
                {props.questionSet.options.map((option)=>{
                    return (
                        <React.Fragment>
                            <input type='radio' className="form-check-input me-2" id={props.questionSet.qid+option} name={props.questionSet.qid} />
                            <label for={props.questionSet.qid+option}>{option}</label> <br/>
                        </React.Fragment>
                    );
                })}
            </div>
            <button
                onClick={() => props.onDelete(props.questionSet.qid)}
                className="btn btn-danger btn-sm mt-2 mb-3"
            >
                Delete &nbsp;&nbsp;<i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    );
}
