<template>
    <div
            class="flex flex-wrap text-center items-center"
            :class="{ 'sm:text-right': ! this.reversed, 'flex-row-reverse sm:text-left': this.reversed }"
    >
        <div class="w-full sm:w-1/2 p-6">
            <h3 class="text-3xl font-bold leading-none mb-3">{{ this.title }}</h3>
            <p class="mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
                ipsum eu nunc commodo posuere et sit amet ligula.
                <br><br>

                Images from: <a class="text-red-500 underline" href="https://undraw.co/">undraw.co</a>
            </p>
        </div>
        <div class="w-full sm:w-1/2 p-6">
            <img src="https://picsum.photos/800/600" alt="Image" class="rounded-lg shadow-xl"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Feature',
        props: {
            title: {
                required: true,
                type: String,
            },
            reversed: {
                required: false,
                type: Boolean,
                default: false,
            },
        },
    };
</script>

<style scoped>

</style>
