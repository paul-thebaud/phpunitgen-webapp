<!DOCTYPE html>
<html lang="en" class="font-body antialiased leading-normal tracking-normal w-100 h-100">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>PhpUnitGen</title>

    <meta name="description" content="">
    <meta name="keywords" content="">

    <link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">

    @stack('style')
</head>

<body class="font-body antialiased leading-normal tracking-normal w-100 h-100">

@yield('content')

@stack('scripts')

</body>
</html>
