@extends('layout')

@section('title', 'PhpUnitGen Docs')

@section('body-classes', 'theme-light')
@section('body-styles', 'height: 100%')

@section('content')
    <noscript>This application needs Javascript to run.</noscript>
    <div id="docs-nav"></div>
    <div
            id="docs"
            style="height: 100%; display: flex; align-items: center; justify-content: center;"
    >
        <div>
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
