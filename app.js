document.addEventListener("DOMContentLoaded", function () {
    const adblockNotice = document.getElementById('adblock-notice');

    // Function to detect adblocker
    function detectAdblock() {
        const testAd = document.createElement('div');
        testAd.className = 'ad-banner';
        testAd.style.display = 'none';
        document.body.appendChild(testAd);
        const isAdblockActive = testAd.offsetHeight === 0;
        document.body.removeChild(testAd);

        if (isAdblockActive) {
            adblockNotice.style.display = 'block';
            logUserAction('Adblocker detected');
        } else {
            logUserAction('No adblocker detected');
        }
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
