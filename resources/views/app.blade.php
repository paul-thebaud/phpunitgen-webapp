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

@push('scripts')
    <script
            type="text/javascript"
            src="{{ mix('js/app.js') }}"
            defer
    ></script>
@endpush
