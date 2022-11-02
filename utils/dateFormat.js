const formatDate = date => {
    let dateString = date.toString();
  
    return `${new Date(dateString).getMonth() + 1}/${new Date(dateString).getDate()}/${new Date(
      dateString).getFullYear()} @ ${new Date(dateString).toLocaleTimeString()}`
  }
  
  module.exports = formatDate;