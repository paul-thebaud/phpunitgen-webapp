@extends('layout')

@section('title', 'PhpUnitGen')

@section('body-classes', 'w-100 h-100 theme-light')

@section('content')
    <noscript>This application needs Javascript to run.</noscript>
    <div id="app">
        <div class="h-100 d-flex align-items-center justify-content-center">
            Application is loading...
        </div>
    </div>
@endsection

@push('style')
    <link
            rel="preload"
            href="{{ mix('css/app.css') }}"
            as="style"
            onload="this.onload=null;this.rel='stylesheet'"
    >
    <noscript>
        <link
                rel="stylesheet"
                href="{{ mix('css/app.css') }}"
        >
    </noscript>
@endpush

@push('scripts')
    <script
            type="text/javascript"
            src="{{ mix('js/app.js') }}"
            defer
    ></script>
@endpush
