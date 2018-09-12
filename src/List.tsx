import * as React from 'react';
import update from 'immutability-helper';
import Card from './Item';
import { DropTarget } from 'react-dnd';

type Props = {
  id: number;
  list: Array<any>;
  canDrop: boolean;
  isOver: boolean;
  connectDropTarget: any;
};

type State = {
  cards: Array<any>;
};

const cardTarget = {
  drop(props: any, monitor: any, component: any) {
    const { id } = props;
    const sourceObj = monitor.getItem();
    if (id !== sourceObj.listId) component.pushCard(sourceObj.card);
    return {
      listId: id
    };
  }
};

@DropTarget('CARD', cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Container extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { cards: props.list };
  }

  pushCard(card: any) {
    this.setState(
      update(this.state, {
        cards: {
          $push: [card]
        }
      })
    );
  }

  removeCard(index: number) {
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 1]]
        }
      })
    );
  }

  moveCard(dragIndex: number, hoverIndex: number) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  }

  render() {
    const { cards } = this.state;
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    const style = {
      width: '200px',
      height: '404px',
      border: '1px dashed gray'
    };

    const backgroundColor = isActive ? 'lightgreen' : '#FFF';

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {cards.map((card, i) => {
          return (
            <Card
              key={card.id}
              index={i}
              listId={this.props.id}
              card={card}
              removeCard={this.removeCard.bind(this)}
              moveCard={this.moveCard.bind(this)}
            />
          );
        })}
      </div>
    );
  }
}

export default Container;
