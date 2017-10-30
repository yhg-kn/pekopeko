var map;
var marker = [];
var infoWindow = [];

// マーカーを立てる場所名・緯度・経度・時間等
// 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday

var markerData = [
{
    // day:4,
    // beginhour:"10",
    // beginminute:"00",
    // endhour:"15",
    // endminute:"30",
    // name: 'たこ焼き屋',
    // lat: 35.6951212,
    // lng: 139.76610649999998,
    day:4,
    beginhour:"10",
    beginminute:"00",
    endhour:"15",
    endminute:"30",
    name: 'たこ焼き屋',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.6951212,
    lng: 139.76610649999998,
  }, {
    day:4,
    beginhour:"10",
    beginminute:"00",
    endhour:"16",
    endminute:"30",
    name: '焼き芋屋',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.69496,
    lng: 139.76746000000003
  }, {
    day:4,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"15",
    name: 'キーマカレー屋',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.6993529,
    lng: 139.76526949999993
  }, {
    day:4,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"20",
    name: '果物屋',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.695932,
    lng: 139.75762699999996
  }, {
    day:4,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"25",
    name: '立ち飲み屋',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.696932,
    lng: 139.76543200000003
  }, {
    day:0,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"25",
    name: 'アジアンランチ',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.676815,
    lng: 139.706854
  }, {
    day:1,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"25",
    name: 'アジアンランチ',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.676815,
    lng: 139.706854
  }, {
    day:2,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"25",
    name: 'アジアンランチ',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.676815,
    lng: 139.706854
  }, {
    day:3,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"25",
    name: 'アジアンランチ',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.676815,
    lng: 139.706854
  }, {
    day:4,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"25",
    name: 'アジアンランチ',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.676815,
    lng: 139.706854
  }, {
    day:5,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"25",
    name: 'アジアンランチ',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.676815,
    lng: 139.706854
  }, {
    day:6,
    beginhour:"10",
    beginminute:"00",
    endhour:"18",
    endminute:"25",
    name: 'アジアンランチ',
    url: '/detail/store01/',
    thumbs:'/assets/img/map_thumbs/img_dummy01.jpg',
    lat: 35.676815,
    lng: 139.706854
  }
];

// 現在地取得処理
function initMap() {
  // Geolocation APIに対応している
  if (navigator.geolocation) {
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(
      // 取得成功した場合
      function(position) {
        // 緯度・経度を変数に格納
        var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // 現在地表示用
        var mapOptions = {
          gestureHandling: 'greedy', // １本指でスクロールできるようにする
          zoom : 16,           // 拡大倍率
          center : mapLatLng,  // 緯度・経度
          zoomControl: false,  //余分な要素を一通り削除
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
        };

        // マップオブジェクト作成
        var map = new google.maps.Map(
          document.getElementById("map"), // マップを表示する要素
          mapOptions         // マップオプション
        );

        //現在地アイコン
        var markerImgNow = {
          url: '/assets/img/cmn/icn_gmap_now.png',
          scaledSize : new google.maps.Size(24, 82)
        };

        //お店アイコン
        var markerImgStore = {
          url: '/assets/img/cmn/icn_gmap_store.png',
          scaledSize : new google.maps.Size(38, 56)
        };

        //　マップにマーカーを表示する
        var marker = new google.maps.Marker({
          map : map,             // 対象の地図オブジェクト
          position : mapLatLng,  // 緯度・経度
          icon: markerImgNow
        });

        var mapStyle = [{
          'stylers': [
            { 'hue': '#ffe587' },
            { 'saturation': 60 }
          ]}
        ];

        var mapType = new google.maps.StyledMapType(mapStyle);
          map.mapTypes.set('GrayScaleMap', mapType);
          map.setMapTypeId('GrayScaleMap');

        //クライアント側の曜日の取得
        var d = new Date();
        var weekday = d.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
        //時間で表示切替の場合
        // var daytime = ( ("0"+d.getHours()).slice(-2) + '' ) + ( ("0"+d.getMinutes()).slice(-2) + '' ); //それぞれの数値を0詰めし、文字列に
        console.log(weekday);

        // マーカー毎の処理
        for (var i = 0; i < markerData.length; i++) {

          //時間で表示切替の場合
          // if( markerData[i]["day"] === weekday && markerData[i]["beginhour"] + markerData[i]["beginminute"] <= daytime && markerData[i]["endhour"] + markerData[i]["endminute"] >= daytime){
			if( markerData[i]["day"] === weekday ){

            markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
            marker[i] = new google.maps.Marker({ // マーカーの追加
              position: markerLatLng, // マーカーを立てる位置を指定
              map: map, // マーカーを立てる地図を指定
              icon:markerImgStore
            });
            infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
              content: '<div class="map_info"><a target="_blank" href="' + markerData[i]['url'] + '">' + markerData[i]['name'] + '<p>' + markerData[i]['beginhour'] + ':' + markerData[i]['beginminute'] + '～' + markerData[i]['endhour'] + ':' + markerData[i]['endminute'] + '</p><p><img src=" ' + markerData[i]['thumbs'] + '" alt="" width="100"/></p></a></div>' // 吹き出しに表示する内容
            });
            markerEvent(i); // マーカーにクリックイベントを追加
          }

        };

        marker[0].setOptions({
          icon: {
            url: markerData[0]['icon']// マーカーの画像を変更
          }
        });

        function markerEvent(i) {
          marker[i].addListener('click', function() { // マーカーをクリックしたとき
            infoWindow[i].open(map, marker[i]); // 吹き出しの表示
          });
        }

      },
      // 取得失敗した場合
      function(error) {
        // エラーメッセージを表示
        switch(error.code) {
          case 1: // PERMISSION_DENIED
            alert("位置情報の利用が許可されていません");
            break;
          case 2: // POSITION_UNAVAILABLE
            alert("現在位置が取得できませんでした");
            break;
          case 3: // TIMEOUT
            alert("タイムアウトになりました");
            break;
          default:
            alert("その他のエラー(エラーコード:"+error.code+")");
            break;
        }
      }
    );
  // Geolocation APIに対応していない
  } else {
    alert("この端末では位置情報が取得できません");
  }
}