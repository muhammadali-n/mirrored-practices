//handling non generic transformations
const productTransformation = (data) => {
  const transformedData = data.map((data) => ({
    objectID: data.id
  }));
  return transformedData;
};

export { productTransformation };
