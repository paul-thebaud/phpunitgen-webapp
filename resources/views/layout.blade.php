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
    <script>
        // Check that service workers are supported
        if ("serviceWorker" in navigator) {
            // Use the window load event to keep the page load performant
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/service-worker.js");
            });
        }
    </script>
</head>

<body class="@yield('body-classes')">

@yield('content')

<div id="cookies-info"></div>

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
