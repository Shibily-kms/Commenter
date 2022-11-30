const postDateFormatChange = (date) => {
    let now = new Date()
    let post = new Date(date)
    let diffrend = now - post

    if (diffrend < 60000) {
        return 'just now'
    } else if (diffrend <= 3600000) {
        let seconds = diffrend / 1000
        let minuts = parseInt(seconds / 60)
        return minuts + ' min'
    } else if (diffrend <= 86400000) {
        let seconds = diffrend / 1000
        let minuts = parseInt(seconds / 60)
        let hour = parseInt(minuts / 24)
        return hour + ' hr'
    } else if (diffrend > 86400000) {
        const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let day = post.getDay()
        let month = monthList[post.getMonth()]
        let year = post.getFullYear()
        return day + ' ' + month + ' ' + year
    }
}

export { postDateFormatChange };