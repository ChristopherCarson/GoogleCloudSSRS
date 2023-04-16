curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "ssrs_url": "https://reports.bradyindustries.com",
    "username": "Chris.Carson@BradyIndustries.com",
    "password": "thg.KCH3ewe!ahz!uqk",
    "domain": "",
    "report_path": "/Sales/All Open Orders by Location",
    "parameters": {
        "LocationID": "1600"
    }
  }' \
  -o report.csv \
  http://localhost:8080
