const https = require('https');

const TOKEN = '8709482636:AAGVoNrYOD0-ZHRBiv0Mcdy2wsK_6aICD98';
const APP_URL = process.argv[2];

if (!APP_URL) {
    console.log('\n❌ Error: Web App URL is required!');
    console.log('Usage: node setup_bot.js <YOUR_VERCEL_APP_URL>');
    console.log('Example: node setup_bot.js https://my-safe-app.vercel.app\n');
    process.exit(1);
}

const data = JSON.stringify({
    menu_button: {
        type: 'web_app',
        text: 'SV Tools',
        web_app: {
            url: APP_URL
        }
    }
});

const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${TOKEN}/setChatMenuButton`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
        const response = JSON.parse(body);
        if (response.ok) {
            console.log('\n✅ Success! The bot menu button has been updated.');
            console.log(`Open your bot @YOUR_BOT_NAME on Telegram, and you will see the "SV Tools" button in the bottom left corner next to the input field.\n`);
        } else {
            console.log('\n❌ Failed to update the bot menu button.');
            console.log(response);
        }
    });
});

req.on('error', (e) => {
    console.error('\n❌ Request Error:', e.message);
});

req.write(data);
req.end();
