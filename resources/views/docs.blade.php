@extends('layout')

@section('title', 'PhpUnitGen Docs')

@section('content')
    <noscript>This application needs Javascript to run.</noscript>
    <div id="app"></div>
@endsection

@push('style')
    <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css">
    <link rel="stylesheet" href="{{ mix('css/docs.css') }}">
@endpush

@push('scripts')
    <script type="text/javascript">
        window.$docsify = {
            name: 'PhpUnitGen',
            loadSidebar: true,
            basePath: '/docs',
            search: 'auto',
            notFoundPage: true,
        };
    </script>
    <script type="text/javascript" src="//unpkg.com/docsify/lib/docsify.min.js"></script>
    <script type="text/javascript" src="//unpkg.com/docsify/lib/plugins/search.min.js"></script>
    <script type="text/javascript" src="//unpkg.com/prismjs/components/prism-bash.min.js"></script>
    <script type="text/javascript" src="//unpkg.com/prismjs/components/prism-php.min.js"></script>
    <script type="text/javascript" src="{{ mix('js/manifest.js') }}"></script>
    <script type="text/javascript" src="{{ mix('js/vendor.js') }}"></script>
    <script type="text/javascript" src="{{ mix('js/docs.js') }}"></script>
@endpush
