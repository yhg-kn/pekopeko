{{-- resources/views/emails/confirm.blade.php --}}
 
<p>
    ようこそ、{{ $user['name'] }} さん
</p>
 
<p>
    以下のリンクをクリックしてユーザーを有効化してください。
</p>
 
<p>
    <a href="{{ url('auth/confirm', [$token]) }}">ユーザーを有効化する</a>
</p>