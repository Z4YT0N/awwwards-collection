
import React, { createContext } from 'react'
import MediaSource from '../config/MediaSource'

export interface ContextInterface {
    mainScroll: boolean,
    contentProps: object
}

//Create Context  
const Context:any = createContext<ContextInterface | null>(null);

const store: ContextInterface = {
    mainScroll: false,
    contentProps: [
        {
            caseTitle: 'The new Mobile Workforce',
            caseDescription: 'Race Day requires optimal performance. Take a look at how the Citrix team uses data to analyze, model, & design the car.',
            poster: MediaSource.poster.project1,
            title: 'Immersive Garden - The new Mobile Workforce',
            source: MediaSource.video.case1,
            url: 'https://thenewmobileworkforce.imm-g-prod.com/',
            caseImgDetail: MediaSource.cases.caseProject1
        },
        {
            caseTitle: 'Rainforest foods',
            caseDescription: 'A website to discover the experience of superfoods of Rainforest',
            poster: MediaSource.poster.project2,
            title: 'Immersive Garden - Rainforest foods',
            source: MediaSource.video.case2,
            url: 'https://www.rainforestfoods.com/experience/#!/',
            caseImgDetail: MediaSource.cases.caseProject2
        },
        {
            caseTitle: 'You are the Stylist',
            caseDescription: "Experience Broken Back's interactive music video where you are the stylist. Click and chose our look to discover the story.",
            poster: MediaSource.poster.project3,
            title: 'Immersive Garden - You are the Stylist',
            source: MediaSource.video.case3,
            url: 'https://youarethestylist.imm-g-prod.com/',
            caseImgDetail: MediaSource.cases.caseProject3
        },
        {
            caseTitle: 'ACME Experience',
            caseDescription: "Born 40 years ago when Dubai was only a desert, Acme is today one of the most competitive storage solutions provider worldwide.",
            poster: MediaSource.poster.project4,
            title: 'Immersive Garden - ACME Experience',
            source: MediaSource.video.case4,
            url: 'http://acme-experience.com/',
            caseImgDetail: MediaSource.cases.caseProject4
        },
        {
            caseTitle: 'Zero Days Off',
            caseDescription: `"How do we live a full life?" Discover the story of Edward Stevenson's fight against chronic pain. This experience introduces his book about the keys to better living..`,
            poster: MediaSource.poster.project5,
            title: 'Immersive Garden - ACME Experience',
            source: MediaSource.video.case5,
            url: 'http://zerodaysoff.co.uk/',
            caseImgDetail: MediaSource.cases.caseProject5
        },
        {
            caseTitle: 'Gleec',
            caseDescription: `Explore Gleec Chat's experience to promote the application and discover all its secured functionalities.`,
            poster: MediaSource.poster.project6,
            title: 'Immersive Garden - ACME Experience',
            source: MediaSource.video.case6,
            url: 'https://gleec.com/',
            caseImgDetail: MediaSource.cases.caseProject6
        },
    ]
}

//Create provider
export const ContextProvider = ({ children }: any) => {
    return (
        <Context.Provider value={{...store}}>
            { children }
        </Context.Provider>
    )
}

export default Context