async function paginate({ page = 1, pageSize = 10, where = {}, order = [['createdAt', 'DESC']] }) {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const { count: totalItems, rows: data } = await this.findAndCountAll({
    where,
    order,
    limit,
    offset,
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data,
    meta: {
      totalItems,
      totalPages,
      currentPage: page,
      pageSize,
    },
  };
}

export default paginate;
