const webPush = require("web-push");

// keys are generated using the web-push library
const vapidKeys = {
    publicKey:
        "BAaNsK2FZh53fHeROkZ6LCdb8smoYs8yFeVvrgqTqicXcJHwsMyWbTlgRKxcRA2KEl-aNSsliq-c2MQy27HB3cg",
    privateKey: "xySarl5RgfPn1-xdbl1UPX54AezD8-DNaI7T3XeAzcU",
};

// any email is valid
webPush.setVapidDetails(
    "mailto:your-email@example.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const sendNotification = async () => {
    const payload = JSON.stringify({
        title: "Order Received",
        message: "You have a new order.",
        // send a url to the order page
        url: "https://aamarstore.com/my-store/list-orders",
    });

    // subscriptions.forEach(async (subscription: any) => {
    try {
        await webPush.sendNotification(
            // when an order comes, you will send the payload to the endpoint
            // this endpoint you will fetch from the database
            {
                endpoint:
                    "https://fcm.googleapis.com/fcm/send/flJTFP_mzVE:APA91bFNpgTo0KQ8gHRZwkdOBlX-1qiVwRzdKPXH7i1JpdeJdRvxQsPG275f23qdgewjv6nhuTykiSG6eDIlz5TVcrX1bEmhJjOYuRBKyzAFWMewoLPG7qAyYhpp5CxaDEWw8WhdrDQ9",
                expirationTime: null,
                keys: {
                    p256dh: "BETEPytegDKaVeFS7ziUoRIsEfE5rni6KTJSKlYIotoTtig_Ki8eBLOe6a8ZDxPBpHKqKPk75PX2MC9Rni9goh4",
                    auth: "n2uTs3tp2Wndc5glV53SdA",
                },
            },
            payload
        );
    } catch (error) {
        console.error("Error sending push notification:", error);
    }
    // });

    console.log("Push notification sent!");
};

sendNotification();
