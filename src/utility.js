const getQueryString = (filterData, page = 1) => {
    let searchTemplete = '';
    let selectedTemplate = '';
    let orderByTemplate = '';
    let orderTemplate = '';
    let resultantTemplateList = [];

    if (filterData.search !== '') {
        searchTemplete = `search=${filterData.search}`;
        resultantTemplateList = [...resultantTemplateList, searchTemplete]
    }

    if (Object.keys(filterData.selected).length !== 0) {
        let tempStr = [];

        for (let key in filterData.selected) {
            tempStr = [...tempStr, `${key}=${filterData.selected[key]}`]
        }

        selectedTemplate =  tempStr.join("&");
        resultantTemplateList = [...resultantTemplateList, selectedTemplate]
    }

    if(filterData.order) {
        orderTemplate = filterData.order === 'desc' ? '-' : '+';
    }

    if (filterData.sortBy) {
        orderByTemplate = "sortBy=" + orderTemplate + filterData.sortBy;
        resultantTemplateList = [...resultantTemplateList, orderByTemplate]
    }

    const resultantTemplate = resultantTemplateList.join("&");

    return `?page=${page}&${resultantTemplate}`;
}

export {getQueryString};