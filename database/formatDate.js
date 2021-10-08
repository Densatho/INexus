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
    }/${date.getFullYear()} às ${
      date.getHours() < 10 ? 0 : ""
    }${date.getHours()}:${date.getMinutes() < 10 ? 0 : ""}${date.getMinutes()}`;
    return formatedDate;
  },
};
