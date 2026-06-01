
import React, { createRef } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Context from '../../context/'
import Header from '../reusable/header/header'
import FlexDisplay from '../reusable/layout/flex.reusable'
import CasesWrapperTitle from './cases.wrapper.title'
import CaseCredits from './cases.credits'
import CaseImage from './cases.image'
import mediasource from '../../config/MediaSource'

const Index = ({ match, history }) => {
    const ContextConsumer: any = React.useContext(Context);
    const ref:any = createRef();


    //ScrollToTop
    const scrollToTop = React.useCallback<any>(
        () => {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        },
        [ref],
    )

    // to top when routes change
    React.useEffect(() => {
        scrollToTop();
    }, [scrollToTop])

    //Check case URL
    let GETURL = match.url.replace('/cases/', '')
    let URLFILTER = ContextConsumer.contentProps.some(URL =>
        URL.caseTitle.toLowerCase().replace(/ +/g, "-") === GETURL
    )

    // <!--Redirect if parameter values not correctly-->
    if (!URLFILTER) return <Redirect to='/' />

    //Get case values 
    let GetCaseContext = ContextConsumer.contentProps.find(val =>
        val.caseTitle.toLowerCase().replace(/ +/g, "-") === GETURL
    )

    //Find next case url
    let findNextCaseIndex = ContextConsumer.contentProps.indexOf(GetCaseContext) + 1;
    let findLastCaseIndex = ContextConsumer.contentProps.indexOf(GetCaseContext);
    let findCaseItemLength = ContextConsumer.contentProps.length - 1;
    let findNextCaseTitle = findLastCaseIndex !== findCaseItemLength ? ContextConsumer.contentProps[findNextCaseIndex].caseTitle : null
    let nextCaseURL = findNextCaseTitle ? findNextCaseTitle.toLowerCase().replace(/ +/g, "-") : null



    // Prev Case URL 
    let prevNextCaseIndex = ContextConsumer.contentProps.indexOf(GetCaseContext) - 1;
    let CheckPrev = prevNextCaseIndex !== -1 ? ContextConsumer.contentProps[prevNextCaseIndex].caseTitle : null;
    let prevCaseURL = CheckPrev ? CheckPrev.toLowerCase().replace(/ +/g, "-") : null
    let classHasMargin = CheckPrev ? 'hasMargin' : null;



    let caseCreditItem = [
        {
            title: 'Role',
            desc: [
                'Conception',
                'Art direction',
                'Motion design',
                'Development'
            ]
        },
        {
            title: 'Agency',
            desc: ['Havas']
        },
        {
            title: 'Awards',
            desc: [
                'FWA of the Month',
                'Awwwards Site of the Month',
                'CSS Design Award Site of the Day'
            ]
        }
    ]

    let Props = {
        headerProps: {
            to: '/about-us',
            menuName: 'About Us',
            addClass: "is-color-black",
            backLinkVisibility: true,
            backToLink: () => history.goBack()
        }
    }

    //caseImage
    const CaseImgList = () => (
        GetCaseContext.caseImgDetail.map((caseItem, key) =>
            <CaseImage
                key={key}
                imgAlt={GetCaseContext.caseTitle}
                imgTitle={GetCaseContext.caseTitle}
                imgSource={caseItem}
            />
        )
    )

    return (
        <React.Fragment>
            <Header {...Props.headerProps} />

            <PCaseSection>
                {/* <!-- Scroll Top Target --> */}
                <div ref={ref}></div>

                {/* <!-- Container --> */}
                <Container>
                    <PCaseHeader>
                        <Text>Experience</Text>
                    </PCaseHeader>

                    <FlexDisplay className="_flexColumn" addStyle={{ marginTop: '60px' }}>
                        <ContentColumn>
                            <CasesWrapperTitle
                                caseTitle={GetCaseContext.caseTitle}
                                caseDesc={GetCaseContext.caseDescription}
                            />
                        </ContentColumn>
                        <ContentColumn>
                            <CaseCreditsMain>
                                <CaseCredits
                                    caseLiveUrl={GetCaseContext.url}
                                    caseCreditItem={caseCreditItem}
                                />
                            </CaseCreditsMain>
                        </ContentColumn>
                    </FlexDisplay>

                    <CaseImgList />

                    <div style={{ position: 'relative' }}>
                        {/* <!-- Prev/next Project -- > */}

                        <CasePreviousNext>
                            {
                                prevCaseURL ? (
                                    <CaseNextLink to={prevCaseURL}>
                                        <LinkText>Previous Project</LinkText>
                                        <Underline />
                                    </CaseNextLink>
                                ) : undefined
                            }
                            {
                                nextCaseURL ? (
                                    <CaseNextLink className={classHasMargin} to={nextCaseURL}>
                                        <LinkText>Next Project</LinkText>
                                        <Underline />
                                    </CaseNextLink>
                                ) : undefined
                            }
                        </CasePreviousNext>

                        {/* <!-- Back to top --> */}
                        <BackToTop onClick={scrollToTop}>
                            <img src={mediasource.arrowUp} alt="Back to top" title="Back to top" height="100%" />
                        </BackToTop>
                    </div>

                </Container>
            </PCaseSection>
        </React.Fragment>
    )

}

/* Style */
const PCaseSection = styled.section`
    background-color: #f7f7f7;
    padding: 1px;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    scroll-behavior: smooth;
`
const Container = styled.div`
    margin-top: 33.33333vh;
    margin-bottom: 200px;
    max-width: 1400px;
    width: 66.667%;
    margin-right: auto;
    margin-left: auto;

    @media(max-width: 980px){
        width: 100%;

        ._flexColumn {
            width: 80%;
            margin: 0 auto;
            flex-direction: column
        }
    }
`

const PCaseHeader = styled.div`
    margin-right: auto;
    margin-left: auto;
    padding-right: 30%;

    @media(max-width: 980px){
        width: 80%;
        margin: 0 auto;
        padding-right: 0;
    }
`
const Text = styled.span`
    text-transform: uppercase;
    color: #a4a4a4;
    font-weight: 700;
    font-size: calc(10px + 0 * (100vw - 960px) / 960);
    line-height: 1.5;
    letter-spacing: .2em;
`
const ContentColumn = styled.div`
    width: 50%;

    @media(max-width: 980px){
        width: 100%;
    }
`
const CaseCreditsMain = styled.aside`
    margin-top: 20px;
    display: block;
    padding-left: 32%;

    @media(max-width: 980px){
        margin-top: 50px;
        padding-left: 0;
    }
`
const CasePreviousNext = styled.div`
    width: 50%;
    margin: 0 auto;
    margin-top: 300px;
    text-align: center;

    @media(max-width: 980px){
        width: 100%;
    }
`
const CaseNextLink = styled(Link)`
    position: relative;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;

    &:hover span:nth-child(2){
        opacity: .2;
    }

    &.hasMargin {
        margin-left: 5.55556vw;
    }

`

const LinkText = styled.span`
    text-transform: uppercase;
    color: #555;
    font-weight: 700;
    font-size: calc(10px + 0 * (100vw - 960px) / 960);
    line-height: 1.5;
    letter-spacing: .2em;
    margin: 0;
`
const Underline = styled.span`
    position: absolute;
    width: 100%;
    bottom: -12px;
    transform: translateZ(0);
    height: 1px;
    opacity: 0;
    transition: opacity 1s cubic-bezier(.23,1,.32,1);
    will-change: opacity;
    left: 0;
    background-color: #000;
`
const BackToTop = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    height: 30px;
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        bottom: -10px;
        left: -10px;
        right: -10px;
        top: -10px;
    }

    @media(max-width: 980px){
        left: 50%;
        right: auto;
        bottom: -100px;
        transform: translateX(-50%);
    }
`

export default Index