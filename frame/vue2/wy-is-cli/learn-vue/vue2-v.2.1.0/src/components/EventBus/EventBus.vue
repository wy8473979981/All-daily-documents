<template>
    <div id="app">
        <div class="container">
            <div class="front">
                <div class="increment">
                    <A />
                </div>
                <div class="decrement">
                    <B />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import A from "./A";
    import B from "./B";
    import { EventBus } from "./event-bus.js";
    export default {
        name: "App",
        components: {
            A,
            B
        },
        data() {
            return {

            };
        },
        mounted() {

        }
    };
</script>
