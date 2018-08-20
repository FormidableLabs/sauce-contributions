import React from 'react'
import Markdown from 'react-remarkable'
import styled from 'styled-components'
import randomColor from 'randomcolor'
import { Badge, Flex, Box, Text } from 'rebass'
import formidagonIcon from '../images/formidagon.svg'
const Content = styled(Box)`
  a {
    color: #18206f;
  }
`

const Formidagon = styled.img.attrs({
  src: formidagonIcon,
  alt: 'FormidableLabs',
})`
  height: 32px;
  float: left;
`

const isFormidable = project =>
  project && project.org && project.org.toLowerCase() === 'formidablelabs'

const Projects = ({ projects }) => {
  if (!projects || !projects.length) {
    return null
  }

  return (
    <Box>
      {projects.map(p => (
        <>
          {isFormidable(p) ? <Formidagon /> : null}
          <Badge
            p={1}
            fontSize={1}
            fontWeight="normal"
            color="white"
            bg={
              isFormidable(p)
                ? '#c43a31'
                : randomColor({
                    seed: p.id,
                    luminosity: 'dark',
                    // hue: 'purple',
                  })
            }
          >
            {p.repo}
          </Badge>
        </>
      ))}
    </Box>
  )
}
const Contribution = props => {
  return (
    <Box bg="#eeeeee" p={3} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Text fontSize={1} fontWeight="bold" mb={2}>
          {props.name} logged {props.hours} hours
        </Text>
        <Text fontSize={1}>
          <i>{props.formattedDate}</i>
        </Text>
      </Flex>
      <Content>
        <Markdown options={{ linkify: true }}>{props.notes}</Markdown>
      </Content>

      <Projects projects={props.projects} />
    </Box>
  )
}

export default Contribution