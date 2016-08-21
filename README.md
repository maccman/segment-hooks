# Segment Hooks

Segment Hooks lets you execute arbitrary JavaScript when specific [Segment](http://segment.com) events are triggered. You could, for example, post a message in Slack when a user first signs up, or send an email to yourself when someone goes over their monthly quota.

![Screenshot](https://cloud.githubusercontent.com/assets/2142/17839073/279c355c-6792-11e6-879d-39a12a914302.png)


## Getting started

The simplest way of getting up and running is via the Heroku button below.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Configuring Segment

Once you have a Heroku endpoint, you'll need to set up a [Segment](http://segment.com) webhook. You can add a custom webhook endpoint under your Segment apps integrations.

![Segment](https://cloud.githubusercontent.com/assets/2142/17839081/4a88c83c-6792-11e6-8fb4-875c1022a89b.png)

Configure the endpoint to be `https://your-app.herokuapp.com/events` - notice the `/events` trailing path.

That's it - you're all setup!

## Authentication

Clearly this app is best concealed behind a authentication layer. Segment Hooks comes with out the box support for Google Apps auth (and it's fairly straightorward to add alternatives). You'll need to set the following env vars:

    GOOGLE_CALLBACK: your-app.herokuapp.com
    GOOGLE_DOMAIN: your-google-apps-domain.com
    GOOGLE_KEY: your-google-key
    GOOGLE_SECRET: your-google-secret

You generate the values for `GOOGLE_KEY` and `GOOGLE_SECRET` in [Google's API console](https://console.developers.google.com).

## Sending HTTP requests

Segment Hooks bundles the [requests lib](https://github.com/request/request), so sending HTTP requests is very straightforard. For example, a Hook's JavaScript might look like this:

```javascript
request.post({
  url: "https://hooks.slack.com/services/your-hook-id",
  json: {text: event.properties.message}
});
```

## Sending email

To send email, you'll need to add the `mailgun` Heroku addon. You'll also need to confirm your email address with Mailgun, and setup a custom domain.

Once that's done, the following JavaScript will send an email.

```javascript
sendMail({
  to: 'alex@clearbit.com',
  subject: 'Customer signup',
  text: (event.properties.email + ' just signed up!')
});
```

## Other libraries

To use other Node libraries, simply add them to the `package.json` dependencies and deploy to Heroku. A Hook can access all of the usual node context.

## Testing

Run:

```shell
cat test/fixtures/event.json | \
curl -X POST \
     -H "Content-Type: application/json" \
     -d @- \
     http://localhost:7001/events
```
