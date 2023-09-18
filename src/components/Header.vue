<script setup lang="ts">
import HeaderButton from './HeaderButton.vue';
import { menuOpen } from '../stores/index'
import { useStore } from '@nanostores/vue'
import { Logo, ArrowLetsTalk, ArrowLetsTalkActive } from './images'
import { onMounted, ref, onUnmounted, toRefs } from 'vue'
const props = defineProps<{
	url: string
}>()
const { url } = toRefs(props)
const y = ref<number>(0)
const handleScroll = () => {
	y.value = Math.abs(window.scrollY)
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll)) 
const $menuOpen = useStore(menuOpen)
</script>

<template>
	<header id="header" :class="{
	 active: y > 0,
	 'is-home': url === '/'
	}">
		<HeaderButton />
		<div class="container">
			<div class="header-logo">
				<a href="/" aria-label="Work">
					<img :src="Logo" alt="Elevated" width="141" height="27" loading="lazy" class="logo-image">
				</a>
				<nav
					:class="{
						active: $menuOpen
					}"
					class="main-navigation" 
					id="main-navigation"
					>
					<ul>
						<li>
							<a href="/" aria-label="Work"
								:class="{ active: url === '/' }">WORK</a>
						</li>
						<li>
							<a href="/meet-the-team" aria-label="Let's rock"
								:class="{ active: url === '/meet-the-team' }">MEET THE TEAM</a>
						</li>
						<li>
							<a href="/what-we-do" aria-label="what we do?"
								:class="{ active: url === '/what-we-do' }">WHAT WE DO</a>
						</li>
						<li class="mobile">
							<a href="/lets-talk" aria-label="Let's Talk"
								:class="{ active: url === '/lets-talk' }">
								LET'S TALK
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<nav class="lets-talk-navigation" id="lets-talk-navigation">
				<a href="/lets-talk" aria-label="Let's Talk"
					:class="{ active: url === '/lets-talk' }">
					<img 
						v-if="url !== '/lets-talk'"
						:src="ArrowLetsTalk" 
						alt="" 
						width="16" 
						height="9"
						loading="lazy">
					<img 
						v-if="url === '/lets-talk'"
						:src="ArrowLetsTalkActive" 
						alt="" 
						width="26"
						height="8" 
						loading="lazy">
					<span>LET'S TALK</span>
				</a>
			</nav>
		</div>
	</header>
</template>

<style lang="sass">
	header, header.active, header a, header a:hover, header a.active, .lets-talk-navigation a img, .lets-talk-navigation a:hover img
		transition: all ease-in-out .2s
	header .container, .header-logo, .lets-talk-navigation a, .main-navigation ul
		display: flex
		align-items: center
	header .container, .lets-talk-navigation a
		justify-content: space-between
	header
		position: fixed
		top: 0
		height: 134px
		z-index: 100
		background: #000
		width: 100%
		left: 0
		&.is-home
			background: transparent
		&.active
			height: 100px
		a
			color: #fff
			text-decoration: none
			font-family: var(--inter)
			font-weight: 300
			font-size: 14px
			&:hover, &.active
				font-weight: bold
		.container
			margin: 0 auto
			width: calc(100% - 80px)
			height: 100%
	.main-navigation
		margin-left: 200px
		ul
			grid-gap: 50px
			padding: 0
			margin: 0
			list-style-type: none
		li.mobile
			display: none
	.header-logo
		flex-wrap: wrap
	.logo-image
		width: 141px
		height: auto
		display: block
	.lets-talk-navigation
		a
			grid-gap: 30px
			font-weight: bold
			&.active span
				background: linear-gradient(260.25deg, #6E49FF -7.2%, #FF7B31 108.12%, #FFFFFF 108.12%)
				-webkit-background-clip: text
				-webkit-text-fill-color: transparent
				background-clip: text
				text-fill-color: transparent
				font-size: 30px
				line-height: 36px
			&:hover
				img 
					transform: translateX(10px)
	@media all and (max-width: 1024px)
		.lets-talk-navigation
			display: none
		.main-navigation, .main-navigation.active
			transition: all .2s cubic-bezier(0.68, -0.55, 0.265, 1.55)
		.main-navigation 
			position: fixed
			top: 0
			left: 0
			margin: 0
			background: #202020
			width: 100%
			z-index: 10
			height: 100vh
			opacity: 0
			visibility: hidden
			&.active
				opacity: 1
				visibility: visible
			ul
				position: absolute
				top: 50%
				transform: translate(-50%, -50%)
				left: 50%
				display: flex
				flex-wrap: wrap
				justify-content: center
				align-items: center
				align-content: center
			li
				text-align: center
				width: 100%
			li.mobile
				display: block
			a
				font-size: 20px
		header
			height: 100px
			.container
				width: calc(100% - 40px)
		.logo-image
			max-width: 160px

</style>
