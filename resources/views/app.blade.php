@extends('layout')

@section('title', 'PhpUnitGen')

@section('body-classes', 'w-100 h-100 theme-light theme-switching')

@section('content')
    <noscript>This application needs Javascript to run.</noscript>
    <div id="app"></div>
@endsection

@push('style')
    <link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
@endpush

@push('scripts')
    <script type="text/javascript" src="{{ mix('js/manifest.js') }}"></script>
    <script type="text/javascript" src="{{ mix('js/vendor.js') }}"></script>
    <script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
@endpush
