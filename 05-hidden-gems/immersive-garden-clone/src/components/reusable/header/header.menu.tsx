import React from 'react'
import styled from 'styled-components'
import source from '../../../config/MediaSource'

type Props = {
    closeThisMenu: () => void,
    menuDisplay: string,
}

const HeaderMenu = ({ closeThisMenu, menuDisplay }: Props) => {
    const [state] = React.useState({
        name: [
            'Featured Projects',
            'Interactive Experience',
            'Corporate Sites / Branding',
            'Motions, Films & Photos',
            'All Projects'
        ]
    });


    const MenuName: React.FC = () => (
        <>{state.name.map((item, id) => (
            <MenuText onClick={() => console.log('Hello')} key={id}> {item} </MenuText>
        ))}</>
    )

    return (
        <MenuMain onClick={closeThisMenu} menuDisplayProps={menuDisplay}>
            <MenuHeader onClick={closeThisMenu}>
                <Text>Close</Text>
            </MenuHeader>
            <MenuContainer>
                <MenuCategory>
                    <MenuWrapper>
                        <MenuName />
                    </MenuWrapper>
                </MenuCategory>
            </MenuContainer>
        </MenuMain>
    )
}


/* Style */
const MenuMain = styled.section`
    display: ${props => props.menuDisplayProps};
    transition: display .3s cubic-bezier(.23,1,.32,1);
    will-change: opacity,visibility;
    position: fixed;
    width: 100%;
    background-color: #f7f7f7;
    z-index: 999;
`
const MenuHeader = styled.div`
    cursor: pointer;
    position: absolute;
    top: 70px;
    left: 5.55556vw;
    z-index: 3;
`
const Text = styled.span`
    font-size: calc(10px + 0 * (100vw - 960px) / 960);
    line-height: 1.5;
    letter-spacing: .2em;
    font-weight: 700;
    text-transform: uppercase;
`
const MenuContainer = styled.div`
    transform: translateZ(0);
    min-height: 100vh;
    padding-top: 40px;
    padding-right: 5.55556vw;
    padding-left: 5.55556vw;
    cursor: default;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    cursor: url(${source.global.cursorMenu}) 16 16,pointer;
    will-change: transform;
    overflow-y: scroll;
    position: relative;
`

const MenuCategory = styled.div`
    position: absolute;
    bottom: 20%;
    color: #000;
    margin-top: 20px;
    transform: translateZ(0);
    color: #a4a4a4;
    transition: color .5s cubic-bezier(.23,1,.32,1);
    will-change: color;

    &:first-child {
        margin-top: 0;
    }

    @media(max-width: 980px){
        bottom: 15%;
    }
`
const MenuWrapper = styled.div`
    cursor: pointer;
    overflow: hidden;
    display: inline-block;

    @media(max-width: 980px){
        overflow: auto;
    }
`

const MenuText = styled.span`
    font-size: calc(34px + 26 * (100vw - 960px) / 960);
    line-height: 1.5;
    letter-spacing: .2em;
    font-family: serif;
    text-transform: uppercase;
    font-weight: 300;
    display: block;
    -webkit-font-smoothing: antialiased;
    transition: .3s all ease-out;

    &:hover {
        color: #0c0c0d;
    }

    &:not(:first-child){
        margin-top: 20px;
    }

    @media(max-width: 980px){
        font-size: calc(42px + 26 * (100vw - 960px) / 960);
        
        &:not(:first-child){
            margin-top: 40px;
        }
    }
`


export default HeaderMenu