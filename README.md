
cat test/fixtures/event.json | \
curl -X POST \
     -H "Content-Type: application/json" \
     -d @- \
     http://localhost:7001/events

