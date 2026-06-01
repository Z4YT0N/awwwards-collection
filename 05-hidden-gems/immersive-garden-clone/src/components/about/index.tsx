
import * as React from 'react'
import styled from 'styled-components'
import Header from '../reusable/header/header'
import FlexDisplay from '../reusable/layout/flex.reusable'
import List, { Title as ListTitle } from './about.list'

import AboutContact, { AboutNewsLetter } from './about.contact'
import AboutInformation from './about.information'


const About = ({ history }) => {

    let [columnConcept, columnDesign, columnTech, columnRecognitions] = [
        ['Creative Strategy', 'Branding', 'Innovative digital concept', 'Copywrighting', 'Tone of voice'],
        ['Art direction', 'User experience design', 'User interface & interactive', 'design', 'Illustration', 'Motion design', '2D & 3D animation', 'Photo & video', 'Sound design'],
        ['Creative development', 'Front-end development', 'Back-end development', 'App development', 'VR & AR development'],
        ['Awwwards x 1 Studio of the Year', 'Awwwards x 1 Site of the Year', 'Awwwards x 1 Developer of the Year', 'Awwwards x 6 Site of the Month', 'Awwwards x 23 Site of the Day', 'CSSDA x 1 Corporate site of the Year', 'FWA x 1 Site of the Month', 'FWA x 2 Cuting edge awards', 'FWA x 30 Site of the Day', 'Webby Awards Best visual design x 1', 'Lovie Awards x 3']
    ]
    

    //Newslettercontext
    let NewsletterContext = [
        {
            title: 'Inquiries',
            content: 'hello@immersive-g.com'
        },
        {
            title: 'Jobs',
            content: 'jobs@immersive-g.com'
        },
    ]


    /* Inital Props */
    const getProps = {
        header: {
            brandVisibility: true,
            closeText: 'close',
            onCloseTextClick: () => history.goBack(),
        },
    }

    return (
        <AboutSection>
            {/* <!--- Header --> */}
            <Header {...getProps.header} />

            {/* <!--- Content Container --> */}
            <Container>
                <Title>We Create Emotional, Meaningful & Innovative Digital Experience</Title>
                <ContentDesc>
                    Immersive Garden has been recognized as Studio of the year 2017 by both AWWWARDS and CSS Design Awards. Our vision is focused on crafting in-house meaningful concepts and stories thanks to digital experiences. This translates in websites but also installations, apps or any media that is relevant. Immersive Garden’s focus on details allows to bring high-end experiences that merge innovation in design and in technology to offer a powerful digital presence to brands. Our experience and dedication has brought us to collaborate with international clients: they reach out to us from all parts of the globe, leading us to have 75% of our collaborations with companies abroad.
                </ContentDesc>
                <SubTitle>In-house we design and develop sites, app & interactive installations</SubTitle>

                <FlexDisplay className="_classExtern _itemHasMargin" justify="space-between" addStyle={{ marginTop: '140px' }}>
                    <List titleProps="Concept" lists={columnConcept} />
                    <List titleProps="Design" lists={columnDesign} />
                    <List titleProps="Technology" lists={columnTech} />
                </FlexDisplay>

                <ContentDesc>
                    Immersive Garden has detailed and phased a process allowing to work hand in hand with our clients from the brief to the launch. We become one team working together on the same goal: creating a successful project.
    This attitude has been leading us to work with marvellous clients such as:
    Chanel, Nissan, Total, Redbull, Richemont, Decathlon, Adidas, Arte, Rainforest foods, Engie, Vente-privée, Orange, Google and more...
    We are driven by the ambitious of a project rather than its scale. We believe that good ideas can grow anywhere.
                </ContentDesc>

                <WrappedContent>
                    <ListTitle title="Recognitions" />
                    <FlexDisplay className="_classExtern" justify="space-between">
                        <List lists={columnRecognitions.slice(0, 6)} />
                        <List lists={columnRecognitions.slice(6, 11)} />
                    </FlexDisplay>
                </WrappedContent>
            </Container>

            {/* <!-- About Newsletter --> */}
            <Newsletter>
                <AboutContact contactLists={NewsletterContext} />
                <AboutNewsLetter contactTitle="Newsletter"/>
            </Newsletter>


            {/* <!-- About Information --> */}
            <AboutInfoMain>
                <AboutInformation infoTitle="Immersive Garden">
                    14 Avenue Claude Vellefaux 75010 Paris, France
                </AboutInformation>
            </AboutInfoMain>
        </AboutSection>
    )
}

const AboutSection = styled.section`
    position: 'relative';
    background: #0c0c0d;
    min-height: 100vh;
    padding: 1px;
    overflow-y: scroll;
    height: 100vh;
    width: 100vw;
`

const Container = styled.div`
    max-width: 880px;
    margin-bottom: 70px;
    margin-right: auto;
    margin-left: auto;
    width: 55.556%;

    @media(max-width: 981px){
        max-width: 80%;
        width: 100%;
    }

    @media(max-width: 980px){
        & ._classExtern {
            flex-direction: column
        }
        & ._itemHasMargin > ul:not(:nth-child(1)){
            margin-top: 80px;
        }
    }
`

const Title = styled.h1`
    margin-top: 55px;
    text-transform: uppercase;
    color: #a4a4a4;
    font-size: calc(31px + 19 * (100vw - 960px) / 960);
    font-family: 'serif';
    font-weight: 300;
    line-height: 1.607142857142857;
    letter-spacing: .1em;
    -webkit-font-smoothing: antialiased;

   
    @media(max-width: 981px){
        margin-top: 40%;
        font-size: calc(41px + 19 * (100vw - 960px) / 960)
    }
`
const SubTitle = styled.h2`
    font-size: calc(26px + 0 * (100vw - 960px) / 960);
    line-height: 1.923076923076923;
    letter-spacing: .2em;
    margin-top: 140px;
    text-transform: uppercase;
    color: #a4a4a4;
    font-family: sans-serif;
`

const WrappedContent = styled.div`
    margin-top: 130px;
    
    & ul li:nth-child(1) {
                margin-top: 40px;
        }
    & ul li:nth-child(2){
                margin-top: 10px;
        }
`

const ContentDesc = styled.p`
    margin-top: 130px;
    color: #555;
    font-weight: 300;   
    font-size: calc(19px + 0 * (100vw - 960px) / 960);
    line-height: 2;
    letter-spacing: 0.05em;
`


const Newsletter = styled.div`
    position: fixed;
    will-change: transform;
    left: 5.55556%;
    display: block;
    width: 13.66667%;
    bottom: 98.01px;

    @media(max-width: 981px){
        position: relative;
        width: 80%;
        bottom: 0;
        left: 0;
        height: auto;
        margin: 40px auto;
    }
`

const AboutInfoMain = styled.div`
    position: fixed;
    will-change: transform;
    right: 5.55556%;
    display: block;
    width: 11.11111%;
    bottom: 71.01px;

    @media(max-width: 981px){
        position: relative;
        width: 80%;
        bottom: 0;
        left: 0;
        height: auto;
        margin: 40px auto;
    }
`


export default About