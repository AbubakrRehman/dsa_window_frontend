const orderByItems = [
    { id: 1, displayName: "Name", value: "name" },
    { id: 2, displayName: "Updated On", value: "updatedAt" },
    { id: 3, displayName: "Added On", value: "createdAt" },


]

const filterByItems = [
    {
        id: 1,
        type: 'multi-value-filter',
        displayText: 'Role',
        key: 'role',
        values: [
            {
                id: 1,
                displayText: 'Admin',
                value: 'admin'
            },
            {
                id: 2,
                displayText: 'User',
                value: 'user'
            }
        ]
    }
]

const defaultFilterValues = {
    search: "",
    selected: {},
    order: 'desc',
    sortBy: 'name'
}

export { filterByItems, orderByItems, defaultFilterValues }