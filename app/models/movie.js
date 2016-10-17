var rp = require('request-promise');

module.exports = rp({
  uri: 'http://demo2697834.mockable.io/movies',
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
});