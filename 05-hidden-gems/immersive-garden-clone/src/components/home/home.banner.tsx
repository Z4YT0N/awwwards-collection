import React from "react";
import styled from 'styled-components'

import OutsideWrapper from './home.outside'
import source from '../../config/MediaSource'

type Props = {
    onClick: () => void,
    style: any
}

const Banner = ({ onClick, style }: Props) => (
    <Main style={style}>
        <OutsideWrapper onClick={onClick} />
        <BannerContainer>
            <Brand>
                <Image src={source.global.logo} alt="Immersive Garden - Logotype" />
            </Brand>
        </BannerContainer>
    </Main>
)


/* Style */
const Main = styled.div`
    color: #fff;
    height: 100vh;
    display: flex;
    align-items: center;
    transition: all ease-out;
    position: relative;
    cursor: url(${source.global.cursor}), auto;
    will-change: transform, background-color;
    transition: transform 1s cubic-bezier(.23, 1, .32, 1) !important;
`
const BannerContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    position: relative;
    z-index: 5;
`
const Brand = styled.div`
    position: absolute;
    top: 50%;
    left: -5px;
    min-width: 100%;
    max-width: 498px;
    transform: translateY(-50%);
    margin: 0px 0 0px 20px;
`
const Image = styled.img`
    opacity: .55;
    width: 100%;
    max-width: 35%;

    @media (max-width: 980px){
        max-width: 80%;
    }
`

export default Banner