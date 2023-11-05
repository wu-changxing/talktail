// src/app/components/UserInfoCollector.ts

export async function collectUserInfo() {
    const browserInfo = getBrowserInfo();
    const deviceInfo = getDeviceInfo();
    const networkInfo = await getNetworkInfo();
    // const geolocation = await getGeolocation();
    const performanceMetrics = getPerformanceMetrics();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const plugins = getBrowserPlugins();
    const audioContextInfo = getAudioContextInfo();
    const webGLRendererInfo = getWebGLRendererInfo();
    const batteryInfo = await getBatteryInfo();
    const hardwareConcurrency = getHardwareConcurrency();
    return {
        browserInfo,
        deviceInfo,
        networkInfo,
        // geolocation,
        performanceMetrics,
        timeZone,
        plugins,
        batteryInfo,
        audioContextInfo,
        webGLRendererInfo,
        hardwareConcurrency,
    };
}
function getAudioContextInfo() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const context = new AudioContext();
        // Additional checks can be performed here
        return {
            sampleRate: context.sampleRate,
            // Other properties can be added
        };
    }
    return {};
}
function getHardwareConcurrency() {
    return navigator.hardwareConcurrency;
}
function getWebGLRendererInfo() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return {
            renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
            vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
            // Other WebGL information can be added
        };
    }
    return {};
}

function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let os = "Unknown OS";

    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    if (userAgent.indexOf("X11") !== -1) os = "UNIX";
    if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    if (/Android/.test(userAgent)) os = "Android";
    if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";

    return {
        userAgent,
        os,
        language: navigator.language,
        platform: navigator.platform,
        vendor: navigator.vendor,
        cookieEnabled: navigator.cookieEnabled,
    };
}

function getBatteryInfo() {
    return navigator.getBattery().then((battery) => {
        return {
            charging: battery.charging,
            level: battery.level,
            // Other properties can be added
        };
    });
}
function getBrowserPlugins() {
    const plugins = [];
    if (navigator.plugins) {
        for (let i = 0; i < navigator.plugins.length; i++) {
            plugins.push({
                name: navigator.plugins[i].name,
                description: navigator.plugins[i].description
            });
        }
    }
    return plugins;
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
