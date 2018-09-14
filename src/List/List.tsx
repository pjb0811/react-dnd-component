import * as React from 'react';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Item from './Item';
import update from 'immutability-helper';

type Props = {
  id: string | number;
  name: string | number;
  width: number;
  height: number;
  rows: number;
};

type State = {
  items: any;
};

const itemTarget = {
  drop(props: any, monitor: any, component: any) {
    const { id, name } = props;
    const sourceObj = monitor.getItem();

    if (name === sourceObj.listName && id !== sourceObj.listId) {
      component.pushItem(sourceObj.item);
    }

    return {
      listId: id,
      listName: name
    };
  }
};

@DragDropContext(HTML5Backend)
@DropTarget('ITEM', itemTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Container extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { id, children } = this.props;
    const newChildren = Array.isArray(children)
      ? [...children]
      : children
        ? [children]
        : [];

    this.state = {
      items: newChildren.map((child, i) => {
        return {
          id: `${id}${i}`,
          child
        };
      })
    };
  }

  pushItem = (item: any) => {
    this.setState(
      update(this.state, {
        items: {
          $push: [item]
        }
      })
    );
  };

  removeItem = (id: string) => {
    const { items } = this.state;
    const item = items.find((item: { id: string }) => item.id === id);
    const itemIndex = items.indexOf(item);

    this.setState(
      update(this.state, {
        items: {
          $splice: [[itemIndex, 1]]
        }
      })
    );
  };

  moveItem = (id: string, afterId: string) => {
    const { items } = this.state;
    const item = items.find((item: { id: string }) => item.id === id);
    const afterItem = items.find((item: { id: string }) => item.id === afterId);
    const itemIndex = items.indexOf(item);
    const afterIndex = items.indexOf(afterItem);

    this.setState(
      update(this.state, {
        items: {
          $splice: [[itemIndex, 1], [afterIndex, 0, item]]
        }
      })
    );
  };

  render() {
    const { width = 200, height = 200, rows = 1 } = this.props;
    const { items } = this.state;
    const style = {
      width: width * rows,
      height: height * Math.ceil(items.length / rows),
      overflow: 'auto',
      display: 'flex'
    };

    return (
      <div style={{ ...style, flexWrap: 'wrap' }}>
        {items.map((item: { id: string; child: React.ReactChild }) => {
          if (item) {
            return (
              <Item
                key={item.id}
                id={item.id}
                child={item.child}
                listId={this.props.id}
                listName={this.props.name}
                removeItem={this.removeItem}
                moveItem={this.moveItem}
              />
            );
          }

          console.log(item);

          return <div />;
        })}
      </div>
    );
  }
}

export default Container;
