import websiteIcon from '@/assets/services/website.svg';
import maintenanceIcon from '@/assets/services/maintenance.svg';
import softwareIcon from '@/assets/services/software.svg';

import instagramIcon from "@/assets/social/instagram.svg"
import linkedinIcon from "@/assets/social/linkedin.svg"
import githubIcon from "@/assets/social/github.svg"

export const projects = {
	en: [
		{
			tag: 'Web Development & Rebranding',
			name: 'Trattoria Enoteca Luca',
			description:
				'We like to laugh and build strong relationships with the people that we work with.',
			img: '/projects/trattoria.webp',
			link: 'https://github.com/',
		},
		{
			tag: 'E-commerce and Management',
			name: 'Red Feather Trading Post',
			description:
				'We are quick to respond to messages and we are there when you need us most.',
			img: '/projects/commerce.webp',
			link: 'https://github.com/',
			gallery: true
		},
		{
			tag: 'Web Development',
			name: 'Slate Electric',
			description:
				'Saving you money to invest back in the business, and to promote team lunches and coffee chats.',
			img: '/projects/electric.webp',
			link: 'https://github.com/',
			gallery: true
		},
		{
			tag: 'Website Revamp',
			name: 'SkyShot Management',
			description:
				'We like to laugh and build strong relationships with the people that we work with.',
			img: '/projects/skyshot.webp',
			link: 'https://github.com/',
			gallery: true
		},
	],
	de: [
		{
			tag: 'Webentwicklung und Rebranding',
			name: 'Trattoria Enoteca Luca',
			description:
				'Wir lachen gerne und bauen starke Beziehungen zu den Menschen auf, mit denen wir arbeiten.',
			img: '/projects/trattoria.webp',
			link: 'https://github.com/',
		},
		{
			tag: 'E-Commerce und Management',
			name: 'Red Feather Trading Post',
			description:
				'Wir reagieren schnell auf Nachrichten und sind da, wenn Sie uns am meisten brauchen.',
			img: '/projects/commerce.webp',
			link: 'https://github.com/',
			gallery: true
		},
		{
			tag: 'Web Entwicklung',
			name: 'Slate Electric',
			description:
				'Sie sparen Geld, das Sie wieder in Ihr Unternehmen investieren und Team-Mittagessen und Kaffeeklatsch fördern können.',
			img: '/projects/electric.webp',
			link: 'https://github.com/',
			gallery: true
		},
		{
			tag: 'Web Entwicklung',
			name: 'SkyShot Management',
			description:
				'Wir lachen gerne und bauen starke Beziehungen zu den Menschen auf, mit denen wir arbeiten.',
			img: '/projects/skyshot.webp',
			link: 'https://github.com/',
			gallery: true
		},
	],
};

export const socials = [
	{
		name: 'Instagram',
		link: 'https://www.instagram.com/',
		icon: instagramIcon.src
	},
	{
		name: 'Linkedin',
		link: 'https://www.linkedin.com/',
		icon: linkedinIcon.src
	},
	{
		name: "Github",
		link: "https://github.com/cosmoart/CodeDev",
		icon: githubIcon.src
	}
];

export const services = {
	en: [
		{
			title: 'Website Development',
			items: [
				'Website Creation',
				'UI/UX Design & Wireframing',
				'Website Maintenance',
			],
			icon: websiteIcon.src,
		},
		{
			title: 'Software Development',
			items: [
				'Web App Development',
				'Mobile App Development',
				'Desktop App Development',
			],
			icon: softwareIcon.src,
		},
		{
			title: 'Maintenance',
			items: [
				'Hosting & Management',
				'Optimization & Best Practices',
				'Iterations & Frequent Updates',
			],
			icon: maintenanceIcon.src,
		},
	],
	de: [
		{
			title: 'Webseitenentwicklung',
			items: [
				'Website-Erstellung',
				'UI/UX-Design und Wireframing',
				'Website-Wartung',
			],
			icon: websiteIcon.src,
		},
		{
			title: 'Software-Entwicklung',
			items: [
				'Web-App-Entwicklung',
				'Entwicklung mobiler Apps',
				'Entwicklung von Desktop-Apps',
			],
			icon: softwareIcon.src,
		},
		{
			title: 'Web- und Softwarewartung',
			items: [
				'Hosting und Verwaltung',
				'Optimierung und Best Practices',
				'Iterationen und häufige Updates',
			],
			icon: maintenanceIcon.src,
		},
	],
};

export const perks = {
	en: [
		{
			title: 'Cost Effective',
			description:
				'Saving you money to invest back in the business, and to promote team lunches and coffee chats :)',
		},
		{
			title: 'Human Touch',
			description:
				'We like to laugh and build strong relationships with the people that we work with.',
		},
		{
			title: 'Quick and Efficient',
			description:
				'We are quick to respond to messages and we are there when you need us most.',
		},
	],
	de: [
		{
			title: 'Kosteneffizient',
			description:
				'Sie sparen Geld, das Sie wieder in Ihr Unternehmen investieren und zur Förderung von Team-Mittagessen und Kaffeeklatsch nutzen können :)',
		},
		{
			title: 'Menschliche Berührung',
			description:
				'Wir lachen gerne und bauen starke Beziehungen zu den Menschen auf, mit denen wir arbeiten.',
		},
		{
			title: 'Schnell und effizient',
			description:
				'Wir reagieren schnell auf Nachrichten und sind da, wenn Sie uns am meisten brauchen.',
		},
	],
};

export const process = {
	en: [
		{
			title: 'Research',
			description: 'Understand your needs, and plan.',
		},
		{
			title: 'Concept',
			description: 'Bringing your dreams to reality.',
		},
		{
			title: 'Development',
			description: 'Solution development.',
		},
		{
			title: 'Delivery',
			description: 'Solution deployed and supported.',
		},
	],
	de: [
		{
			title: 'Forschung',
			description: 'Verstehen Sie Ihre Bedürfnisse und planen Sie.',
		},
		{
			title: 'Konzept',
			description: 'Wir machen Ihre Träume wahr.',
		},
		{
			title: 'Entwicklung',
			description: 'Lösungsentwicklung.',
		},
		{
			title: 'Lieferung',
			description: 'Lösung bereitgestellt und unterstützt.',
		},
	],
};

export const techs = [
	{
		title: 'React',
		color: '#61DAFB',
		icon: '/techs/react.svg',
	},
	{
		title: 'Node.js',
		color: '#5FA04E',
		icon: '/techs/nodejs.svg',
	},
	{
		title: 'Next.js',
		color: '#000000',
		icon: '/techs/nextjs.svg',
	},
	{
		title: 'Astro',
		color: '#BC52EE',
		icon: '/techs/astro.svg',
	},
	{
		title: 'Svelte',
		color: '#FF3E00',
		icon: '/techs/svelte.svg',
	},
	{
		title: 'PHP',
		color: '#777BB4',
		icon: '/techs/php.svg',
	},
	{
		title: 'MySQL',
		color: '#4479A1',
		icon: '/techs/mysql.svg',
	},
	{
		title: 'Figma',
		color: '#F24E1E',
		icon: '/techs/figma.svg',
	},
	{
		title: '.NET',
		color: '#512BD4',
		icon: '/techs/net.svg',
	},
];