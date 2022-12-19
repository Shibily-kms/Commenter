const postDateFormatChange = (date) => {
    let now = new Date()
    let post = new Date(date)
    let diffrend = now - post

    if (diffrend < 60000) {   // Get Second
        return 'just now'
    } else if (diffrend <= 3600000) {  // Get Minuts
        let seconds = diffrend / 1000
        let minuts = parseInt(seconds / 60)
        return minuts + ' min'
    } else if (diffrend <= 86400000) {   // Get Hours
        let seconds = diffrend / 1000
        let minuts = parseInt(seconds / 60)
        let hour = parseInt(minuts / 60)
        return hour + ' hr'
    } else if (diffrend <= 604800000) {  // Get Days
        let seconds = diffrend / 1000
        let minuts = parseInt(seconds / 60)
        let hour = parseInt(minuts / 60)
        let day = parseInt(hour / 24)
        return day + (day == 1 ? ' day' : ' days')
    } else if (diffrend > 604800000) {    // Get Date

        let fullDate = post.toDateString()
        return fullDate;
    }
}

const messageDateFormatChange = (date) => {

    let post = new Date(date).toLocaleTimeString()

    if (post.length === 11) {
        post = post.slice(0, 5) + post.slice(8, 11)
    } else {
        post = post.slice(0, 4) + post.slice(7, 10);
    }
    return post
}

const notifiDateFormatChange = (date) => {
    let now = new Date()
    let notf = new Date(date)
    let diffrend = now - notf
    if (diffrend <= 604800000) {  // Get Days
        let seconds = diffrend / 1000
        let minuts = parseInt(seconds / 60)
        let hour = parseInt(minuts / 60)
        let day = parseInt(hour / 24)
        return day === 0 ? 'Today' : day + (day == 1 ? ' day' : ' days')
    } else {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return notf.getDate() + ' ' + months[notf.getMonth()]
    }
}


export { postDateFormatChange, messageDateFormatChange, notifiDateFormatChange };