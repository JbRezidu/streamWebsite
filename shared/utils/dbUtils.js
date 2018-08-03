const getExistingCollections = async (db) => {
  return (await db.db.listCollections().toArray()).map(collection => collection.name);
};

module.exports = {
  getExistingCollections,
};
