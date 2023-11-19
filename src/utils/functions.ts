export const fixed = (num?: number, digits: number = 2) => {
    return num?.toFixed(digits) ?? 'undefined';
}

export const dateToTimeAgo = (inputDate: Date | string): string => {
    const date = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;
    const now = new Date();

    const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (secondsPast < 60) {
        return `${secondsPast} seconds ago`;
    }

    const minutesPast = Math.floor(secondsPast / 60);
    if (minutesPast < 60) {
        return `${minutesPast} minutes ago`;
    }

    const hoursPast = Math.floor(minutesPast / 60);
    if (hoursPast < 24) {
        return `${hoursPast} hours ago`;
    }

    const daysPast = Math.floor(hoursPast / 24);
    if (daysPast < 7) {
        return `${daysPast} days ago`;
    }

    const weeksPast = Math.floor(daysPast / 7);
    return `${weeksPast} weeks ago`;
};
