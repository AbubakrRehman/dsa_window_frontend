const orderByItems = [
    { id: 1, displayName: "Title", value: "title" },
    { id: 2, displayName: "Updated On", value: "updatedAt" },
    { id: 3, displayName: "Added On", value: "createdAt" },

   
]

const filterByItems = [
    {
        id: 1,
        displayText: 'Bookmarked',
        type: 'single-value-filter',
        key: 'isBookmarked',
        value: false
    },
    {
        id: 2,
        displayText: 'Completed',
        type: 'single-value-filter',
        key: 'isCompleted',
        value: false
    }
]

const defaultFilterValues = {
    search: "",
    selected: {},
    order: 'desc',
    sortBy: 'title'
}

export {filterByItems, orderByItems, defaultFilterValues}