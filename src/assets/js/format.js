function playFormat(number) {
  if (number < 10000) {
    return number
  }
  return (number / 10000).toFixed(1) + '万播放'
}

module.exports = {
  playFormat
}
