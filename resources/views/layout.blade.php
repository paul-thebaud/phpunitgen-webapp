<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>@yield('title')</title>

    <meta name="description"
          content="PhpUnitGen is a simple, powerful and modular tool to generate your PHPUnit tests skeletons. It is free and open-source.">

    <link rel="preload" href="{{ mix('css/vendor.css') }}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript>
        <link rel="stylesheet" href="{{ mix('css/vendor.css') }}">
    </noscript>
    @stack('style')
</head>

<body class="@yield('body-classes')">

@yield('content')

<script type="text/javascript" src="{{ mix('js/manifest.js') }}" defer></script>
<script type="text/javascript" src="{{ mix('js/vendor.js') }}" defer></script>
@stack('scripts')

</body>
</html>
