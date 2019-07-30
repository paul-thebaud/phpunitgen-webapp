<template>
    <div id="app" class="w-full h-full transition-slow theme-light">
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
</style>
