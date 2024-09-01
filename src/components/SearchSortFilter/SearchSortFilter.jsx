import React, { memo, useEffect, useMemo, useState } from 'react';
import "./SearchSortFilter.css"
import Button from 'react-bootstrap/esm/Button';
import ascending_icon from "../../assets/ascending.png";
import descending_icon from "../../assets/descending.png";

function SearchSortFilter({ filterByItems, orderByItems, onSearchWithFilters, defaultFilterValues, placeholder }) {

    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState({});
    const [order, setOrder] = useState('desc');
    const [sortBy, setSortBy] = useState(defaultFilterValues?.sortBy);
    const [activeFilterItems, setActiveFilterItems] = useState([]);

    const handleFilterChangeForSingleFilter = (filterKey) => {
        if (selected[filterKey]) {
            delete selected[filterKey]
        } else {
            selected[filterKey] = true
        }

        setSelected({ ...selected });
    }

    const handleFilterChangeForMultiFilter = (filterKey, filterValue) => {
        if (selected[filterKey]) {
            if (selected[filterKey].includes(filterValue)) {
                let index = selected[filterKey].indexOf(filterValue);
                selected[filterKey].splice(index, 1)
            } else {
                selected[filterKey] = [...selected[filterKey], filterValue]
            }

            if (selected[filterKey].length === 0) delete selected[filterKey]

        } else {
            selected[filterKey] = [filterValue]
        }

        setSelected({ ...selected });
    }

    const handleActiveFilterItem = (filterByItemId) => {

        const index = activeFilterItems.indexOf(filterByItemId);
        if (index > -1) {
            activeFilterItems.splice(index, 1);
        } else {
            activeFilterItems.splice(index, 0, filterByItemId);
        }
        setActiveFilterItems(activeFilterItems);
    }

    const handleOrderByChange = (e) => {
        let sortBy = e.target.value;
        setSortBy(sortBy);
    }

    const handleOrderChange = (e) => {
        if (order === 'desc') {
            setOrder('asc')
        } else {
            setOrder('desc')
        }
    }

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const filterData = {
            selected: selected,
            order: order,
            sortBy: sortBy,
            search: search
        }
        onSearchWithFilters(filterData);
    }

    const clearFilters = () => {
        setSelected({})
        setActiveFilterItems([]);
    }

    const handleSearchClear = (e) => {
        const filterData = {
            selected: selected,
            order: order,
            sortBy: sortBy,
            search: ''
        }
        onSearchWithFilters(filterData);
        setSearch('');
    }


    useEffect(() => {
        const filterData = {
            selected: selected,
            order: order,
            sortBy: sortBy,
            search: search
        }
        onSearchWithFilters(filterData);
    }, [selected, order, sortBy, onSearchWithFilters])


    return (
        <form className='container filter-form' onSubmit={handleSubmit} >
            <div className="mt-3 search-box">
                {/* <label htmlFor="search-input" className="form-label">Search</label> */}
                <input value={search} onChange={handleInputChange} placeholder={placeholder} type="text" className="form-control" id="search-input" />
                {search.trim() !== '' ? <button type="button" className='clear-btn' onClick={handleSearchClear}>Clear</button> : null}
            </div>

            <div className='d-flex mt-2'>
                <div className='filter-container'>
                    {/* <h3>Status</h3> */}
                    <div className='filter-items-container'>
                        {
                            filterByItems.map((filterByItem) => {
                                return (
                                    <div key={filterByItem.id}>
                                        {filterByItem.type === 'single-value-filter' ?
                                            (<div id={`form-check-${filterByItem.id}`} className={`${'form-check'} ${activeFilterItems.includes(filterByItem.id) ? 'active' : ''}`} key={filterByItem.id}>
                                                <input onChange={() => { handleFilterChangeForSingleFilter(filterByItem.key); handleActiveFilterItem(filterByItem.id) }} checked={!selected[filterByItem.key] ? false : selected[filterByItem.key]} className="form-check-input" type="checkbox" id={`id-${filterByItem.id}`} />
                                                <label className="form-check-label" htmlFor={`id-${filterByItem.id}`}>
                                                    {filterByItem.displayText}
                                                </label>
                                            </div>
                                            )
                                            : ''}

                                        {filterByItem.type === 'multi-value-filter' ?
                                            <div className='multi-value-filter'>
                                                {filterByItem.values.map((filterByItemSubItem) => {
                                                    return (<div id={`form-check-${filterByItemSubItem.id}`} className={`${'form-check'} ${selected[filterByItem.key]?.includes(filterByItemSubItem.value) ? 'active' : ''}`} key={filterByItemSubItem.id}>
                                                        <input onChange={() => { handleFilterChangeForMultiFilter(filterByItem.key, filterByItemSubItem.value) }} checked={!selected[filterByItem.key] ? false : selected[filterByItem.key].includes(filterByItemSubItem.value)} className="form-check-input" type="checkbox" id={`id-${filterByItemSubItem.id}`} />
                                                        <label className="form-check-label" htmlFor={`id-${filterByItemSubItem.id}`}>
                                                            {filterByItemSubItem.displayText}
                                                        </label>
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                            : ''}
                                    </div>
                                )
                            })
                        }

                        {activeFilterItems.length > 0 ? <button onClick={clearFilters} className='clear-btn'>Clear</button> : null}
                    </div>
                </div>


                {/* <h3>Order By</h3> */}
                <div className='order-by ms-auto'>
                    <select name="sortBy" id="sortBy" onChange={handleOrderByChange} value={sortBy}>
                        {orderByItems?.map((orderByItem) => {
                            return <option key={orderByItem.id} value={orderByItem.value}>{orderByItem.displayName}</option>
                        })}
                    </select>

                    {orderByItems.length > 0 ?
                        <button onClick={handleOrderChange} className='order-btn' type='button'>
                            {order === 'desc' ?
                                <img width={"18px"} height="18px" src={ascending_icon} alt="ascending_icon" /> :
                                <img width={"18px"} height="18px" src={descending_icon} alt="descending_icon" />
                            }
                        </button>
                        : null
                    }
                </div>
            </div>
        </form >
    )
}

export default memo(SearchSortFilter)