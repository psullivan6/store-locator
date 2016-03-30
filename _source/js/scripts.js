(function(window){

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

  google.maps.event.addDomListener(window, 'load', function() {
    var $map  = document.getElementById('locations-map');
    var $list = document.getElementById('locations-list');

    var map = new google.maps.Map($map, {
      center: new google.maps.LatLng(32.9, -117.1),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // var data = new MedicareDataSource;


    var data = new storeLocator.StaticDataFeed();
    jQuery.getJSON('/data/locations.json', function(json) {
      var stores = parseStores(json);
      data.setStores(stores);
    });

    var view = new storeLocator.View(map, data, {
      geolocation: false
      // features: data.getFeatures()
    });

    new storeLocator.Panel($list, {
      view: view
    });
  });

})(window)