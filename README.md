PR Reviewers Bot
=================
A GitHub App built with [Probot](https://github.com/probot/probot) that adds reviewers to Github pull requests.

> [![](https://user-images.githubusercontent.com/1020467/41391403-0e0661d0-6f60-11e8-88ba-03977963574f.png)](https://github.com/matheussampaio/pr-reviewers-bot) [![Greenkeeper badge](https://badges.greenkeeper.io/matheussampaio/pr-reviewers-bot.svg)](https://greenkeeper.io/)


## Usage

1. **[Configure the GitHub App](https://github.com/apps/pr-reviewers-bot)**
2. Create `.github/pr-reviewers-bot.yml` based on the following template.
3. It will start watching for created pull requests and adding reviewers.

A `.github/pr-reviewers-bot.yml` file with `min_reviewers_per_pr` and `team` are required to enable the plugin:

```yml
min_reviewers_per_pr: 2
team:
  - github_username1
  - github_username2
  - github_username3
  - github_username4
```

## License

[MIT](https://github.com/matheussampaio/pr-reviewers-bot/blob/master/LICENSE)
