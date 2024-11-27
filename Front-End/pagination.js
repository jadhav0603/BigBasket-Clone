// pagination.js
// module.exports = (req, res, next) => {
//     const { _pageno, _limit } = req.query;
//     if (_pageno && _limit) {
//       const pageno = parseInt(_pageno);
//       const limit = parseInt(_limit);
//       const start = (pageno - 1) * limit;
//       const end = pageno * limit;
//       const data = res.locals.data.slice(start, end);
//       res.json(data);
//     } else {
//       next();
//     }
//   };
  