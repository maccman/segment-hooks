module.exports = {
  "server": {
    "protocol": "https",
    "host": process.env.GOOGLE_CALLBACK
  },
  "google": {
    "key": process.env.GOOGLE_KEY,
    "secret": process.env.GOOGLE_SECRET,
    "callback": "/sessions/create",
    "custom_params": {
      "hd": process.env.GOOGLE_DOMAIN,
      "access_type": "online"
    },
    "scope": [
      "email",
      "profile"
    ]
  }
}
