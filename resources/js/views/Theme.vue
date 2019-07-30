<template>
    <div class="container mx-auto h-full z-20">
        <h1 class="text-2xl font-bold">Themes</h1>
        <div class="flex">
            <div class="w-1/3 p-2">
                <div class="rounded-lg text-center theme-light bg-theme text-theme shadow p-2">
                    <h1 class="text-xl">Light</h1>
                    <p class="mt-2 mb-4">💡 Welcome in the Jedi order 💡</p>
                    <Button @:click="chooseTheme('light')">
                        Choose this theme
                    </Button>
                </div>
            </div>
            <div class="w-1/3 p-2">
                <div class="rounded-lg text-center theme-dark bg-theme text-theme shadow p-2">
                    <h1 class="text-xl">Dark</h1>
                    <p class="mt-2 mb-4">🦇 Hello Batman 🦇</p>
                    <Button @:click="chooseTheme('dark')">
                        Choose this theme
                    </Button>
                </div>
            </div>
            <div class="w-1/3 p-2">
                <div class="rounded-lg text-center theme-unicorn bg-theme text-theme shadow p-2">
                    <h1 class="text-xl">Unicorn</h1>
                    <p class="mt-2 mb-4">🦄 Only for real unicorns 🦄</p>
                    <Button @:click="chooseTheme('unicorn')">
                        Choose this theme
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from '@/components/Button';

    export default {
        name: 'Home',
        components: { Button },
        methods: {
            chooseTheme(theme) {
                console.log(theme);
            },
        },
    };
</script>

<style scoped>
</style>
