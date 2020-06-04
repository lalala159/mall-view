<template>
    <div>
      首页
    </div>
</template>

<script>
    import {getMember} from "~/api/api";

    export default {
        name: "Main",
        mounted() {
            getMember().then((response) => {
                var data = response
                console.log(data);
            })
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>