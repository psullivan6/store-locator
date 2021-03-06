(function(window){

  function initialize(){

    // =========================================================================
    // Functions
    // =========================================================================
    function parseStores(data){
      var stores = [];

      for (var i = 0, dataLength = data.length; i < dataLength; i++){
        var locationData = data[i];

        var fullAddress = '<span>' + locationData.Street + '</span><span>' + locationData.City + ', ' + locationData.State + ', ' + locationData.Zip;
        var latLng = new google.maps.LatLng(locationData.Latitude, locationData.Longitude);
        var store  = new storeLocator.Store('location_' + locationData.Location, latLng, null, {
          address: fullAddress,
          // icon: '/images/map-marker.png'
          icon: 'https://www.google.com/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/restaurant-2-medium.png?highlight=ffffff,e21d39,ffffff&color=ff000000&scale=1',
          locationID: locationData.Location
        });

        stores.push(store);
      }

      return stores;
    };

    function locationsSearch(event){
      var locationsSearchValue = document.getElementById('locations-search--input').value;

      listView.searchPosition(locationsSearchValue);
    };

    function setClusters(dataFeed){
      var markers = [];
      dataFeed.getStores(map.getBounds(), null, function(stores){
        for (var i = 0, storesLength = stores.length; i < storesLength; i++) {
          var marker = stores[i].getMarker();

          marker.setIcon('https://www.google.com/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/restaurant-2-medium.png?highlight=ffffff,e21d39,ffffff&color=ff000000&scale=1');
          markers.push(marker);
        }
      });

      var clusters = new MarkerClusterer(map, markers, {
        maxZoom: (mapZoomLevels.maximum - 1),
        styles: [{
          url: 'https://www.google.com/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png?highlight=ffffff,e21d39,ffffff&scale=2',
          width: 46,
          height: 46,
          textColor: 'white'
        }],
        gridSize: 50
      });

    };

    // =========================================================================
    // Configuration
    // =========================================================================
    var defaultCoordinates = [39.5, -105]; // USA center, slightly favoring the west coast

    var $map  = document.getElementById('locations-map');
    var $list = document.getElementById('locations-list');

    var mapStyles = [
      {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
          { "visibility" : "on" },
          { "saturation" : "35" },
          { "color"      : "#545554" }
        ]
      }, {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
          { "color"      : "#545554" },
          { "visibility" : "on" }
        ]
      }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          { "visibility" : "off" }
        ]
      }, {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
          { "visibility" : "simplified" }
        ]
      }, {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
          { "visibility" : "simplified" }
        ]
      }, {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
          { "visibility" : "simplified" }
        ]
      }, {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
          { "visibility" : "simplified" },
          { "saturation" : "-100" },
          { "lightness"  : "30" }
        ]
      }, {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          { "visibility": "on" }
        ]
      }, {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
          { "visibility" : "on" },
          { "color"      : "#ffffff" }
        ]
      }, {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
          { "visibility" : "off" }
        ]
      }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          { "visibility" : "simplified" },
          { "gamma"      : "0.00" },
          { "lightness"  : "74" }
        ]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          { "color" : "#ffffff" }
        ]
      }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          { "visibility" : "off" }
        ]
      }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          { "visibility" : "simplified" },
          { "color"      : "#e21737" },
          { "saturation" : "-5" },
          { "lightness"  : "60" },
          { "gamma"      : "1.5" }
        ]
      }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          { "visibility" : "off" }
        ]
      }, {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
          { "visibility" : "on" }
        ]
      }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          { "visibility" : "on" },
          { "color"      : "#545554" }
        ]
      }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          { "visibility" : "on" },
          { "weight"     : "0.66" }
        ]
      }, {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
          { "visibility" : "simplified" }
        ]
      }, {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
          { "visibility" : "off" }
        ]
      }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          { "color"     : "#ff0000" },
          { "lightness" : "80" }]
      }, {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          { "color" : "#e5e5e5" }
        ]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          { "color" : "#c1c1c1" }
        ]
      }, {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
          { "visibility": "off" }
        ]
      }
    ];

    var mapZoomLevels = {
      minimum: 4,
      maximum: 11
    };

    var map = new google.maps.Map($map, {
      center: new google.maps.LatLng(defaultCoordinates[0], defaultCoordinates[1]),
      zoom: mapZoomLevels.minimum,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: false,
      styles: mapStyles
    });


    // =========================================================================
    // Locations Data Feed
    // =========================================================================
    var locationsDataFeed = new storeLocator.StaticDataFeed();
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: 'https://api-jackinthebox.herokuapp.com/locations',
      success: function(json){
        var stores = parseStores(json);
        locationsDataFeed.setStores(stores);
        // setClusters(locationsDataFeed);
      }
    });

    // =========================================================================
    // Views
    // =========================================================================
    var mapView = new storeLocator.View(map, locationsDataFeed, {
      geolocation : true,
      updateOnPan : true
      // features: data.getFeatures()
    });

    var listView = new storeLocator.Panel($list, {
      view           : mapView,
      locationSearchContainer: $('.locationSearch'),
      locationSearch : true,
      locationListCount: 20
    });

    // =========================================================================
    // Marker Clustering
    // =========================================================================
    var clusters = new MarkerClusterer(map, [], {
      maxZoom: (mapZoomLevels.maximum - 1),
      styles: [{
        url: 'https://www.google.com/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png?highlight=ffffff,e21d39,ffffff&scale=2',
        width: 46,
        height: 46,
        textColor: 'white'
      }],
      gridSize: 50
    });

    var clusterMarkersList = [];
    mapView.createMarker = function (store) {
      var markerOptions = {
        position : store.getLocation(),
        icon : store.getDetails().icon,
        locationID: store.getDetails().locationID,
        Opacity : 0,
        title : store.getDetails().title
      };

      marker = new google.maps.Marker(markerOptions);

      markercluster = new google.maps.Marker(markerOptions);
      markercluster.setOpacity(1);
      markercluster.setClickable(false);
      clusters.addMarker(markercluster);

      return marker;
    };

    // =========================================================================
    // Event Listeners
    // =========================================================================
    mapView.addListener('load', function(){
      console.log('THIS IS CALLED AFTER THE MAP CENTERS ON THE GEOLOCATION');
    });

    // Re-center and zoom the map when a location has been selected
    mapView.addListener('selectedStore_changed', function(store){
      if (store !== null) {
        var position = store.getLocation();
        map.panTo(position);

        var marker = store.getMarker();

        // [TODO] Figure out how to unset this icon when it's no longer the
        // selected store. Also, make it the correct icon


        var clusterMarkers = clusters.getMarkers();
        for (var i = 0, clusterMarkersLength = clusterMarkers.length; i < clusterMarkersLength; i++) {
          var clusterMarker = clusterMarkers[i];

          if (clusterMarker.locationID === marker.locationID) {
            clusterMarker.setIcon('https://www.google.com/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/restaurant-2-medium.png?highlight=ffffff,00ffff,ffffff&color=ff000000&scale=1');

            // [TODO] Is a break; the right method? Should we use a return?
            // basically once the correct marker is found, nothing else is
            // needed
            break;
          }
        }

        // Only zoom if it's a zoom in; otherwise just do the pan
        if (map.getZoom() < mapZoomLevels.maximum) {
          map.setZoom(mapZoomLevels.maximum);
        }
      }
    });
  };

  window.onload = initialize;

})(window);