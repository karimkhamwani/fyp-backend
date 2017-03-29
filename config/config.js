module.exports = {
  secretKey: '%^&^*&-*({SC-554c-234!',
  mongoUrl: 'mongodb://localhost:27017/doyouthink',
  sealPass: '^&UI&*G87h*&*&HUIUIIU98419(*)(^&UASDSC-554c-234!',
  facebook: {
    secret: '',
    accessTokenUrl: 'https://graph.facebook.com/v2.5/oauth/access_token',
    graphApiUrl: 'https://graph.facebook.com/v2.5/me'
  },
  google: {
    secret: '',
    accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
    peopleApiUrl: 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'
  },
  twitter: {
    secret: '',
    key: '',
    accessTokenUrl: 'https://api.twitter.com/oauth/access_token',
    requestTokenUrl: 'https://api.twitter.com/oauth/request_token',
    profileUrl: 'https://api.twitter.com/1.1/account/verify_credentials.json'
  },
  s3: {
    accessKeyId: '',
    secretAccessKey: '',
    region: 'ap-southeast-1',
    imageBucket: 'studentsento-images'
  },
  mailgun: {
    'apiKey': '',
    'domain': ''
  }
};
