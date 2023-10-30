stephenroberts.io
=================

[![Build Status](https://img.shields.io/travis/stephencroberts/stephenroberts-io.svg)](https://travis-ci.org/stephencroberts/stephenroberts-io)

The site is built using hexo.io with a custom template.

## Usage

```sh
# Install with legacy peer deps because the S3 deployer is woefully out-of-date
# with hexo
npm install --legacy-peer-deps

npm run start
```

Navigate to `http://localhost:4000` in your browser!

### Deploying

```sh
npm run build
AWS_KEY=<aws access key id> AWS_SECRET=<aws secret access key> npm run deploy
```

Invalidate CDN cache.
