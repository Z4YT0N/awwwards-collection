import React from 'react'
import styled from 'styled-components'

type Props = {
    onClick: () => void,
}

const OutsideArea = ({ onClick }: Props) => <Area onClick={onClick}></Area>

const Area = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 1;
`

export default OutsideArea