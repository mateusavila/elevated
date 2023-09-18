<script setup lang="ts">
	import { menuOpen } from '../stores/index'
	import { useStore } from '@nanostores/vue'
	const $menuOpen = useStore(menuOpen);
	const toggle = () => menuOpen.set(!$menuOpen.value)
</script>

<template>
	<button
		ref="button"
		@click="toggle"
		class="hamburger hamburger--elastic" 
		aria-label="Toggle Menu"
		:class="{
			active: $menuOpen
		}"
	>
		<div class="hamburger-box">
			<div class="hamburger-inner"></div>
		</div>
	</button>
</template>

<style lang="sass">
	.hamburger
		display: none
		transition-property: opacity, filter
		transition-duration: 0.15s
		transition-timing-function: linear
		font: inherit
		color: inherit
		text-transform: none
		background-color: transparent
		border: 0
		margin: 0
		z-index: 100
		overflow: visible
		cursor: pointer
		&.active:hover, &:hover
			opacity: 0.7
		&.active &-inner,
		&.active &-inner::before,
		&.active &-inner::after, 
		&-inner,
		&-inner::before,
		&-inner::after
			background-color: #fff
		&-box,
		&-inner,
		&-inner::before,
		&-inner::after
			width: 40px
		&-box
			height: 24px
			position: relative
		&-box
			display: inline-block
		&-inner,
		&-inner::before,
		&-inner::after
			display: block
		&-inner
			top: 50%
			margin-top: -2px
		&-inner,
		&-inner::before,
		&-inner::after
			height: 3px
			position: absolute
			transition: transform 0.15s ease
		&-inner::before,
		&-inner::after
			content: ""
		&-inner::before
			top: -10px
		&-inner::after
			bottom: -10px
		&--elastic &-inner
			top: 2px
			transition: transform 0.275s cubic-bezier(0.68, -0.55, 0.265, 1.55)
		&--elastic &-inner::before
			top: 10px
			transition: opacity 0.125s 0.275s ease
		&--elastic &-inner::after
			top: 20px
			transition: transform 0.275s cubic-bezier(0.68, -0.55, 0.265, 1.55)
		&--elastic.active &-inner
			transform: translate3d(0, 10px, 0) rotate(135deg)
			transition-delay: 0.075s
		&--elastic.active &-inner::before
			transition-delay: 0s
			opacity: 0
		&--elastic.active &-inner::after
			transform: translate3d(0, -20px, 0) rotate(-270deg)
			transition-delay: 0.075s
	@media all and (max-width: 1024px)
		.hamburger
			display: inline-block
			position: absolute
			top: 50%
			transform: translateY(-50%)
			right: 20px
</style>