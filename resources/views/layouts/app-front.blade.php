<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
<body class="page-index">

<!-- loading -->
<div class="loading">
    <div class="loading-box">
        <p class="loading-box-bar"></p>
        <div class="loading-box_item"></div>
    </div>
</div>
<!-- loading -->

<!-- modal -->
<div class="modal">
    <div class="modal-box">
        <div class="modal-inner">
            <dl class="modal-head">
            </dl>
            <p class="modal-close">
            </p>
        </div>
    </div>
</div>
<!-- modal -->

<!-- wrap -->
<div class="wrap">

<!-- header -->
<header>
    <div class="header">
        <div class="header-inr">
        <a class="header-menu" href="#">
            <span></span>
            <span></span>
            <span></span>
        </a>
        </div><!-- /.header-inr -->

    </div><!-- /.header -->
</header>
<!-- header -->
@yield('content')
<footer>
    <div class="footer">
        <div class="footer-inr">
            <p class="footer-inr-bnr"><img src="/assets/img/cmn/img_wanted.png" alt="" width="100%"></p>
            <p class="footer-inr-copyright">Copyright &copy; 2017 PekoPeko. All Rights Reserved.</p>
        </div><!-- /.footer -->
    </div><!-- /.footer -->
</footer>

</div><!-- /.wrap -->

<!-- JS -->

<script src="/js/bundle.js"></script>
<!-- GA -->

</body>
</html>
