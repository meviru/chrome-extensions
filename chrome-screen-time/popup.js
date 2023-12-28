document.addEventListener('DOMContentLoaded', function () {
    chrome.history.search({ text: '', startTime: 0, maxResults: 10000 }, function (historyItems) {
      var productivityContainer = document.getElementById('productivity-container');
      var productivityText = document.getElementById('productivity-text');
  
      var categorizedWebsites = categorizeWebsites(historyItems);
      var productivityScore = calculateProductivity(categorizedWebsites);
  
      productivityText.textContent = "Productivity Score: " + productivityScore;
    });
  
    function categorizeWebsites(historyItems) {
      var categorizedWebsites = {
        'work': 0,
        'social': 0,
        'entertainment': 0,
        'other': 0
      };
  
      historyItems.forEach(function (item) {
        var url = new URL(item.url);
        var hostname = url.hostname.toLowerCase();
  
        if (hostname.includes('work-related-domain')) {
          categorizedWebsites['work']++;
        } else if (hostname.includes('social-media-domain')) {
          categorizedWebsites['social']++;
        } else if (hostname.includes('entertainment-domain')) {
          categorizedWebsites['entertainment']++;
        } else {
          categorizedWebsites['other']++;
        }
      });
  
      return categorizedWebsites;
    }
  
    function calculateProductivity(categorizedWebsites) {
      // You can customize the productivity calculation based on the website categories
      // This is a simple example - you might want to use a more sophisticated algorithm
      var workWeight = 2; // Adjust the weights based on the importance of each category
      var socialWeight = 1;
      var entertainmentWeight = 0.5;
      var otherWeight = 0.2;
  
      var productivityScore =
        workWeight * categorizedWebsites['work'] +
        socialWeight * categorizedWebsites['social'] +
        entertainmentWeight * categorizedWebsites['entertainment'] +
        otherWeight * categorizedWebsites['other'];
  
      return Math.round(productivityScore);
    }
  });
  