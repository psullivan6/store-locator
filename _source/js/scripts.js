function initializeMap(){
  console.log('MAP SCRIPTS ARE DONE LOADING');

  window.onload = function(){

    // =========================================================================
    // Functions
    // =========================================================================
    function parseStores(data){
      var stores = [];

      for (var i = 0, dataLength = data.length; i < dataLength; i++){
        var locationData = data[i];

        // var addressArray = [locationData.city, locationData.state, locationData.zip];
        var fullAddress = '<span>' + locationData.address + '</span><span>' + locationData.city + ',' + locationData.state + ',' + locationData.zip;

        console.log('fullAddress', fullAddress);

        var latLng = new google.maps.LatLng(locationData.latitude, locationData.longitude);
        var store  = new storeLocator.Store('location_' + locationData.locationID, latLng, null, {
          address: fullAddress
        });

        stores.push(store);
      }

      return stores;
    };

    function locationsSearch(event){
      var locationsSearchValue = document.getElementById('locations-search--input').value;
      listView.searchPosition(locationsSearchValue);
    };

    // =========================================================================
    // Configuration
    // =========================================================================
    var defaultCoordinates = [39.5, -105]; // USA center, slightly favoring the west coast

    var $map  = document.getElementById('locations-map');
    var $list = document.getElementById('locations-list');

    var map = new google.maps.Map($map, {
      center: new google.maps.LatLng(defaultCoordinates[0], defaultCoordinates[1]),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // =========================================================================
    // Data
    // =========================================================================
    var data = new storeLocator.StaticDataFeed();
    jQuery.getJSON('/data/locations.json', function(json) {
      var stores = parseStores(json);
      data.setStores(stores);
    });

    // =========================================================================
    // Views
    // =========================================================================
    var mapView = new storeLocator.View(map, data, {
      geolocation : false,
      updateOnPan : true
      // features: data.getFeatures()
    });

    var listView = new storeLocator.Panel($list, {
      view           : mapView,
      // locationSearch : false  // THIS MAKES THE ENTIRE SEARCH FUNCTIONALITY FAIL, INCLUDING THE PRIMARY SECTION SEARCH
    });

    // =========================================================================
    // Event Listeners
    // =========================================================================
    document.getElementById('locations-search--submit').addEventListener('click', locationsSearch, false);

  };
};