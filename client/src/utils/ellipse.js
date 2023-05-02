
export const addEllipsis = (text) => {
    if (text.length > 50) {
        return text.substring(0, 50) + '...';

    }
    return text;
}


export const addEllipsis2 = (text) => {
    if (text.length > 15) {
        return text.substring(0, 15) + '...';

    }
    return text;
}