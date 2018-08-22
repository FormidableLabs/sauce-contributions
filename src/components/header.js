import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const HeaderBar = styled.header`
  background: #140152;
  margin-bottom: 1.45rem;
`

const HeaderContentContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 1.45rem 1.0875rem;
`

const Title = styled.h1`
  margin: 0;
`

const Header = ({ siteTitle }) => (
  <HeaderBar>
    <HeaderContentContainer>
      <Title>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </Title>
    </HeaderContentContainer>
  </HeaderBar>
)

export default Header
