const filterByDate = (items: any[], term: string): any[] => {

    if (term && term.trim() !== '' && term !== 'All') {
        return items.filter(item => (
            item.date.trim().toLowerCase() === term.trim().toLowerCase()
        ));
    }

    return items;
}

export default filterByDate;