
import React from 'react'
import styled from 'styled-components'

type C = {
    imgSource: string,
    imgTitle: string,
    imgAlt: string,
}

const CasesImage = ({ imgSource, imgTitle, imgAlt }:C) => (
    <CasesImageMain>
        <img width="100%" alt={`Immersive Garder - ${imgAlt}`} src={imgSource} title={`Immersive Garder - ${imgTitle}`}></img>
    </CasesImageMain>
)



//Style
const CasesImageMain = styled.div`
    margin-top: 140px;
    position: relative;
`

export default CasesImage