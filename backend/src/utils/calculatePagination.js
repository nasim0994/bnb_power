exports.calculatePagination = (options) => {
  const page = Number(options?.page);
  const limit = Number(options?.limit);
  const skip = (page - 1) * limit;

  const sortBy = options?.sortBy || "createdAt";
  const sortOrder = options?.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
