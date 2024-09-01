import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';
import UserTopicItem from '../UserTopicItem/UserTopicItem';
import "../Home/Home.css"

function Home() {

  const [userTopics, setUserTopics] = useState([]);
  const { user } = useAuth();

  useEffect(() => {

    const loadUserTopics = async () => {
      const result = await axios.get(`${BASE_URL}/api/topics`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${user.token}`
        }
      });
      setUserTopics(result?.data);
    }

    if (user) {
      loadUserTopics();
    }
  }, [user])


  return (
    <> 
      <div className="container mt-5">
        <div className='flex-container'>
          {userTopics.length > 0 ? userTopics?.map((topic) => {
            return <UserTopicItem key={topic.id} topic={topic} />
          }) : 'No topics found !!!'}
        </div>
      </div>
    </>
  )
}

export default Home