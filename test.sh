curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "ssrs_url": "https://reports.bradyindustries.com",
    "username": "Chris.Carson@BradyIndustries.com",
    "password": "thg.KCH3ewe!ahz!uqk",
    "domain": "",
    "report_path": "/New Reports/Sales/Central Previous Day Sales"
  }' \
  -o report.csv \
  http://localhost:8080
