function playFormat(number) {
  if (number < 10000) {
    return number
  }
  return (number / 10000).toFixed(1) + '万播放'
}

// function timeFormat(type, time) {
//   const date = new Date(time)
//   if (type === 'M-D h:m') {
//     return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
//   }
// }

module.exports = {
  playFormat
}
