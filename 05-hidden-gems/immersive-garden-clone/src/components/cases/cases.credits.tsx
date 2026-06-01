
import React from 'react'
import styled from 'styled-components'

import MediaSource from '../../config/MediaSource'
import FlexDisplay from '../reusable/layout/flex.reusable'

type P = {
    caseCreditItem: any,
    caseLiveUrl: string,
}

const CasesCredits = ({ caseCreditItem, caseLiveUrl }: P) => (
    <>
        {caseCreditItem.map((item, index): any => (
            <CaseCreditsContainer key={index}>
                <CaseCreditsTitle>{item.title}</CaseCreditsTitle>
                <CaseCreditsDesc>
                    {item.desc.join(', ')}
                </CaseCreditsDesc>
            </CaseCreditsContainer>
        ))}

        <a href={caseLiveUrl} rel="noopener noreferrer" style={{ marginTop: '40px' }} target="_blank">
            <FlexDisplay align="center" justify="flex-start">
                <TextLink>Launch</TextLink>
                <img alt="arrow-img" src={MediaSource.arrow} style={{ marginLeft: '20px', width: '30px' }} />
            </FlexDisplay>
        </a>
    </>
)

const CaseCreditsContainer = styled.dl`
    margin-top: 20px;
    
    &:first-child {
        margin-top: 0;
    }
`
const CaseCreditsTitle = styled.dt`
    text-transform: uppercase;
    color: #000;
    font-weight: 700;
    font-size: calc(10px + 0 * (100vw - 960px) / 960);
    line-height: 1.5;
    letter-spacing: .2em;
`
const CaseCreditsDesc = styled.dd`
    color: #a4a4a4;
    font-size: calc(20px + 0 * (100vw - 960px) / 960);
    line-height: 2;
    letter-spacing: 0;
`
const TextLink = styled.span`
    color: #000;
    font-weight: 700;
    font-size: calc(10px + 0 * (100vw - 960px) / 960);
    line-height: 1.5;
    letter-spacing: .2em;
    text-transform: uppercase;
`
export default CasesCredits