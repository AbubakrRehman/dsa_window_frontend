import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import TopicItem from '../TopicItem/TopicItem';
import { BASE_URL } from '../../constants/constants';
import { toast } from 'react-toastify';

function Topics() {


  const [topics, setTopics] = useState([]);
  const [_, forceUpdate] = useReducer(x => x + 1, 0);


  const updateTopic = (topic, topicName) => {
    return axios.put(`${BASE_URL}/api/topics/${topic.id}`, { title: topicName });
  }

  const addTopic = (topic) => {
    return axios.post(`${BASE_URL}/api/topics`, topic);
  }

  const deleteTopic = (topic) => {
    return axios.delete(`${BASE_URL}/api/topics/${topic.id}`);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData.entries());

    if (formData.title.trim() === "") return;

    try {
      await addTopic(formData);
      toast.success(`Topic ${formData.title} has been added successfully`);
      forceUpdate();
    } catch (error) {
      // toast.error("Something went wrong !!");
    }

    e.target.reset();
  }


  const handleTopicDeletion = async (topic) => {
    try {
      await deleteTopic(topic);
      toast.success(`Topic ${topic.title} has been deleted successfully`);
      forceUpdate();
    } catch (error) {
      toast.error(`Failed to delete ${topic.title} topic`);
    }
  }

  const handleTopicUpdate = async (topic, topicName) => {
    await updateTopic(topic, topicName)
    forceUpdate();
  }


  useEffect(() => {

    const loadTopics = async () => {
      const result = await axios.get(`${BASE_URL}/api/topics/admin`);
      setTopics(result.data);
    }

    loadTopics();

  }, [_])


  if (topics.length === 0) {
    return <p>No topics found !!!</p>
  }



  return (
    <>
      <div className="container">
        <h1>Topics</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-box'>
            <input type="text" name="title" placeholder='Enter Topic name...' className='reset-input' autoFocus />
            <button className='reset-btn add-btn' type="submit">Add</button>
          </div>

        </form>


        {topics.length > 0 ? topics?.map((topic) => {
          return <TopicItem key={topic.id} topic={topic} onRemove={handleTopicDeletion} onEdit={handleTopicUpdate} />
        }) : ''}
      </div>
    </>

  )
}

export default Topics