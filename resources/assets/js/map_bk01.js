var map;
var marker = [];
var infoWindow = [];

// マーカーを立てる場所名・緯度・経度
// サンプルでは水曜日に表示されるようになっている。
// 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday

var markerData = [
{
    day:3,
    beginhour:"10",
    beginminute:"00",
    endhour:"15",
    endminute:"30",
    name: '小川町駅',
    lat: 35.6951212,
    lng: 139.76610649999998,
  }, {
    day:3,
    beginhour:"10",
    beginminute:"00",
    endhour:"16",
    endminute:"30",
    name: '淡路町駅',
    lat: 35.69496,
    lng: 139.76746000000003
  }, {
    day:3,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"15",
    name: '御茶ノ水駅',
    lat: 35.6993529,
    lng: 139.76526949999993
  }, {
    day:3,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"20",
    name: '神保町駅',
    lat: 35.695932,
    lng: 139.75762699999996
  }, {
    day:3,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"25",
    name: '新御茶ノ水駅',
    lat: 35.696932,
    lng: 139.76543200000003
  }
];

function initMap() {

  //クライアント側の曜日の取得

  var d = new Date();
  var weekday = d.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  var daytime = ( ("0"+d.getHours()).slice(-2) + '' ) + ( ("0"+d.getMinutes()).slice(-2) + '' ); //それぞれの数値を0詰めし、文字列に
  console.log(daytime);

  // 地図の作成
  var mapLatLng = new google.maps.LatLng({lat: markerData[0]['lat'], lng: markerData[0]['lng']}); // 緯度経度のデータ作成
  map = new google.maps.Map(document.getElementById('map'), { // #mapに地図を埋め込む
    center: mapLatLng, // 地図の中心を指定
    zoom: 15 // 地図のズームを指定
  });

  // マーカー毎の処理
  for (var i = 0; i < markerData.length; i++) {

    if( markerData[i]["day"] === weekday && markerData[i]["beginhour"] + markerData[i]["beginminute"] <= daytime && markerData[i]["endhour"] + markerData[i]["endminute"] >= daytime){

      markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
      marker[i] = new google.maps.Marker({ // マーカーの追加
        position: markerLatLng, // マーカーを立てる位置を指定
        map: map // マーカーを立てる地図を指定
      });
      infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
        content: '<div class="map">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
      });
      markerEvent(i); // マーカーにクリックイベントを追加
    }

  };

  // marker[0].setOptions({
  //   icon: {
  //     url: markerData[0]['icon']// マーカーの画像を変更
  //   }
  // });

}

// マーカーにクリックイベントを追加
function markerEvent(i) {
  marker[i].addListener('click', function() { // マーカーをクリックしたとき
    infoWindow[i].open(map, marker[i]); // 吹き出しの表示
  });
}