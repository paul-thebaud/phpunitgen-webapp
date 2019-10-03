@extends('layout')

@section('title', 'PhpUnitGen')

@section('body-classes', 'w-100 h-100 theme-light theme-switching')

@section('content')
    <noscript>This application needs Javascript to run.</noscript>
    <div id="app"></div>
@endsection

@push('style')
    <link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Source+Code+Pro">
@endpush

@push('scripts')
    <script type="text/javascript" src="{{ mix('js/app.js') }}" defer></script>
@endpush
