PR Reviewers Bot
=================

## How to install

```
$ npm install
```


## How to test
```
$ npm test
```

or in watch mode:

```
$ npm run test:watch
```


TODO:

1. read `.github/pr_review_bot.yml` file
2. validate configurations
  - don't run if:
    - missing team
    - missing gh_token
    - missing repo name
3. read/save state from file
4. sending pr comment with the two selected user
5. notify user on slack
6. publish library to npm with semantic release
7. don't run twice for the same pr
8. get pr information from circle ci env variables
9. try to read repository name from `package.json`