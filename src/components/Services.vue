<script setup lang="ts">
	import { ref } from 'vue'
	import { ArrowShowMore } from './images'
	import { Services } from '../data/services'
	import type { ServicesType } from '../data/services'

	const services = ref<ServicesType[]>(Services)
	const isPaginated = ref<boolean>(false)
	const activeIndex = ref<number|null>()
	
	const changeActiveIndex = (index: number) => {
		if (index === activeIndex.value) {
			activeIndex.value = undefined
			return true
		}
		if (index !== activeIndex.value) {
			activeIndex.value = index
			return true
		}
	}
	const removeIndex = () => activeIndex.value = undefined
	const loadMore = () => isPaginated.value = true
</script>

<template>
	<div class="services">
		<div class="container">
			<div class="services-header">
				<h2><span>Services</span></h2>
			</div>
			<div class="services-list-data">
				<div
					class="services-list"
					:class="{ active: isPaginated }"
				>
					<div 
						class="services-item-block"
						:class="`services-item-block-${index + 1}`"
						v-for="({title, text}, index) in services" :key="index">
						<div 
							class="services-item" 
							:class="{
								active: index === activeIndex, 
								hidden: index > 3 && !isPaginated 
							}"
							@mouseover="changeActiveIndex(index)"
							@mouseout="removeIndex"
						>
							<button type="button" :aria-label="title"
								:class="{ active: index === activeIndex }">{{title}}</button>
							<div class="service-item-data" :class="{ active: index === activeIndex }">
								<p>{{ text }}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="services-action" v-if="!isPaginated">
					<button type="button" @click="loadMore" aria-label="click to load more services">
						<img :src="ArrowShowMore" alt="Load more posts" width="16" height="30" loading="lazy">
						<span>View More</span>
					</button>
				</div>
				<div class="services-hover-content-master">
					<div class="services-hover-content"
						v-for="({hover, id}, index) in services" :key="index"
						:class="[{ active: activeIndex === index }, `services-hover-content-${index + 1}`]">
						<p :id="id">{{hover}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="sass">
	@keyframes animation1
		0%
			transform: translateX(100vw)
		100%
			transform: translateX(calc((5933px)  * -1))
	@keyframes animation2
		0%
			transform: translateX(100vw)
		100%
			transform: translateX(calc((3102px)  * -1))
	@keyframes animation3
		0%
			transform: translateX(100vw)
		100%
			transform: translateX(calc((2788px)  * -1))
	@keyframes animation4
		0%
			transform: translateX(100vw)
		100%
			transform: translateX(calc((2235px)  * -1))
	@keyframes animation5
		0%
			transform: translateX(100vw)
		100%
			transform: translateX(calc((3470px)  * -1))
	@keyframes animation6
		0%
			transform: translateX(100vw)
		100%
			transform: translateX(calc((4536px)  * -1))
	@keyframes animation7
		0%
			transform: translateX(100vw)
		100%
			transform: translateX(calc((3384px)  * -1))
	@keyframes animation8
		0%
			transform: translateX(100vw)
		100%
			transform: translateX(calc((3722px)  * -1))
	.services-hover-content-master
		position: fixed
		bottom: 0
		width: 100%
		height: 182px
		z-index: 10		
		left: calc((100vw - 1400px) / 2 * -1)
		left: 0
		.services-hover-content
			position: absolute
			top: 0
			height: 100%
			width: 0
			background: #6E49FF
			white-space: nowrap
			opacity: 1
			transition: all .4s ease-in-out
			overflow: hidden
			&.hidden
				display: none
			p
				margin: 0
				font-size: 160px
				line-height: 1
				padding-left: 50px
				transform: translateX(0)
			&.active
				width: 100vw
				transition: all .3s ease-in-out .4s
				&.services-hover-content-1
					p
						animation: animation1 14s linear infinite
				&.services-hover-content-2
					p
						animation: animation2 14s linear infinite
				&.services-hover-content-3
					p
						animation: animation3 14s linear infinite
				&.services-hover-content-4
					p
						animation: animation4 14s linear infinite
				&.services-hover-content-5
					p
						animation: animation5 14s linear infinite
				&.services-hover-content-6
					p
						animation: animation6 14s linear infinite
				&.services-hover-content-7
					p
						animation: animation7 14s linear infinite
				&.services-hover-content-8
					p
						animation: animation8 14s linear infinite
	.services-action
		display: flex
		width: 100%
		max-width: 850px
		text-align: right
		justify-content: flex-start
		margin-top: 50px
		button
			border: none
			background: #fff
			display: flex
			align-items: center
			font-weight: bold
			grid-gap: 20px
			position: relative
			z-index: 10
			font-size: 25px
			cursor: pointer
			span
				background: linear-gradient(96.01deg, #FF7B31 6.08%, #7362FF 68.94%)
				-webkit-background-clip: text
				-webkit-text-fill-color: transparent
				background-clip: text
				text-fill-color: transparent
	.services-list-data, .services-header
		display: flex
	.services, .services-header h2 span
		background: #fff
	.services-header, .services-header h2, .services-header h2 span
		position: relative
	.services, .services-header, .services-header h2, .services-header h2::after
		width: 100%
	.services-header h2::before, .services-header h2::after
		position: absolute
	.services
		padding: 120px 0 180px
		.container
			width: calc(100% - 60px)
			max-width: 1400px
			margin: 0 auto
		p
			color: #000
			font-family: var(--gelion)
			font-weight: 400
			margin: 0
			font-size: 20px
			line-height: 24px
	.services-item-block
		width: 100%
		position: relative
		display: flex
		justify-content: flex-end			
	.services-header
		align-items: center
		margin-bottom: 40px
		h2
			font-family: var(--inter)
			font-weight: 900
			font-size: 50px
			margin: 0
			&:before, &:after
				content: ''
				background: #000
			&:before
				width: 32px
				height: 32px
				border-radius: 100%
				display: block
				margin-right: 28px
				z-index: 3
				bottom: 9px
			&:after
				top: 50%
				height: 1px
				left: 0
				z-index: 1
				margin-top: -0.5px
			span
				z-index: 2
				padding: 0 30px 0 50px
	.services-list-data
		flex-wrap: wrap
		justify-content: flex-end
		align-items: center
		flex-wrap: wrap
	.service-item-data
		width: 100%
		max-width: 320px
	.services-list
		width: 100%
		display: flex
		justify-content: flex-end
		flex-wrap: wrap
		max-height: calc(182px * 4)
		&.active
			max-height: calc(182px * 8)
			transition: all .4s ease-in-out
		.services-item
			max-width: 850px
			min-width: 850px
			min-height: 182px
			width: 100%
			display: flex
			justify-content: space-between
			align-items: flex-end
			padding-bottom: 10px
			border-bottom: 0.5px solid #000
			&.hidden
				visibility: hidden
				opacity: 0
				height: 0
				overflow: hidden
			&.active
				button
					font-weight: bold
		button
			border: none
			background: none
			width: 350px
			text-align: left
			cursor: pointer
			font-size: 25px
			line-height: 120%
	@media all and (max-width: 1250px)
		.services-list
			column-gap: 50px
	@media all and (max-width: 1150px)
		.services-list
			column-gap: 10px
			button
				font-size: 20px
	@media all and (max-width: 1024px)
		.services
			.container
				margin-right: 0
		.services-header
			margin-bottom: 40px
			h2
				font-size: 30px
				span
					padding-left: 30px
				&::before
					width: 18px
					height: 18px
					margin-right: 10px
					bottom: 7px
		.services-list
			max-width: 100%
			column-gap: 0
			columns: 1
			.service-item-data
				padding-right: 20px
				&.active
					display: block
	@media all and (max-width: 900px)
		.services-list 
			.services-item
				width: 100%
				max-width: 100%
				min-width: 100%
	@media all and (max-width: 500px)
		.services
			.container
				width: calc(100% - 30px)
		.services-list
			margin-left: 0
			width: 100%
			.services-item
				flex-wrap: wrap
				align-items: center
				align-content: center
			button
				font-size: 15px
				width: 100%
				padding: 0
				margin-bottom: 10px
			.service-item-data
				p
					font-size: 14px
		.services-hover-content
			p
				font-size: 120px
				margin-top: 25px
</style>
