




// Courtesy: http://stackoverflow.com/questions/28212129/google-maps-store-locator-library-with-markerclusterer








google.maps.event.addDomListener(window, 'load', function () {
    var map =  new google.maps.Map(document.getElementById('map-canvas'), {
        center :  new google.maps.LatLng(43.779982, 11.242564),
        zoom : 4,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    });
    var panelDiv = document.getElementById('panel');
    var data =  new DataSource;
    var view =  new storeLocator.View(map, data, {
        geolocation : true,
        features : data.getFeatures()
    });

     // create the markers for storelocator and cluster at same time
    // opacity of storelocator marker 0 and cluster 1. This way you see only
    // the markers of cluster. setClickable false on marker of cluster
   // and you click markers of storelocator. This way you use your panel click
   // and storelocator inwfowindow.

    var clusterMarkers = [];
    view.createMarker = function (store) {
        var markerOptions = {
            position : store.getLocation(),
            icon : store.getDetails().icon,
            Opacity : 0,
            title : store.getDetails().title,
            Filter : store.getDetails().filter
        }
        marker =  new google.maps.Marker(markerOptions);
        markercluster =  new google.maps.Marker(markerOptions);
        markercluster.setOpacity(1);
        markercluster.setClickable(false);
        clusters.addMarker(markercluster);
        clusterMarkers.push(markercluster);
        return marker;
    }

//I set maxzoom at 17 and when i open infowindow at 18. This way i have
//infowindow on the marker and not inside cluster
    clusters =  new MarkerClusterer(map, [], {
        maxZoom : 17
    });

// modded infowindow for storelocator
    var infowindow =  new google.maps.InfoWindow;
    view.getInfoWindow = function (store) {
        if (!store) {
            return infowindow;
        }
        var details = store.getDetails();
        var html = ['<div class="store"><div class="title">', details.title, '</div><div class="address">', details.address, '</div>', '<div class="hours misc">', details.phone, '</div></div>'].join('');
         infowindow.setContent($(html)[0]);
        if (map.getZoom() < "18") map.setZoom(18);
        map.panTo(store.getLocation());
        return infowindow;
    };

// i close infowindow on zoom out.
    google.maps.event.addListener(map, 'zoom_changed', function() {
        infowindow.close();
    });

     new storeLocator.Panel(panelDiv, {
        view : view,
        featureFilter : true
    });

// i use features modded with radio button on storelocator. I have a filter based on number (1,2,3,4) and i added features "all" (0) to all stores.
    var features = view.getFeatures().asList();
    $('<div id="filter-radio" />').appendTo('.storelocator-filter');
    $.each(features, function (i, o) {
        list = $('<input type="radio" class="filter" name="filter" value="' + i + '" id="filter' + (o.getDisplayName()) + '"/><label for="filter' + (o.getDisplayName()) + '">' + (o.getDisplayName()) + '</label>').appendTo('#filter-radio').change(function () {
            view.set('featureFilter',  new storeLocator.FeatureSet(features[this.value]));
            view.refreshView();

  // call toggle to change the markers on the cluster too
            toggle(this.value);
        });
    });

  //in mobile view i prefer use a select for features filter

    var features_mobile = view.getFeatures().asList();
        $('<div id="filter-select" />').prependTo('#panel');
         list = $('<select class="filter-select"/>')
        .appendTo('#filter-select').
        change(function () {
            view.set('featureFilter',
            new storeLocator.FeatureSet(features[this.selectedIndex]));
            view.refreshView();
            toggle(this.selectedIndex);
        });
    $.each(features, function (i, o) {

        list.append(new Option(o.getDisplayName()));

    });
    // toggle function for markercluster. I filter markers inside the
    // cluster array with the same value as storelocator
    function toggle(filterc) {
        var markers = [];
        for (var i = 0; i < clusterMarkers.length; i++) {
            if (filterc == '0') {
                markers.push(clusterMarkers[i]);
                clusterMarkers[i].setVisible(true);
            }
            else if (clusterMarkers[i].Filter == filterc) {
                markers.push(clusterMarkers[i]);
                clusterMarkers[i].setVisible(true);
            }
        }
        if (markers.length) {
            clusters.removeMarkers(clusterMarkers);
            clusters.addMarkers(markers);
        }
    };


});