module.exports = class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$el.submit(this.handleSubmit.bind(this));
    this.$el.find("textarea").on("input", (e) => {
      this.handleInputChange(e.target.value);
    });
    this.users = $('#allUsers').data("users");
    $(".chars-left").text(`0 / 140`);
    $(".add-mentioned-user").click(this.addmentionedUser.bind(this));
  }

  addmentionedUser(e) {
    let $script = $('.mentioned-user-select');
    $('.mentioned-users').append($script.html());
    $(".remove-mentioned-user").click(this.removeMentionedUser.bind(this));
  }

  removeMentionedUser(e) {
    let current = $(e.currentTarget);
    current.parent().remove();
  }

  handleInputChange(text) {
    // let ats = (text.match(/@/g) || []).length;
    $(".chars-left").text(`${text.length} / 140`);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = $(e.target).serializeJSON();
    let content = data.tweet.content;
    let splits = content.split("@");
    content = content.split("");
    let ats = splits.map((str, idx) => {
      let index = str.indexOf(" ") || str.length;
      str = str.slice(0, index);
      if (content[content.length - 1] === str[str.length - 1]) {
        index = str.length;
      }
      return str.slice(0, index);
    }).slice(1);
    ats.forEach(at => {
      let user = this.userExists(at);
      if (user) {
        let index = content.join("").indexOf(`@${at}`);
        content.splice(index + at.length + 1, 0, `</a>`);
        content.splice(index, 0, `<a href="/users/${user.id}">`);
      }
    });
    data.tweet.content = content.join("");


    this.disableForm(true);
    $.ajax({
      method: "post",
      url: "/tweets",
      data: data,
      dataType: "json",
    }).done(this.handleSuccess.bind(this));
  }

  userExists(user) {
    let exists = false;
    this.users.forEach(u => {
      if (u.username === user) {
        exists = u;
      }
    });
    return exists;
  }

  disableForm(bool) {
    this.$el.find("textarea").prop("disabled", bool);
    this.$el.find("select").attr("disabled", bool);
    this.$el.find("input").attr("disabled", bool);
  }

  handleSuccess(data) {

    this.disableForm(false);
    this.$el.find("textarea").val("");
    $('.mentioned-users').empty();
    $('.infinite-tweets').trigger('insert-tweet', data);

  }
};
