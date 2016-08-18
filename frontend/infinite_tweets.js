class InfiniteTweets {
  constructor() {
    this.$el = $('.infinite-tweets');
    this.$el.on('insert-tweet', (_, data) => {
      this.insertTweet.call(this, data, true);
    });
    this.$a = $('#load-more');
    this.$a.click(this.fetchTweets.bind(this));
    this.maxCreatedAt = null;
    this.fetchedAll = false;
    this.tweets = [];
    this.fetchTweets();
  }
  fetchTweets() {
    if (this.fetchedAll) {
      return;
    }
    $.ajax ({
      url: "/feed",
      dataType: "json",
      data: this.maxCreatedAt ? {
        max_created_at: this.maxCreatedAt
      } : {}
    }).done(this.insertTweets.bind(this));
  }

  renderTweets() {
    let compiled = _.template($('#tweets_template').html());
    let template = compiled({tweets: this.tweets});
    this.$el.html(template);
  }

  insertTweets(tweets) {
    if (tweets.length < 20) {
      this.$a.html("No more tweets to load");
      this.fetchedAll = true;
    }
    tweets.forEach ((data) => {
      this.insertTweet(data, false);
    });
    this.renderTweets();
  }

  insertTweet(data, prepend) {
    let li = `<li>${data.content} -- <a href="/users/${data.user_id}">${data.user.username}</a> -- ${data.created_at}</li>`
    if (prepend) {
      this.tweets.unshift(data);
      // $('#feed').prepend(li);
      if (this.maxCreatedAt === null) {
        this.maxCreatedAt = data.created_at;
      }
      this.renderTweets();
    } else {
      this.tweets.push(data);
      // $('#feed').append(li);
      this.maxCreatedAt = data.created_at;
    }
  }
}
module.exports = InfiniteTweets;
