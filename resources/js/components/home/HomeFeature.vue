<template>
    <BRow class="home-feature py-5">
        <BCol md="6" :order-md="reversed ? 0 : 1" class="d-flex align-items-center">
            <div class="home-feature-description text-center" :class="reversed ? 'text-md-right ml-md-auto' : 'text-md-left'">
                <h3 class="font-bold mb-3">
                    {{ title }}
                </h3>
                <p class="mb-8" v-html="description"></p>
            </div>
        </BCol>
        <BCol md="6" :order-md="reversed ? 1 : 0">
            <div class="text-center" :class="reversed ? 'text-md-left' : 'text-md-right'">
                <img :src="image" :alt="imageAlt" class="home-feature-img img-fluid rounded shadow-lg"/>
            </div>
        </BCol>
    </BRow>
</template>

<script>
    export default {
        props: {
            title: {
                required: true,
                type: String,
            },
            description: {
                required: true,
                type: String,
            },
            image: {
                required: true,
                type: String,
            },
            imageAlt: {
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
