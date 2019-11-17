@extends('layout')

@section('title', 'PhpUnitGen Docs')

@section('body-classes', 'theme-light')

@section('content')
    <noscript>This application needs Javascript to run.</noscript>
    <div id="docs-nav"></div>
    <div id="docs"></div>
@endsection

@push('style')
    <link rel="stylesheet" href="{{ mix('css/docs.css') }}">
@endpush

@push('scripts')
    <script type="text/javascript" src="{{ mix('js/docs.js') }}" defer></script>
@endpush
