<template>
    <article class="test">
        <p>{{vue}}</p>
		<div class="test-img">
			<img src="../../assets/images/test.jpg">
		</div>
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

<style lang="less" scoped>
	.test > p {
		background-color: aqua;
	}
</style>