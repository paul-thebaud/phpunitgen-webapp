@extends('layout')

@section('title', 'PhpUnitGen Docs')

@section('body-classes', 'theme-light')

@section('content')
    <div id="docs-nav"></div>
    <noscript>This application needs Javascript to run.</noscript>
    <div id="docs"></div>
@endsection

@push('style')
    <!--
    <link rel="stylesheet" href="https://unpkg.com/docsify/lib/themes/vue.css">
    -->
    <link rel="stylesheet" href="{{ mix('css/docs.css') }}">
@endpush

@push('scripts')
    <script type="text/javascript" src="{{ mix('js/docs.js') }}" defer></script>
    <!--
    <script type="text/javascript" src="https://unpkg.com/docsify/lib/docsify.min.js" defer></script>
    <script type="text/javascript" src="https://unpkg.com/docsify/lib/plugins/external-script.min.js" defer></script>
    <script type="text/javascript" src="https://unpkg.com/docsify/lib/plugins/search.min.js" defer></script>
    <script type="text/javascript" src="https://unpkg.com/docsify-copy-code" defer></script>
    <script type="text/javascript" src="https://unpkg.com/prismjs/components/prism-bash.min.js" defer></script>
    <script type="text/javascript" src="https://unpkg.com/prismjs/components/prism-php.min.js" defer></script>
    -->
@endpush
