(function(window) {
    'use strict';

    // Methods to stub before SDK loads (matches browser.ts InsightsInstance interface)
    var METHODS = [
        'track',
        'identify',
        'getUserId',
        'set',
        'setOnce',
        'unset',
        'add',
        'append',
        'prepend',
        'preInsert',
        'postInsert',
        'remove',
        'addPlugin',
        'removePlugin',
        'processQueuedEvents'
    ];

    // Queue for storing calls before SDK loads
    var queue = [];

    // Check if SDK is already loaded
    if (window.insights && window.insights.isReady) {
        return;
    }

    // Create stub object (SDK uses window.insights)
    window.insights = window.insights || {};

    // Create stub methods that push to queue
    METHODS.forEach(function(method) {
        window.insights[method] = function() {
            queue.push({ method: method, args: Array.prototype.slice.call(arguments) });
        };
    });

    // Stub for isReady property
    Object.defineProperty(window.insights, 'isReady', {
        get: function() { return false; },
        configurable: true
    });

    // Store init config for later
    var initConfig = null;
    window.insights.init = function(config) {
        initConfig = config;
        return Promise.resolve();
    };

    // Load SDK script
    var script = document.createElement('script');
    script.src = "https://q.cdn.uniqode.com/insights/staging/v1/latest/sdk.js";
    script.crossOrigin = 'anonymous';
    script.async = true;



    script.onload = function() {
        try {
            // Initialize SDK
            window.insights.init({
                clientKey: "cl_729c1d2e-e58b-4b29-93e3-722e148e2f7f",
            }).then(function() {
                // Process queued calls after init completes
                queue.forEach(function(item) {
                    if (typeof window.insights[item.method] === 'function') {
                        window.insights[item.method].apply(window.insights, item.args);
                    }
                });
                // Clear queue
                queue.length = 0;
            }).catch(function(error) {
                console.error('Error initializing Uniqode Insights:', error);
            });

        } catch (error) {
            console.error('Error initializing Uniqode Insights:', error);
        }
    };

    script.onerror = function() {
        console.error('Failed to load Uniqode Insights SDK from:', script.src);
    };

    // Insert script into head
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(script);

})(window);
