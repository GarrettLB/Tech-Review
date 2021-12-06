module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  change_date: (date) => {
    let split = date.split(" ")
    let datenums = split[0]
    let usable = datenums.split("-")
    let arr = [usable[1], usable[2], usable[0]]
    let join = arr.join('/')
    return join
  }
}