// Load and initialize Uniqode Insights SDK
(function() {
    var script = document.createElement('script');
    script.src = 'https://q.cdn.uniqode.com/insights/staging/v1/latest/sdk.js';
    script.onload = function() {
      window.insights.init({
        clientKey: 'cl_fdfc0147-6dc7-4c9a-8727-dc430242bded'
      });
    };
    document.head.appendChild(script);
  })();