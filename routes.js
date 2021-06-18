const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (req,h) => {
      return "Homepage"
    }
  },
  {
    method: '*',
    path: '/',
    handler: (req, h) => {
        return 'Halaman tidak ditemukan';
    },
  },
  {
    method: 'GET',
    path: '/about',
    handler: (req, h) => {
        return 'About page';
    },
  },
  {
    method: '*',
    path: '/about',
    handler: (req, h) => {
        return 'Halaman tidak ditemukan';
    },
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
        return 'Halaman tidak ditemukan';
    },
  },
  {
    method: 'POST',
    path: '/books',
    handler: (req,h) => {
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
      } = req.payload;
    } 
  }
];

module.exports = routes;