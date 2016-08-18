const FollowToggle = require("./follow_toggle.js");
class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = this.$el.find("input");
    this.$ul = this.$el.find("ul");
    this.$input.on("input", this.handleInput.bind(this));
  }
  handleInput(e) {
    $.ajax ({
      url: "/users/search",
      dataType: "json",
      data: {
        query: e.target.value
      }
    }).done(this.renderResults.bind(this));
  }
  renderResults(users) {
    this.$ul.html("");
    users.forEach((el) => {
      this.$ul.append(`<li>${el.username}<button class="follow-toggle" data-user="${el.id}" data-follow="${el.followed}"></button></li>`);
      new FollowToggle($(".follow-toggle:last"));
    });
  }
}
module.exports = UsersSearch;
