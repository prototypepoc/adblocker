document.addEventListener("DOMContentLoaded", function () {
    const adblockNotice = document.getElementById('adblock-notice');

    // Function to detect adblocker
    function detectAdblock() {
        // Try to load a known ad URL
        const testAd = document.createElement('script');
        testAd.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        testAd.type = 'text/javascript';
        testAd.async = true;

        testAd.onerror = function () {
            // Adblock detected
            adblockNotice.style.display = 'block';
            logUserAction('Adblocker detected');
        };

        testAd.onload = function () {
            // No Adblock detected
            logUserAction('No adblocker detected');
        };

        document.body.appendChild(testAd);
    }

    // Function to log user action
    function logUserAction(action) {
        const actions = JSON.parse(localStorage.getItem('userActions')) || [];
        actions.push({ action, timestamp: new Date().toISOString() });
        localStorage.setItem('userActions', JSON.stringify(actions));
    }

    // Get browser details and log them
    function logBrowserDetails() {
        const browserDetails = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
        };
        logUserAction(`Browser details: ${JSON.stringify(browserDetails)}`);
    }

    // Check adblocker and log browser details
    detectAdblock();
    logBrowserDetails();
});
