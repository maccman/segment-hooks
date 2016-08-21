
cat test/fixtures/event.json | \
curl -X POST \
     -H "Content-Type: application/json" \
     -d @- \
     http://localhost:7001/events



cat test/fixtures/event.json | \
curl -X POST \
    -H "Content-Type: application/json" \
    -d @- \
    https://secret-citadel-51964.herokuapp.com/events

