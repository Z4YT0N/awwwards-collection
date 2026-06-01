
import React from "react";
import styled from 'styled-components'
import Context from '../../context'

import Header from "../reusable/header/header";
import Banner from './home.banner'
import HomeNews from './home.news'
import Content from './home.content'
import Menu from '../reusable/header/header.menu'


const Index = () => {
    const ContextConsumer = React.useContext(Context) as any;

    const [move, setMove] = React.useState({
        color: 10,
        transform: true,
        newTransform: false,
        mainTransform: false,
        visible: false,
    });


    //handlerChange
    const handlerChange = (action) => {
        switch (action.type) {
            case 'FIRST': {
                setMove({
                    ...move,
                    transform: !move.transform,
                    newTransform: !move.newTransform,
                });
                break
            }
            case 'SECOND': {
                setMove({
                    ...move,
                    mainTransform: !move.mainTransform
                })
                break
            }
            case 'VISIBLE': {
                setMove({
                    ...move,
                    visible: !move.visible
                })
                break
            }
            default: {
                return false
            }
        }
    }


    //state conditions
    let newTransformStyle: string =
        move.transform ? '-100%' : (move.newTransform ?
            'translateY(-100%)' : (move.mainTransform ? 'translateY(-200%)' : ''));

    let pushClassEl = move.mainTransform ? 'home-bg-active' : null,
        changeColorEl = move.mainTransform ? 'active' : null,
        searchVisibility = move.mainTransform ? true : false,
        menuVisibility = move.visible ? 'block': 'none'


    const CaseContent = () => 
        ContextConsumer.contentProps.map((item, id) => {
            let url = item.caseTitle.toLowerCase().replace(/ +/g, "-");
            return <Content key={id} pathTo={url} {...item} />
    })

    //Initial props
    const props = {
        headerProps: {
            to: '/about-us',
            menuName: 'About Us',
            headerSearchVisibility: searchVisibility,
            getClass: changeColorEl,
            headerShowCategory: () => handlerChange({ type: 'VISIBLE' }),
        },
        bannerProps: {
            onClick: () => handlerChange({ type: 'FIRST' }),
            style: { transform: newTransformStyle }
        },
        homeNewsProps: {
            onClick: () => handlerChange({ type: 'SECOND' }),
            style: { transform: newTransformStyle }
        },
        menuProps: {
            menuDisplay: menuVisibility,
            closeThisMenu: () => handlerChange({ type: 'VISIBLE' })
        }
    }


    return (
        <HomeMain>
            {/* {<!-- Header --> */}
            <Header {...props.headerProps}/>

            {/* {<!-- Container --> */}
            <HomeContainer className={pushClassEl}>
                <Banner {...props.bannerProps} />
                <HomeNews  {...props.homeNewsProps} />

                {/* {<!-- Scrolled content --> */}
                <SectionScroller style={props.bannerProps.style}>
                    <ContentSection>
                        <CaseContent />
                    </ContentSection>
                </SectionScroller>
            </HomeContainer>

            <Menu {...props.menuProps} />
        </HomeMain>
    )
}


/* Style */
const HomeMain = styled.div`
    position: relative
`
const HomeContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    transition: background 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    background: #000;

    &.home-bg-active{
        background: #f7f7f7;
    }
`
const SectionScroller = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: auto;
    overflow-x: hidden;
    will-change: transform, background-color;
    transition: transform 1s cubic-bezier(.23, 1, .32, 1) !important;
`

const ContentSection = styled.div`
    max-width: 1866.66667px;
    min-height: 100vh;
    padding-top: 130px;
    padding-bottom: 130px;
    overflow-x: hidden;
    margin-right: auto;
    margin-left: auto;
    padding-right: 5.556%;
    padding-left: 5.556%;

    @media (max-width: 980px){
        max-width: 100%;
        padding-left: 0;
        padding-right: 0;
    }
`

export default Index