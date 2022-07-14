
export const seachName = (list, name) => {
    const result = []
    list.map(item => {
        if (name && item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
            result.push(item)
        }
        return null
    })

    return result
}