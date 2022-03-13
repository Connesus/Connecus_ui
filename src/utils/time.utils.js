export const timestampToDateTime = (startTime, duration) => {
    let expired = new Date(parseInt(duration / 1000000) + parseInt(startTime / 1000000))
    return expired
}