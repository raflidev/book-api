const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (req, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    createdAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    if (name === null || name === '' || name === undefined) {
      const res = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      res.code(400);
      return res;
    }
    if (readPage > pageCount) {
      const res = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      res.code(400);
      return res;
    }
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    res.code(201);
    return res;
  }

  const res = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  res.code(500);
  return res;
};

const getAllBookHandle = (req, h) => {
  const { name, reading, finished } = req.query;

  if (name !== undefined) {
    const filter = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    const res = h.response({
      status: 'success',
      data: {
        filter,
      },
    });
    res.code(200);
    return res;
  }

  if (reading !== undefined) {
    const filter = books.filter((b) => b.reading === (reading === '1'));
    const res = h.response({
      status: 'success',
      data: {
        filter,
      },
    });
    res.code(200);
    return res;
  }

  if (finished !== undefined) {
    const filter = books.filter((b) => b.finished === (finished === '1'));
    const res = h.response({
      status: 'success',
      data: {
        filter,
      },
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  res.code(200);
  return res;
};

const getBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const res = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  res.code(404);
  return res;
};

const editBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading, createdAt,
  } = req.payload;

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;
  const index = books.findIndex((b) => b.id === bookId);

  if (name === undefined) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }

  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      createdAt,
      updatedAt,
    };

    const res = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

const deleteBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

module.exports = {
  addBookHandler, getAllBookHandle, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler,
};
