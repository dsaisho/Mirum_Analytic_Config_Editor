export const createTableHeaders = _tableCategories =>
  Object.keys(_tableCategories[0]).map(category => {
    return {
      text: category,
      value: category
    };
  });
