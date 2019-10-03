@extends('layout')

@section('title', 'PhpUnitGen Docs')

@section('body-classes', 'theme-light')

@section('content')
    <nav id="nav" class="app-nav no-badge"></nav>
    <noscript>This application needs Javascript to run.</noscript>
    <div id="app"></div>
@endsection

@push('style')
    <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css">
    <link rel="stylesheet" href="{{ mix('css/docs.css') }}">
@endpush

@push('scripts')
    <script type="text/javascript" src="{{ mix('js/docs.js') }}"></script>
    <script type="text/javascript" src="https://unpkg.com/docsify/lib/docsify.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/docsify/lib/plugins/search.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/docsify/lib/plugins/external-script.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/docsify-copy-code"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/docsify-example-panels"></script>
    <script type="text/javascript" src="https://unpkg.com/prismjs/components/prism-bash.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/prismjs/components/prism-php.min.js"></script>
@endpush
