#!/bin/bash

# Define number of registrations to send
num_registrations=10

# Loop to send multiple registration requests
for ((i=1; i<=num_registrations; i++))
do
  # Generate a random email using uuidgen
  random_email="user$(uuidgen)@example.com"
  
  # Make the curl request and capture response body
  response=$(curl -s -w "%{http_code}" -o response.txt 'https://events.hesedadvocates.com/api/auth/register' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Accept-Language: en-US,en;q=0.9' \
    -H 'Connection: keep-alive' \
    -H 'Content-Type: application/json' \
    -H 'Origin: https://events.hesedadvocates.com' \
    -H 'Referer: https://events.hesedadvocates.com/signup' \
    -H 'Sec-Fetch-Dest: empty' \
    -H 'Sec-Fetch-Mode: cors' \
    -H 'Sec-Fetch-Site: same-origin' \
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
    --data-raw '{"firstName":"test","lastName":"test","email":"'${random_email}'","password":"4SZ9BsYYf7aKcXz"}')

  # Get the HTTP status code
  http_code=$(echo "$response" | tail -n1)
  response_body=$(cat response.txt)

  # Check if the request was successful (HTTP code 200)
  if [[ "$http_code" == "200" ]]; then
    echo "Registration successful for email: $random_email"
  else
    echo "Registration failed for email: $random_email"
    echo "HTTP Status Code: $http_code"
    echo "Response Body: $response_body"
  fi

  # Optional: Sleep between requests to avoid rate-limiting or blocking
  sleep 2
done
