<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
    >
    <meta
            http-equiv="X-UA-Compatible"
            content="ie=edge"
    >

    <title>@yield('title')</title>

    @include('icons')
    @include('socials')

    <meta
            name="description"
            content="PhpUnitGen is a simple, powerful and modular tool to generate your PHPUnit tests skeletons. It is free and open-source."
    >
    <link
            rel="manifest"
            href="/manifest.json"
    >
    <link
            rel="preload"
            href="/fonts/SourceSansPro/SourceSansPro-Regular.woff2"
            as="font"
            type="font/woff2"
            crossorigin
    >
</head>

<body
        class="@yield('body-classes')"
        style="@yield('body-styles')"
>

@yield('content')

<div id="cookies-info"></div>

<script>
    var PHPUNITGEN_VERSIONS = @json([
        'web'  => \PhpUnitGen\WebApp\Helpers\PhpUnitGenVersions::getWebVersion(),
        'core' => \PhpUnitGen\WebApp\Helpers\PhpUnitGenVersions::getCoreVersion(),
    ]);
</script>
<script
        type="text/javascript"
        src="{{ mix('js/manifest.js') }}"
        defer
></script>
<script
        type="text/javascript"
        src="{{ mix('js/vendor.js') }}"
        defer
></script>
@stack('scripts')

</body>
</html>
