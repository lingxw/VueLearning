var homeTpl = require('./home.hbs');
var data = {
  post: {
    title: "Blog Post!",
    author: [{
      id: 47,
      name: "Jack"
    },{
      id: 20,
      name: "Mark"
    }]
  }
}
var home = homeTpl(data);
module.exports = home;