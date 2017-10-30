<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Contracts\Config\Repository as Config;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(Mailer $mailer, array $data, $app_key)
    {
        $user = new User;
 
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = bcrypt($data['password']);
 
        $user->makeConfirmationToken($app_key);
        $user->confirmation_sent_at = Carbon::now();
 
        $user->save();
 
        $this->sendConfirmMail($mailer, $user);
 
        return $user;
    }

    /**
     * 確認メールの送信
     *
     * @param Mailer $mailer
     * @param User $user
     */
    private function sendConfirmMail(Mailer $mailer, User $user)
    {
        $mailer->send(
            'emails.confirm',
            ['user' => $user, 'token' => $user->confirmation_token],
            function($message) use ($user) {
                $message->to($user->email, $user->name)->subject('ユーザー登録確認');
            }
        );
    }

    /**
     * ユーザー登録アクション
     * バリデーションチェックを行い、ユーザーを作成する
     *
     * @param Request $request
     * @param Mailer $mailer
     * @param Config $config
     * @return \Illuminate\Http\RedirectResponse
     */
    public function postRegister(Request $request, Mailer $mailer, Config $config)
    {
        $validator = $this->validator($request->all());
 
        if ($validator->fails()) {
            $this->throwValidationException(
                $request, $validator
            );
        }
 
        $this->create($mailer, $request->all(), $config->get('app.key'));
 
        \Session::flash('flash_message', 'ユーザー登録確認メールを送りました。');
 
        return redirect('auth/login');
    }
 
    /**
     * ユーザーを確認済にする
     *
     * @param $token
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getConfirm($token) {
        $user = User::where('confirmation_token', '=', $token)->first();
        if (! $user) {
            \Session::flash('flash_message', '無効なトークンです。');
            return redirect('auth/login');
        }
 
        $user->confirm();
        $user->save();
 
        \Session::flash('flash_message', 'ユーザー登録が完了しました。ログインしてください。');
        return redirect('auth/login');
    }
}
