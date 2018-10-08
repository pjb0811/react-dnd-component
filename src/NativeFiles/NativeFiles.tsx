import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dustbin from './Dustbin';
import Box from './Box';

@DragDropContext(HTML5Backend)
export default class Container extends React.Component {
  public render() {
    return (
      <div>
        <Dustbin>
          <Dustbin>
            <Dustbin />
          </Dustbin>
        </Dustbin>
        <Box />
      </div>
    );
  }
}
