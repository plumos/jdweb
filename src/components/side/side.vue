<template>
    <div>
        <div class="smenu">
            <img class="logo" src="../../assets/logo.jpeg"/>
            <sidemenu/>
        </div>
        <div>
            <div class="sbar">
                <sidebar :index="0"/>
            </div>
        </div>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import sidetop from "@/components/side/sidetop";
    import sidebar from "@/components/side/sidebar";
    import sidemenu from "@/components/side/sidemenu";
    export default {
        name: "side",
        components: {sidetop, sidebar, sidemenu}
    }
</script>

<style scoped>
    @import '../../css/side.css';
</style>
