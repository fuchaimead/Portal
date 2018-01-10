import React from 'react';
import EditorOld from './EditorOld';
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Segment
} from 'semantic-ui-react';

const LectureContentOld = () => (
  <Container>
    <Segment basic>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column textAlign='left'>
            <Button><Icon name='bars' />View All Content</Button>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button><Icon name='search' />Preview</Button>
            <Button><Icon name='wait' />History</Button>
            <Button color='red'><Icon name='remove circle' />Delete</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Divider />
    <EditorOld placeholder='Write something...' />
  </Container>
)

export default LectureContentOld;