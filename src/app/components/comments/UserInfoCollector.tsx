// src/app/comments/UserInfoCollector.ts

export async function collectUserInfo() {
    const browserInfo = getBrowserInfo();
    const deviceInfo = getDeviceInfo();
    const networkInfo = await getNetworkInfo();
    // const geolocation = await getGeolocation();
    const performanceMetrics = getPerformanceMetrics();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
        browserInfo,
        deviceInfo,
        networkInfo,
        // geolocation,
        performanceMetrics,
        timeZone,
    };
}

function getBrowserInfo() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        vendor: navigator.vendor,
        cookieEnabled: navigator.cookieEnabled,
    };
}

function getDeviceInfo() {
    return {
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        colorDepth: window.screen.colorDepth,
        pixelDepth: window.screen.pixelDepth,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        deviceMemory: navigator.deviceMemory || 'Unknown', // Not all browsers support this
    };
}

async function getNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection) {
        return {
            effectiveType: 'unknown',
            downlink: 'unknown',
            rtt: 'unknown',
            saveData: 'unknown',
        };
    }

    return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
    };
}


// async function getGeolocation() {
//     return new Promise(resolve => {
//         if (!navigator.geolocation) {
//             resolve({ error: "Geolocation not supported" });
//             return;
//         }
//
//         navigator.geolocation.getCurrentPosition((position) => {
//             resolve({
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//             });
//         }, (error) => {
//             resolve({ error: error.message });
//         });
//     });
// }
//
function getPerformanceMetrics() {
    return {
        navigationStart: performance.timing.navigationStart,
        loadEventEnd: performance.timing.loadEventEnd,
        domContentLoadedEventEnd: performance.timing.domContentLoadedEventEnd,
        // You can add more performance metrics here
    };
}

// Add additional functions as needed
