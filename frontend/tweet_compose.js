module.exports = class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$el.submit(this.handleSubmit.bind(this));
    this.$el.find("textarea").on("input", (e) => {
      this.handleInputChange(e.target.value.length);
    });
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

  handleInputChange(length) {
    $(".chars-left").text(`${length} / 140`);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = $(e.target).serializeJSON();
    this.disableForm(true);
    $.ajax({
      method: "post",
      url: "/tweets",
      data: data,
      dataType: "json",
    }).done(this.handleSuccess.bind(this));
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
