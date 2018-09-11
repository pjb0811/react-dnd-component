import * as React from 'react';
import { DragDropContext, DragLayer } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
const update = require('immutability-helper');

const style = {
  width: 400,
  height: 400
};

export interface ContainerState {
  cardsById: { [key: string]: any };
  cardsByIndex: any[];
}

@DragDropContext(HTML5Backend)
@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))
class Container extends React.Component<{}, ContainerState> {
  pendingUpdateFn: any;
  requestedFrame: number | undefined;

  constructor(props: {}) {
    super(props);

    const cardsById: { [key: string]: any } = {};
    const cardsByIndex = [];
    const { children } = this.props;
    const newChildren = Array.isArray(children)
      ? [...children]
      : children
        ? [children]
        : [];

    for (let i = 0; i < newChildren.length; i += 1) {
      const card = { id: i, text: newChildren[i] };
      cardsById[card.id] = card;
      cardsByIndex[i] = card;
    }

    this.state = {
      cardsById,
      cardsByIndex
    };
  }

  componentWillUnmount() {
    if (this.requestedFrame !== undefined) {
      cancelAnimationFrame(this.requestedFrame);
    }
  }

  render() {
    const { cardsByIndex } = this.state;

    return (
      <div style={style}>
        {cardsByIndex.map(card => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            moveItem={this.moveItem}
          />
        ))}
      </div>
    );
  }

  scheduleUpdate = (updateFn: any) => {
    this.pendingUpdateFn = updateFn;

    if (!this.requestedFrame) {
      this.requestedFrame = requestAnimationFrame(this.drawFrame);
    }
  };

  drawFrame = () => {
    const nextState = update(this.state, this.pendingUpdateFn);
    this.setState(nextState);

    this.pendingUpdateFn = undefined;
    this.requestedFrame = undefined;
  };

  moveItem = (id: string, afterId: string) => {
    const { cardsById, cardsByIndex } = this.state;

    const card = cardsById[id];
    const afterCard = cardsById[afterId];

    const cardIndex = cardsByIndex.indexOf(card);
    const afterIndex = cardsByIndex.indexOf(afterCard);

    this.scheduleUpdate({
      cardsByIndex: {
        $splice: [[cardIndex, 1], [afterIndex, 0, card]]
      }
    });
  };
}

export default Container;
