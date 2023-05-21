This is the backend project for `Net Worth Calculator`
## Installation and Runing
Run this commands:
```bash
npm install && node index.js
```
For unit tests after installation run:
```bash
npm test
```
### API Endpoint
The main endpoint for the API is:

https://localhost:3100/calculate-net-worth

### Parameters

The API expects a JSON object with the following parameters:

```json
{
    "assets": [{"amount": 1},{"amount": 1}...],
    "liabilities": [{"amount": 1},{"amount": 1}...],
    "currency": "USD"
}
```
- assets (Array): Represents an object array with all the assets to include.
- liabilities (Array): Represents an object array with all the liabilities to include.
- currency (string): Represents the currency used.

### Example Request
You can send a POST request to the endpoint as follows with Javascript:
```javascript
const url = 'https://localhost:3100/calculate-net-worth';
const data = {
    "currency": "USD",
    "assets": [
        {"amount": 500},
        {"amount": 700},
        {"amount": 800},
        {"amount": 150}
    ],
    "liabilities": [
        {"amount": 5000},
        {"amount": 2500}
    ]
}

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log('Response:', result);
    // Handle the response data
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle any errors
  });
 ```
 
 You will have this response:
 
 ```json
{
    "assets": "6000.00",
    "liabilities": "6000.00",
    "netWorth": "6000.00",
    "conversion": "5000.00",
    "currency": "USD"
}
```
- assets (number): Represents the summary of assets.
- liabilities (number): Represents the summary of liabilities.
- netWorth (number): Represents the net worth value.
- conversion (number): Represents the conversion value.
- currency (string): Represents the currency used.