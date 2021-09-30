module.exports = {
  formatDate(date) {
    date = new Date(date);
    let formatedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formatedDate;
  },

  formatDateWithHour(date) {
    date = new Date(date);
    let formatedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}:${date.getHours()} hour(s) and ${date.getMinutes()} minute(s)`;
    return formatedDate;
  },
};
