<script setup lang="ts">
	import { Back, Next } from './images'
	const emits = defineEmits<{
		(e: 'onPrev'): void
		(e: 'onNext'): void
	}>()
</script>

<template>
	<div class="icons">
		<button class="custom-icon" @click="emits('onPrev')" aria-label="Go to previous Month">
			<img :src="Back" alt="Back" width="20" height="20" loading="lazy">
		</button>
		<button class="custom-icon" @click="emits('onNext')" aria-label="Go to next Month">
			<img :src="Next" alt="Next" width="20" height="20" loading="lazy">
		</button>
	</div>
</template>

<style lang="sass">
	.icons, .custom-icon
		display: flex
	.custom-icon, .custom-icon:hover
		transition: all .2s ease-in-out
	.custom-icon
		justify-content: center
		align-items: center
		padding: 5px
		height: 25px
		width: 25px
		border: none
		cursor: pointer
		background-color: transparent
		color: var(--dp-icon-color)
		text-align: center
		border-radius: 50%
		svg
			height: 20px
			width: 20px
		&:hover
			background: var(--dp-hover-color)
</style>