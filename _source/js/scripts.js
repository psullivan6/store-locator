(function(window){

  window.onload = function(){

    // =========================================================================
    // Functions
    // =========================================================================
    function parseStores(data){
      var stores = [];

      for (var i = 0, dataLength = data.length; i < dataLength; i++){
        var locationData = data[i];

        var latLng = new google.maps.LatLng(locationData.latitude, locationData.longitude);
        var store  = new storeLocator.Store('location_' + locationData.locationID, latLng, null);

        stores.push(store);
      }

      return stores;
    };

    function locationsSearch(event){
      var locationsSearchValue = document.getElementById('locations-search--input').value;
      listView.searchPosition(locationsSearchValue);
    };

    // =========================================================================
    // Configuration Variables
    // =========================================================================
    var defaultCoordinates = [39.5, -105]; // USA center, slightly favoring the west coast

    // 37.0902, 95.7129

    var $map  = document.getElementById('locations-map');
    var $list = document.getElementById('locations-list');

    var map = new google.maps.Map($map, {
      center: new google.maps.LatLng(defaultCoordinates[0], defaultCoordinates[1]),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // var data = new MedicareDataSource;


    var data = new storeLocator.StaticDataFeed();
    jQuery.getJSON('/data/locations.json', function(json) {
      var stores = parseStores(json);
      data.setStores(stores);
    });

    var mapView = new storeLocator.View(map, data, {
      geolocation: false,
      updateOnPan: true
      // features: data.getFeatures()
    });

    var listView = new storeLocator.Panel($list, {
      view: mapView
    });

    document.getElementById('locations-search--submit').addEventListener('click', locationsSearch, false);

  };

})(window)