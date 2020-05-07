@extends('layout')

@section('title', 'PhpUnitGen Docs')

@section('body-classes', 'theme-light')

@section('content')
    <noscript>This application needs Javascript to run.</noscript>
    <div id="docs-nav"></div>
    <div id="docs">
        <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
            Documentation is loading...
        </div>
    </div>
@endsection

@push('scripts')
    <script
            type="text/javascript"
            src="{{ mix('js/docs.js') }}"
            defer
    ></script>
@endpush
