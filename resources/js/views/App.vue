<template>
    <div id="app">
        <Header/>
        <div class="wrapper">
            <RouterView/>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from '@/components/layout/Header';
    import Footer from '@/components/layout/Footer';

    export default {
        name: 'App',
        components: {
            Header,
            Footer,
        },
    };
</script>

<style>
    #app > .wrapper > .container {
        padding-top: 60px;
        padding-bottom: 10px;
    }
</style>
