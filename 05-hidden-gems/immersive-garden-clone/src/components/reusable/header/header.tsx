
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import source from '../../../config/MediaSource'
import FlexDisplay from '../layout/flex.reusable'

type Props = {
    to?: string,
    menuName?: string,
    getClass?: any,
    src?: string,
    brand?: any,
    brandVisibility?, headerSearchVisibility?, backLinkVisibility?: boolean,
    headerShowCategory?: () => void,
    onCloseTextClick?: () => void,
    closeText?: string,
    addClass?: string,
    headerRef?: string,
    backToLink?: () => void
}


const Header = ({ 
    addClass, to, 
    backLinkVisibility, 
    menuName, getClass, 
    brandVisibility, 
    headerSearchVisibility, 
    headerShowCategory, 
    closeText, 
    onCloseTextClick,
    headerRef,
    backToLink  }: Props) => {

    //Show Menu Or Not
    const MenuName: React.FC = () => menuName ? (
        <Links to={to} className={getClass}>{menuName}</Links>) : (
            <CloseText onClick={onCloseTextClick}>{closeText}</CloseText>
        )

    return (
        <HeaderMain className={addClass ? `${addClass}` : null} ref={headerRef}>
            <FlexDisplay justify='space-between' align='center'>
                <HeaderColumn>
                    {/* <!--- Brand ---> */}
                    {   brandVisibility ? (
                            <Brand>
                                <Link to="/" style={{ marginTop: '7px' }}>
                                    <img style={{ width: '100%' }}
                                        alt="Immersive Garden - Logotype"
                                        title="Immersive Garden - Logotype"
                                        src={source.global.logoSmall}
                                    />
                                </Link>
                            </Brand>
                    ) : undefined }


                    {/* <!--- Search ---> */}
                    {   headerSearchVisibility ? (
                            <Search searchVisibility={headerSearchVisibility} onClick={headerShowCategory} >
                                <FlexDisplay align='center'>
                                    <Circle></Circle>
                                    <Text>Search By</Text>
                                </FlexDisplay>
                            </Search>
                    ) : undefined }


                    {/* <!-- Back --> */}
                    { backLinkVisibility ? (
                            <Back onClick={backToLink}><span>Back</span></Back>
                        ) : undefined }

                </HeaderColumn>

                <HeaderColumn>
                    <HeaderMenu>
                        <MenuName />
                    </HeaderMenu>
                </HeaderColumn>
            </FlexDisplay>
        </HeaderMain>
    )
}

const HeaderMain = styled.header`
    height: 20px;
    width: 89%;
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
`
const HeaderMenu = styled.div`
    text-align: right;
`
const Links = styled(Link)`
    color: #555;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.8;
    letter-spacing: .34em;
    text-transform: uppercase;
    width: 110px;
    float: right;
    transition: color 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    &.active {
        color: #0c0c0d;
    }
    .is-color-black & {
        color: #000;
    }

    @media(max-width: 980px){
        margin-right: 20px;
    }
`
const CloseText = styled.span`
    color: #555;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.8;
    letter-spacing: .34em;
    text-transform: uppercase;
    width: 110px;
    float: right;
    transition: color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    cursor: pointer;
`
const HeaderColumn = styled.div`
    width: 14.286%;
    
    @media(max-width: 981px){
        width: 30%;
    }

`
const Brand = styled.div`
    position: relative;
    float: left;

    @media(max-width: 980px){
        display: none;
    }
`

//Search
const Search = styled.div`
    margin-left: -42px;
    cursor: pointer;
    transition: opacity .5s cubic-bezier(.23,1,.32,1), visibility .5s;
    will-change: opacity,visibility;

    @media (max-width: 980px){
        margin-left: 0;
    }
`
const Circle = styled.div`
    width: 18px;
    height: 18px;
    border: 2px solid #a4a4a4;
    border-radius: 50%;
`
const Text = styled.span`
    color: #a4a4a4;
    text-transform: uppercase;
    font-weight: 700;
    font-size: calc(8.9px + 0 * (100vw - 960px) / 960);
    line-height: 1.5;
    letter-spacing: .2em;
    margin-left: 20px;
`

//Back link
const Back = styled.div`
    position:absolute;
    top: 0;
    color: #000;
    transform: translateZ(0);
    transition: color .5s;
    will-change: color;
    text-transform: uppercase;
    font-weight: 700;
    font-size: calc(13px + 0 * (100vw - 960px) / 960);
    line-height: 1.846153846153846;
    letter-spacing: .3em;
    cursor: pointer;

    @media(max-width: 980px){
        left: 20px;
    }
`

export default Header