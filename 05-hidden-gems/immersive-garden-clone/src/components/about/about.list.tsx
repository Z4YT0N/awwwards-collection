import React from 'react'
import styled from 'styled-components'


type T = {
    title?: string,
}

type P = {
    titleProps?: string,
    lists: any,
    additionStyle?: object
}

export const Title = ({ title }: T) => (
    <TitleColumn>{title}</TitleColumn>
)

const List = ({ titleProps, lists, additionStyle }: P) => (
    <ul style={{ listStyle: 'none' }}>
        { titleProps ? (
            <Title title={titleProps} />)
        : undefined }

        { lists.map((list, index) =>
            <ListItem key={index} style={additionStyle}>{list}</ListItem>
        )}
    </ul>
)


/* Styles */
const ListItem = styled.li`
    font-size: calc(20px + 0 * (100vw - 960px) / 960);
    line-height: 2;
    letter-spacing: 0;
    color: #555;

    &:nth-child(2){
        margin-top: 40px;
    }
    &:not(:nth-child(2)){
        margin-top: 10px;
    }
    
    @media(max-width: 981px){
        font-size: calc(17px + 0 * (100vw - 960px) / 960)
    }
`
const TitleColumn = styled.h4`
    text-transform: uppercase;
    color: #a4a4a4;
    font-size: calc(13px + 0 * (100vw - 960px) / 960);
    line-height: 1.846153846153846;
    letter-spacing: .3em;
    font-family: sans-serif;
`

export default List