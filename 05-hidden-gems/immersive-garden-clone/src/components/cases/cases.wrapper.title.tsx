
import React from 'react'
import styled from 'styled-components'

type P = {
    caseTitle: string,
    caseDesc: string,
}

const CasesWrapperTitle = ({ caseTitle, caseDesc }: P) => (
    <>
        <Title>{ caseTitle }</Title>
        <Description>{caseDesc}</Description>
    </>
)


// Style
const Title = styled.h1`
    font-weight: 300;
    font-size: calc(36px + 0 * (100vw - 960px) / 960);
    line-height: 1.805555555555556;
    letter-spacing: .05em;
    font-family: serif;
`
const Description = styled.p`
    font-size: calc(20px + 0 * (100vw - 960px) / 960);
    line-height: 2;
    letter-spacing: 0;
    margin-top: 20px;
    color: #a4a4a4;
`

export default CasesWrapperTitle