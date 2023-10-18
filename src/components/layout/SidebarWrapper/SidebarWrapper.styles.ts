import styled from 'styled-components'

export const SidebarWrapper = styled.div`
    width: 100%;
    display:flex;
    align-items: stretch;

    // todo remove this and do it right
    :global {
        body {
            max-height: 100%;
            height: 100%;
        }
    }
`