<template>
    <b-row class="py-5">
        <b-col md="6" :order-lg="reversed ? 0 : 1" class="d-flex align-items-center">
            <div class="text-center" :class="reversed ? 'text-lg-right' : 'text-lg-left'">
                <h3 class="font-bold mb-3">{{ this.title }}</h3>
                <p class="mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
                    ipsum eu nunc commodo posuere et sit amet ligula.
                    <br><br>

                    Images from: <a href="https://undraw.co/">undraw.co</a>
                </p>
            </div>
        </b-col>
        <b-col md="6" :order-lg="reversed ? 1 : 0">
            <img src="https://picsum.photos/800/600" alt="Image" class="img-fluid rounded shadow-lg"/>
        </b-col>
    </b-row>
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
