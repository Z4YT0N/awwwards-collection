import React from 'react'
import { Link as A } from 'react-router-dom'
import styled from 'styled-components'
import FlexDisplay from '../reusable/layout/flex.reusable'

type Props = {
    caseTitle, caseDescription, poster, title, source: string,
    linkTo?: string,
    pathTo: any
}

const Content = ({ caseTitle, caseDescription, poster, title, source, pathTo }: Props) => (
    <CaseContainer>
        <FlexDisplay align="center">
            <CaseColumnLeft>
                <Text>Experience</Text>
            </CaseColumnLeft>
            <CaseColumnCenter>
                <Link to={`/cases/${pathTo}`}>
                    <CaseMedia>
                        <video preload="auto" autoPlay={true} loop={true} poster={poster} title={title}>
                            <source src={source} type="video/mp4"></source>
                        </video>
                    </CaseMedia>
                    <CaseContent>
                        <Heading>{caseTitle}</Heading>
                        <Description>{caseDescription}</Description>
                    </CaseContent>
                </Link>
            </CaseColumnCenter>
        </FlexDisplay>
    </CaseContainer>
)

/* Styles */
const CaseContainer = styled.div`
    &:not(:first-child){
        margin-top: 280px;
    }

    @media(max-width: 980px){
        & > div {
            flex-direction: column
            align-items: flex-start;
        }
        &:not(:first-child){
            margin-top: 120px;
        }
    }
`

const CaseColumnLeft = styled.div`
    width: 12.5%;

    @media (max-width: 980px){
        width: 100%;
        margin-left: 30px;
    }
`
const Text = styled.span`
    color: #a4a4a4;
    text-transform: uppercase;
    font-weight: 700;
    font-size: calc(9px + 0 * (100vw - 960px) / 960);
    line-height: 1.5;
    letter-spacing: .2em;
`
const CaseColumnCenter = styled.div`
    width: 81.25%;

    @media (max-width: 980px){
        width: 100%;
        margin-top: 20px;
    }
`

const Link = styled(A)`
    display: flex;
    flex-direction: row;
    
    @media (max-width: 980px){
        flex-direction: column
    }
`
const CaseMedia = styled.div`
    width: 61.538%;
    max-height: 416px;
    position: relative;
    overflow: hidden;

    @media (max-width: 980px){
        width: 100%;
    }
`

const CaseContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30.769%;
    margin-left: 7.692%;

    @media (max-width: 980px){
        width: 100%;
        margin-top: 20px;
    }
`

const Heading = styled.h3`
    font-weight: 300;
    font-size: calc(36px + 0 * (100vw - 960px) / 960);
    line-height: 1.25;
    letter-spacing: .05em;
`

const Description = styled.p`
    font-size: 13px;
    width: 90%;
    color: #a4a4a4;
    letter-spacing: .05em;
    line-height: 2;
    margin-top: 40px;

    @media(max-width: 980px){
        display: none;
    }
`

export default Content
