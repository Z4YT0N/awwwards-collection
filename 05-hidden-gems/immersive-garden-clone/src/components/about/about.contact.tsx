
import React from 'react'
import styled from 'styled-components'
import Flex from '../reusable/layout/flex.reusable'
import MediaSource from '../../config/MediaSource'

type Props = {
    contactLists: any
}

type NewsLetterProps = {
    contactTitle: string
}

//contact information
const AboutContact = ({ contactLists }: Props) => (
    contactLists.map(
        (contactList, index) =>
            <ContactsItem key={index}>
                <Link href={`mailto:${contactList.content}`} rel="nofollow noreferrer noopener" target="_blank">
                    <ContactsTitle>{contactList.title}</ContactsTitle>
                    <ContactsContent>
                        {contactList.content}
                    </ContactsContent>
                </Link>
            </ContactsItem>
    )
)


//Newsletter
export const AboutNewsLetter = ({ contactTitle }: NewsLetterProps) => (
    <ContactsItem>
        <ContactsTitle>{contactTitle}</ContactsTitle>
        <Flex align="center" justify="center" addStyle={{ marginTop: '5px', borderBottom: '1px solid', borderColor: 'rgba(85,85,85,.5)' }}>
            <NewsletterInput type="email" name="email" autocapitalize="off" autocorrect="off" placeholder="Place your email address" />
            <NewsLetterSubmit>
                <img src={MediaSource.icon_submit} alt="Send my email" title="Send my email" style={{ width: '10px' }} />
            </NewsLetterSubmit>
        </Flex>
    </ContactsItem>
)


/* Style */
const ContactsItem = styled.div`
    margin-top: 40px;
    
    &:first-child {
      margin-top: 0px;  
    }
`
const ContactsTitle = styled.h4`
    text-transform: uppercase;
    color: #a4a4a4;
    font-size: calc(13px + 0 * (100vw - 960px) / 960);
    line-height: 1.846153846153846;
    letter-spacing: .3em;
`
const ContactsContent = styled.span`
    transform: translateZ(0);
    opacity: .5;
    transition: opacity .1s cubic-bezier(.23,1,.32,1), color .2s ease-out;
    will-change: transform;
    margin-top: 5px;
    display: inline-block;
    color: #a4a4a4;
    letter-spacing: .05em;
    font-size: calc(13px + 0 * (100vw - 960px) / 960);
    line-height: 1.785714285714286;
`
const Link = styled.a`
    display: 'inline-block';
    transition: .3s all ease-out;

    &:hover span{
        color: #fff;
    }
`

const NewsletterInput = styled.input`
    width: calc(100% - 22px);
    padding-bottom: 10px;
    border: 0 none;
    display: block;
    background-color: transparent;
    color: #a4a4a4;
    font-size: calc(13px + 0 * (100vw - 960px) / 960);
    line-height: 1.846153846153846;
    letter-spacing: 0;
    outline: 0;
    box-shadow: none;

    &::-webkit-input-placeholder {
        opacity: .3;
    }
`
const NewsLetterSubmit = styled.div`
    width: 22px;
    height: 22px;
    cursor: pointer;
    text-align: center;
    border-radius: 50px;
    background-color: #292727;
    margin-top: -10px;
`

export default AboutContact