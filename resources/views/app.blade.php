@extends('layout')

@section('content')
    <noscript>This application needs Javascript to run.</noscript>
    <div id="app"></div>
@endsection

@push('scripts')
    <script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
@endpush
