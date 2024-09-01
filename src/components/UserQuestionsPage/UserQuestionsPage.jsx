import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/constants';
import { useAuth } from '../../context/AuthContext';
import "./UserQuestionsPage.css";
import UserQuestionItem from '../UserQuestionItem/UserQuestionItem';
import { toast } from 'react-toastify';
import SearchSortFilter from '../SearchSortFilter/SearchSortFilter';
import { filterByItems, orderByItems, defaultFilterValues } from "./constants.js";
import { getQueryString } from '../../utility.js';

function UserQuestionsPage() {

    const isFirstRender = useRef(true);

    const { topicId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    const { user } = useAuth();
    const [filterData, setFilterData] = useState({
        selected: {},
        search: "",
        order: 'desc',
        sortBy: ''

    });

    useEffect(() => {

        const loadQuestions2 = async (filterData) => {
            try {
                const queryString = getQueryString(filterData);
                const result = await loadQuestionList(topicId, queryString);
                setQuestions(result.data);
            } catch (err) {
                console.log("error", err);
            }
        }

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (user) {
            // loadQuestions();
            loadQuestions2(filterData);
        }

    }, [_, user, filterData])


    const loadQuestionList = (topicId, queryString) => {
        return axios.get(`${BASE_URL}/api/topics/${topicId}/user_questions/${queryString}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            }
        });
    }

    const attemptQuestion = (questionId, payload) => {
        return axios.put(`${BASE_URL}/api/topics/${topicId}/questions/${questionId}`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            }
        });
    }


    const handleQuestionSubmission = useCallback(async (question, key) => {

        let payload = {};
        payload[key] = (question[key] == true || question[key] == false) ? !question[key] : question[key];
        let questionId = question.id;

        try {
            await attemptQuestion(questionId, payload);

            if (key === 'isCompleted') {
                toast.success(`Question ${questionId} has been marked as ${!question[key] ? 'completed' : 'uncompleted'}`)
            }

            forceUpdate();
        } catch (err) {
            console.log("error", err);
        }
    }, [])

    const handleSearch = useCallback((formData) => { setFilterData(formData); }, [])

    return (
        <div className='container'>

            <SearchSortFilter placeholder="Enter question text" onSearchWithFilters={handleSearch} filterByItems={filterByItems} orderByItems={orderByItems} defaultFilterValues={defaultFilterValues}/>

            <div className='mt-3'>
                {questions.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th className='width-5'></th>
                                <th className='width-10'>Id</th>
                                <th className='width-70'> Question</th>
                                <th>Actions</th>
                                {/* <th>Note</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {questions?.map((question, questionIndex) => {
                                return (
                                    <UserQuestionItem index={questionIndex} key={question.id} question={question} onQuestionAttempt={handleQuestionSubmission} />
                                )
                            })}

                        </tbody>
                    </table>
                    : <p>No questions found !!!</p>
                }
            </div>
        </div>
    )
}

export default UserQuestionsPage