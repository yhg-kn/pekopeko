
<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('default');
});
 
// ホーム（ログインしていないと見れないよう auth middleware を適用）
Route::group(['middleware' => 'auth'], function() {
    Route::get('/home', function () {
        return view('home');
    });
});
 
Auth::routes();
// ユーザー登録
Route::post('auth/register', 'Auth\RegisterController@postRegister');
Route::get('auth/confirm/{token}', 'Auth\RegisterController@getConfirm');

Route::get('/home', 'HomeController@index')->name('home');
