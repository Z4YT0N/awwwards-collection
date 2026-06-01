
import React from 'react'
import styled from 'styled-components'


type construct = {
    infoTitle: string,
    children: any
}

const AboutInformation = ({ infoTitle, children }: construct) => (
    <React.Fragment>
        {/* <!-- Map info --> */}
        <MapLink href="https://goo.gl/maps/xQJnhd9ihVr" target="_blank" rel="noopener noreferrer nofollow">
            <Title>{infoTitle}</Title>
            <ContentInfo>
                {children}
            </ContentInfo>
        </MapLink>

        {/* <!-- Phone info -->  */}
        <Phone href="tel:+33 (0)1 75 50 05 85" target="_blank" rel="noopener noreferrer nofollow">
            <PhoneText>+33 (0)1 75 50 05 85</PhoneText>
        </Phone>

        {/* <!-- Social Media --> */}
        <div>
            <Separator />
            <SocialMediaLists>
                <SCList>
                    <a href="https://www.facebook.com/immersive.g/" target="_blank" rel="noopener noreferrer nofollow">facebook</a>
                </SCList>
                <SCList>
                    <a href="https://twitter.com/Immersive_g" target="_blank" rel="noopener noreferrer nofollow" >twitter</a>
                </SCList>
                <SCList>
                    <a href="https://www.behance.net/immersive-g" target="_blank" rel="noopener noreferrer nofollow">behance</a>
                </SCList>
                <SCList>
                    <a href="https://www.linkedin.com/company/immersive-garden/" target="_blank" rel="noopener noreferrer nofollow">linkedIn</a>
                </SCList>
            </SocialMediaLists>
        </div>
    </React.Fragment>
)

//Style
const Title = styled.h4`
    color: #a4a4a4;
    letter-spacing: .05em;
    font-size: calc(14px + 0 * (100vw - 960px) / 960);
    line-height: 1.785714285714286;
`
const MapLink = styled.a`
    display: 'inline-block'; 
    position: 'relative';
`
const ContentInfo = styled.div`
    letter-spacing: .05em;
    color: #555;
    font-size: calc(14px + 0 * (100vw - 960px) / 960);
    line-height: 1.785714285714286;
    margin-top: 5px;
`
const Phone = styled.a`
    transform: translateZ(0);
    opacity: .5;
    transition: opacity .1s cubic-bezier(.23,1,.32,1), color .2s ease;
    will-change: opacity;
    margin-top: 10px;
    position: relative;
    display: inline-block;
    color: #a4a4a4;

    &:hover {
        color: #fff;
    }
`
const PhoneText = styled.span`
    font-size: calc(14px + 0 * (100vw - 960px) / 960);
    line-height: 1.785714285714286;
    letter-spacing: .05em;
`
const Separator = styled.div`
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    opacity: .5;
    width: 60%;
    background-color: #555;
`
const SocialMediaLists = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    -webkit-margin-before: 0;
    text-decoration: none;
`
const SCList = styled.li`
    color: #555;    
    letter-spacing: .05em;
    font-size: calc(14px + 0 * (100vw - 960px) / 960);
    line-height: 1.785714285714286;
    margin: 0;
`
export default AboutInformation