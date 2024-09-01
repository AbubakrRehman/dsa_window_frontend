import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';
import UserItem from '../UserItem/UserItem';
import { toast } from 'react-toastify';
import "./UsersPage.css";
import { defaultFilterValues, filterByItems, orderByItems } from './constants';
import SearchSortFilter from '../SearchSortFilter/SearchSortFilter';
import { getQueryString } from '../../utility';

function UsersPage() {

    const isFirstRender = useRef(true);

    const [users, setUsers] = useState(null);
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    const { user } = useAuth();

    const [page, setPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);

    const [filterData, setFilterData] = useState({
        selected: {},
        search: "",
        order: 'desc',
        sortBy: 'createdAt'

    });

    const deleteUser = (user) => {
        return axios.delete(`${BASE_URL}/api/users/${user.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            }
        });
    }

    const updateUser = (user) => {
        return axios.put(`${BASE_URL}/api/users/${user.id}`, user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            }
        });
    }


    useEffect(() => {

        const loadUsers2 = async (filterData) => {
            try {
                const queryString = getQueryString(filterData, page);
                const result = await loadUserList(queryString);
                setUsers(result.data.items);
                setTotalPageCount(+result.data.count);
            } catch (err) {
                console.log("error", err);
            }
        }


        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (user && page) {
            loadUsers2(filterData);
        }

    }, [_, user, page, filterData])


    const loadUserList = (queryString) => {
        return axios.get(`${BASE_URL}/api/users/${queryString}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            }
        });
    }

    const handleUserDeletion = useCallback(async (user) => {
        await deleteUser(user);
        forceUpdate();
    },[])

    const handleUserUpdate = useCallback(async (user) => {
        await updateUser(user);
        forceUpdate();
    },[])

    const nextButtonClick = () => {
        setPage((curr) => {
            if (curr === totalPageCount) return curr
            return curr + 1;
        })
    }

    const prevButtonClick = () => {
        setPage((curr) => {
            if (curr === 1) return curr
            return curr - 1;
        })
    }

    const handleSearch = useCallback((formData) => {
        setTotalPageCount(0);
        setPage(1);
        setFilterData(formData);
    }, [])


    return (
        <div className='container users-page'>

            <SearchSortFilter placeholder="Enter username or email" onSearchWithFilters={handleSearch} filterByItems={filterByItems} orderByItems={orderByItems} defaultFilterValues={defaultFilterValues}/>

            <div className='mt-3'>
                {/* <h1>Users</h1> */}
                {users?.length > 0 ? users?.map((user) => {
                    return <UserItem key={user.id} user={user} onRemove={handleUserDeletion} onEdit={handleUserUpdate} />
                }) : 'No users found !!!'}
            </div>

            {totalPageCount > 1 ? <div className='pagination'>
                <button className="btn prev" disabled={page === 1} onClick={prevButtonClick}>Prev</button>
                <button className="btn next" disabled={totalPageCount === 0 || page === totalPageCount } onClick={nextButtonClick}>Next</button>
            </div>
                : null
            }
        </div>
    )
}

export default UsersPage