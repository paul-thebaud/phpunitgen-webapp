<template>
    <div class="bg-primary text-primary">
        <div class="pt-40">
            <div class="container mx-auto h-full text-center z-20">
                <h1 class="text-5xl font-bold">Welcome to PhpUnitGen</h1>
                <p class="text-2xl">
                    PhpUnitGen is a simple, powerful and modular tool to
                    generate your PHPUnit tests skeletons.
                    <br>
                    It is free and open-source.
                </p>
                <div class="py-10">
                    <Button
                            :to="{ name: 'home' }"
                            class="relative z-20 mx-2"
                            variant="secondary"
                            large
                            rounded
                    >
                        Use Online
                    </Button>
                    <Button
                            :to="{ name: 'home' }"
                            class="relative z-20 mx-2"
                            variant="secondary"
                            large
                            rounded
                    >
                        Documentation
                    </Button>
                </div>
            </div>

            <div class="relative -mt-12 lg:-mt-24">
                <HomeWaves/>
            </div>

            <div class="bg-theme text-theme">
                <div class="container max-w-5xl mx-auto">
                    <HomeFeature title="Console Toolkit"/>

                    <HomeFeature title="Opened API" reversed/>

                    <HomeFeature title="Modularity"/>

                    <HomeFeature title="Fully Documented" reversed/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from '@/components/Button';
    import HomeWaves from '@/components/home/HomeWaves';
    import HomeFeature from '@/components/home/HomeFeature';

    export default {
        name: 'Home',
        components: { Button, HomeWaves, HomeFeature },
    };
</script>

<style scoped>
</style>
