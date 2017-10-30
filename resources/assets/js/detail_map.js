function g_Map() {
  var latLng = new google.maps.LatLng(35.676815, 139.706854);
  var map = new google.maps.Map(
    document.getElementById('g-map'),
    {
      gestureHandling: 'greedy',
      zoom: 18,
      center: latLng,
      zoomControl: false,  //余分な要素を一通り削除
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }
  );

    //お店アイコン
    var markerImg = {
      url: '/assets/img/cmn/icn_gmap_store.png',
      scaledSize : new google.maps.Size(38, 56)
    };


  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: markerImg
  });

  //地図色
  var mapStyle = [{
    'stylers': [
      { 'hue': '#ffe587' },
      { 'saturation': 60 }
    ]}
  ];

  var mapType = new google.maps.StyledMapType(mapStyle);
    map.mapTypes.set('GrayScaleMap', mapType);
    map.setMapTypeId('GrayScaleMap');

}
g_Map();