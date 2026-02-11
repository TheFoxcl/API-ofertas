let cachedTables = null;

module.exports = {
  setTables(data) {
    cachedTables = data;
  },
  getTables() {
    return cachedTables;
  },
};
