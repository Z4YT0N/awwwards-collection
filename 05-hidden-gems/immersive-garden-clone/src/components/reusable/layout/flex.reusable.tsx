import React from 'react'
import styled from 'styled-components'

type Props = {
    children: any,
    justify?: 'center' | 'space-between' | 'flex-start' | 'flex-end',
    align?: 'center' | 'flex-end',
    addStyle?: object,
    className?: string
}

const Flex = ({ children, justify, align, addStyle, className }: Props) => {
    let componentProps = {
        justifyContentStyled: justify,
        alignItemsStyled: align,
        style: addStyle
    }

    return (
        <FlexContainer className={className} { ...componentProps }>
            { children }
        </FlexContainer>
    )
}

const FlexContainer = styled.div`
    display: flex;
    justify-content: ${props => props.justifyContentStyled};
    align-items: ${props => props.alignItemsStyled};
`

export default Flex