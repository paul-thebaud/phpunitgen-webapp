<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>@yield('title')</title>

    <meta name="description" content="">
    <meta name="keywords" content="">

    @stack('style')
</head>

<body class="@yield('body-classes')">

@yield('content')

@stack('scripts')

</body>
</html>
