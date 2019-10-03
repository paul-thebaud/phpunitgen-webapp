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
        components: {
            Header,
            Footer,
        },
    };
</script>
