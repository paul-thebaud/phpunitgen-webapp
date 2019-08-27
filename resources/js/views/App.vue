<template>
    <div id="app" class="theme-light">
        <Header/>
        <RouterView/>
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

<style scoped>
    #app {
        @apply w-full h-full;
    }
</style>
