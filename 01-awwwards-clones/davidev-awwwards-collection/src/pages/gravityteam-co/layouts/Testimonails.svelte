<script>
	let activeTestimonial = 0;
	const TESTIMONAILS = [
		{
			testimonial:
				'Since 2019, Gravity team has been an astounding market maker for Bitkub. They have proven themselves to be one of the most consistent, committed and driven market makers on our exchange. Gravity Team has contributed high-quality volume and has proven to be very reliable and trustworthy partner. We strongly advocate Gravity Team as they have been an indispensable part of our market-making team.',

			name: 'Pongsakorn Pong Prasarttong-Osoth',
			role: 'Co-founder & CEO of Bitkub',
		},
		{
			testimonial:
				'Gravity team has been a great partner for us. They have been a consistent and reliable market maker for our exchange. They have been a great help in building our liquidity and we are very happy to have them as our partner.',
			name: 'Sarawut Srisawat',
			role: 'Developer of Nothing',
		},
		{
			testimonial:
				'Gravity Team is a key partner for Bitso, and their professionalism has been instrumental in deploying our liquidity strategy and expansion ambitions across Latin America. Gravity Team’s vast market expertise and flexibility to support our business requirements in lightning speed have permitted us to catch up with our product debt, list new tokens in record time, and offer attractive spreads for our end users. We are grateful to partner with Gravity Team and excited to continue working together in making crypto useful.',
			name: 'Garry Nower',
			role: 'Ceo of Nowersity',
		},
	];

	function handleNexTTestimonial() {
		if (activeTestimonial === TESTIMONAILS.length - 1)
			return (activeTestimonial = 0);

		activeTestimonial = activeTestimonial + 1;
	}
	function handlePrevTestimonial() {
		if (activeTestimonial === 0)
			return (activeTestimonial = TESTIMONAILS.length - 1);
		activeTestimonial = activeTestimonial - 1;
	}
</script>

<section class="container f-c-c-c">
	<h2 class="testimonials-title">We are in a good company</h2>
	<p class="testimonials-description">
		Our partnerships have delivered great value to our projects and we’re happy
		to share some of their feedback below
	</p>
	<div class="nav">
		<button on:click={handlePrevTestimonial}>
			<svg
				width="58"
				height="58"
				viewBox="0 0 58 58"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_1_157)">
					<path
						d="M29 0.491455C44.7448 0.491455 57.5085 13.2551 57.5085 28.9999C57.5085 44.7447 44.7448 57.5084 29 57.5084C13.2552 57.5084 0.491505 44.7447 0.491505 28.9999C0.491505 13.2551 13.2552 0.491455 29 0.491455ZM29 1.47451C13.7981 1.47451 1.47456 13.7981 1.47456 28.9999C1.47456 44.2018 13.7981 56.5254 29 56.5254C44.2019 56.5254 56.5254 44.2018 56.5254 28.9999C56.5254 13.7981 44.2019 1.47451 29 1.47451Z"
						fill="url(#paint0_linear_1_157)"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M19.14 28.8513L26.6899 20.9352C27.0419 20.575 27.6133 20.5332 28.0244 20.8988C28.3912 21.2244 28.4004 21.861 28.0612 22.2157L22.0006 28.5603H37.3953C37.9169 28.5603 38.339 28.9768 38.339 29.4916C38.339 30.0064 37.9169 30.4229 37.3953 30.4229H22.0006L28.0612 36.7675C28.4004 37.1222 28.3764 37.7425 28.0244 38.0844C27.652 38.4446 27.0364 38.4136 26.6899 38.048L19.14 30.1319C18.9188 29.9172 18.8783 29.7099 18.8746 29.4916C18.8746 29.277 19.0073 28.9896 19.14 28.8513Z"
						fill="url(#paint1_linear_1_157)"
					/>
				</g>
				<defs>
					<linearGradient
						id="paint0_linear_1_157"
						x1="57.5085"
						y1="0.491455"
						x2="0.491505"
						y2="57.5084"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#665DCD" />
						<stop offset="0.447624" stop-color="#5FA4E6" />
						<stop offset="1" stop-color="#D2AB67" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_1_157"
						x1="38.339"
						y1="22.1796"
						x2="20.4031"
						y2="38.4849"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#665DCD" />
						<stop offset="0.447624" stop-color="#5FA4E6" />
						<stop offset="1" stop-color="#D2AB67" />
					</linearGradient>
					<clipPath id="clip0_1_157">
						<rect width="58" height="58" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</button>
		<button on:click={handleNexTTestimonial}>
			<svg
				width="58"
				height="58"
				viewBox="0 0 58 58"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_1_168)">
					<path
						d="M29 0.491455C13.2552 0.491455 0.491516 13.2551 0.491516 28.9999C0.491516 44.7447 13.2552 57.5084 29 57.5084C44.7448 57.5084 57.5085 44.7447 57.5085 28.9999C57.5085 13.2551 44.7448 0.491455 29 0.491455ZM29 1.47451C44.2019 1.47451 56.5254 13.7981 56.5254 28.9999C56.5254 44.2018 44.2019 56.5254 29 56.5254C13.7981 56.5254 1.47457 44.2018 1.47457 28.9999C1.47457 13.7981 13.7981 1.47451 29 1.47451Z"
						fill="url(#paint0_linear_1_168)"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M38.86 28.8513L31.3101 20.9352C30.9581 20.575 30.3867 20.5332 29.9756 20.8988C29.6088 21.2244 29.5996 21.861 29.9388 22.2157L35.9994 28.5603H20.6047C20.0831 28.5603 19.661 28.9768 19.661 29.4916C19.661 30.0064 20.0831 30.4229 20.6047 30.4229H35.9994L29.9388 36.7675C29.5996 37.1222 29.6236 37.7425 29.9756 38.0844C30.348 38.4446 30.9636 38.4136 31.3101 38.048L38.86 30.1319C39.0812 29.9172 39.1217 29.7099 39.1254 29.4916C39.1254 29.277 38.9927 28.9896 38.86 28.8513Z"
						fill="url(#paint1_linear_1_168)"
					/>
				</g>
				<defs>
					<linearGradient
						id="paint0_linear_1_168"
						x1="0.491516"
						y1="0.491455"
						x2="57.5085"
						y2="57.5084"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#665DCD" />
						<stop offset="0.447624" stop-color="#5FA4E6" />
						<stop offset="1" stop-color="#D2AB67" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_1_168"
						x1="19.661"
						y1="22.1796"
						x2="37.5969"
						y2="38.4849"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#665DCD" />
						<stop offset="0.447624" stop-color="#5FA4E6" />
						<stop offset="1" stop-color="#D2AB67" />
					</linearGradient>
					<clipPath id="clip0_1_168">
						<rect
							width="58"
							height="58"
							fill="white"
							transform="matrix(-1 0 0 1 58 0)"
						/>
					</clipPath>
				</defs>
			</svg>
		</button>
	</div>
	<div class="testimonial">
		<p>
			{TESTIMONAILS[activeTestimonial].testimonial}
		</p>
		<span class="block">
			{TESTIMONAILS[activeTestimonial].name}
		</span>
		<span class="block">
			{TESTIMONAILS[activeTestimonial].role} | {activeTestimonial}
		</span>
	</div>
	<div class="dots f-c-c-r">
		{#each TESTIMONAILS as item}
			<div class="dot" />
		{/each}
	</div>
</section>

<style>
	.container {
		color: var(--gravity-text);
		position: relative;
		margin-top: var(--divider-top);
	}

	.testimonials-title {
		font-size: var(--subtitle);
		font-weight: var(--bold);
	}
	.nav {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		align-items: center;
	}
	.testimonials-description {
		max-width: 600px;
		font-size: var(--text-xl);
		line-height: var(--lh-subtitle);
		margin: 1.5rem 0;
	}
	.testimonial {
		text-align: center;
		margin-top: 32px;
		min-height: 320px;
		max-width: 682px;
		line-height: var(--lh-subtitle);
		font-size: var(--text-2xl);
	}
	.testimonial span:nth-child(2) {
		margin: 1rem 0;
		font-size: var(--text-xl);
		font-weight: var(--bold);
	}
	.testimonial span:nth-child(3) {
		font-size: var(--text-lg);
		margin: 0.5rem 0;
		font-weight: var(--regular);
		color: var(--gravity-green);
	}
	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: var(--gravity-text);
		margin: 0 5px;
		cursor: pointer;
	}
</style>
