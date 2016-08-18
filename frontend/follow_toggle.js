class FollowToggle {
  constructor($el) {
    console.log($el);
    this.$el = $el;
    this.userId = this.$el.data("user");
    this.followState = this.$el.data("follow");
    this.$el.click(this.handleClick.bind(this));
    this.render();
  }

  render() {
    if (this.followState) {
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.$el.attr("disabled", true);
    $.ajax({
      dataType: "json",
      method: this.followState ? "delete" : "post",
      url: `/users/${this.userId}/follow`,
    }).done(() => {
      this.followState = !this.followState;
      this.render();
      this.$el.attr("disabled", false);
    });
  }
}
module.exports = FollowToggle;
