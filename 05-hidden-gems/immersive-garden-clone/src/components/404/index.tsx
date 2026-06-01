
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NotFoundPages = () => (
    <LostSection>
        <LostColumn>
            <Text>404 not found</Text>
            <Links to="/">Back to home</Links>
        </LostColumn>
    </LostSection>
)


/* Styles */
const LostSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #f7f7f7;
`

const LostColumn = styled.div`
    text-align: center;
`
const Text = styled.div`
    text-transform: uppercase;
    color: #a4a4a4;
    font-weight: 700;
    font-size: calc(13px + 0 * (100vw - 960px) / 960);
    line-height: 1.84;
    letter-spacing: .3em;
`
const Links = styled(Link)`
    margin-top: 40px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: calc(13px + 0 * (100vw - 960px) / 960);
    line-height: 1.84;
    letter-spacing: .3em;
`


export default NotFoundPages