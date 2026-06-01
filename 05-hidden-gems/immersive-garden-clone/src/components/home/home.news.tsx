import React from "react";
import styled from 'styled-components'
import source from '../../config/MediaSource'

import OutsideWrapper from './home.outside'

type Props = {
    onClick: () => void,
    style: any,
}

const HomeNews = ({ onClick, style }: Props) => {
    return (
        <NewsContainer style={style}>
            <OutsideWrapper onClick={onClick} />
            <HomeNewsRow>
                <ColumnLeft>
                    <Subtitle>
                        <Text>Latest news</Text>
                    </Subtitle>
                </ColumnLeft>
                <ColumnRight>
                    <Link rel="nofollow noreferrer noopener" href="https://www.facebook.com/immersive.g/photos/a.850906044922470.1073741828.843690335644041/1884925721520492/?type=3&theater" target="_blank">
                        <h2><span>Studio Of The Year 2017 by both Awwwards <br /> and CSS Design Awards</span></h2>
                    </Link>
                </ColumnRight>
            </HomeNewsRow>
        </NewsContainer>
    )
}

/* Styles */
const NewsContainer = styled.div`
    border-top: solid 1px #000;
    color: #fff;
    height: 100vh;
    display: flex;
    align-items: center;
    cursor: url(${source.global.cursor}), auto;
    position: relative;
    will-change: transform, background-color;
    transition: transform 1s cubic-bezier(.23, 1, .32, 1) !important;

    @media (max-width: 980px){
        flex-direction: column;
    }
`

const HomeNewsRow = styled.div`
    width: 78%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;

    @media (max-width: 980px){
        position: relative;
        top: 25%;
        flex-direction: column;
    }
`

const ColumnLeft = styled.div`
    width: 21.429%;
    height: 100%;
    z-index: 5;

    @media (max-width: 980px){
        width: 100%;
    }
`

const ColumnRight = styled.div`
    width: 78.571%;
    z-index: 5;

    @media(max-width:980px){
        width: 100%;
    }
`

const Subtitle = styled.div`
    margin-top: 27px;
`

const Text = styled.span`
    font-weight: 700;
    font-size: calc(12px + 0 * (100vw - 960px) / 960);
    line-height: 1.8;
    letter-spacing: .3em;
    color: #555;
    text-transform: uppercase;
`
const Link = styled.a`
    font-size: 30px;
    line-height: 2;
    letter-spacing: .2em;
    font-family: serif;
    text-transform: uppercase;
    color: #a4a4a4;
    margin-right: 9%;
    z-index: 999;
    
    @media only screen and (min-width: 981px) and (max-width: 1099px){
        font-size: 22px;
    }
    
    @media (max-width: 980px){
        font-size: 20px;
        margin-top: 20px;
        margin-right: 0;

        & br {
            display: none;
        }
    }
`

export default HomeNews