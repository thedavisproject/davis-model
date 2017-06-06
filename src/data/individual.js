module.exports = {
  new: (id, dataSetId, facts) => {
    return {
      id: id,
      dataSet: dataSetId,
      facts: facts
    };
  }
};
