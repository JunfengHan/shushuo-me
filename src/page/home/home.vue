<template>
    <article class="test">
        <p>{{vue}}</p>
    </article>
</template>

<script>
export default {
	data() {
		return {
			vue: "vue"
		}
	}
}
</script>

<style lang="less">
	.test > p {
		background-color: aqua;
	}
</style>