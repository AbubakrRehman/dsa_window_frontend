import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/constants';
import { useAuth } from '../../context/AuthContext';
import QuestionItem from '../QuestionItem/QuestionItem';
import { toast } from 'react-toastify';

function QuestionsPage() {

    const { topicId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [_, forceUpdate] = useReducer(x => x + 1, 0);

    const { user } = useAuth();

    const addQuestion = (question) => {
        return axios.post(`${BASE_URL}/api/topics/${topicId}/questions`, question, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            }
        });
    }

    const deleteQuestion = (question, topicId) => {
        return axios.delete(`${BASE_URL}/api/topics/${topicId}/questions/${question.id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.target);
        formData = Object.fromEntries(formData.entries());

        if (formData.title.trim() === "") return;

        try {
            await addQuestion(formData);
            toast.success(`Question has been added successfully`)
            forceUpdate();
        } catch (error) {
            // toast.error("Something went wrong !!");
            toast.success(`Failed to add question`)
        }

        e.target.reset();
    }

    const handleQuestionDeletion = async (question, topicId) => {
        await deleteQuestion(question, topicId);
        forceUpdate();
    }

    useEffect(() => {

        const loadQuestions = async () => {
            try {
                const result = await axios.get(`${BASE_URL}/api/topics/${topicId}/questions`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${user.token}`
                    }
                });
                setQuestions(result.data);
            }
            catch(error) {
                console.log("error", error);
            }

            
        }

            if (user) {
                loadQuestions();
            }
        
    }, [_, topicId, user])

    return (
        <div className='container'>
            <h1>Questions</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Question</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" name="title"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Link</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" name="link"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className='mt-3'>
                {questions.length > 0 ? questions?.map((question) => {
                    return <QuestionItem key={question.id} question={question} topicId={topicId} onRemove={handleQuestionDeletion} />
                }) : <p>No questions found !!!</p>}

            </div>
        </div>
    )
}

export default QuestionsPage