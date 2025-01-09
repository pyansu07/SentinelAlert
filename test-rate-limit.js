const axios = require('axios');

async function sendRequests() {
    const requests = [];
    for (let i = 0; i < 600; i++) {
        requests.push(
            axios.post('http://localhost:3000/api/submit',
                { data: 'test' },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer wrong-token'
                    }
                }
            ).catch(err => console.log(`Request ${i} failed: ${err.response?.status}`))
        );
    }

    await Promise.all(requests);
}

sendRequests(); 