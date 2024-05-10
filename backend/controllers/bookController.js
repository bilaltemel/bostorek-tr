const getAllBooks = (req, res) => {
  const books = [
    {
      id: 1,
      name: "İstanbul Hatırası",
    },
    {
      id: 2,
      name: "Kukla 58",
    },
  ];

  res.json(books);
};

export {
    getAllBooks
}