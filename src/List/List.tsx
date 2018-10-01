import * as React from 'react';
import update from 'immutability-helper';
import Item from './Item';
import { DropTarget } from 'react-dnd';

type Props = {
  id: string | number;
  name: string | number;
  width: number;
  height: number;
  rows: number;
  style: any;
  activeStyle: any;
  canDrop: boolean;
  isOver: boolean;
  connectDropTarget: any;
};

type State = {
  list: Array<any>;
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

@DropTarget('ITEM', itemTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Container extends React.Component<Props, State> {
  state = {
    width: 200,
    height: 200,
    list: []
  };

  componentDidMount() {
    const { id, children } = this.props;
    const newChildren = Array.isArray(children)
      ? [...children]
      : children
        ? [children]
        : [];

    this.setState({
      list: newChildren.map((child, i) => {
        return {
          id: `${id}${i}`,
          child
        };
      })
    });
  }

  pushItem = (item: any) => {
    this.setState(
      update(this.state, {
        list: {
          $push: [item]
        }
      })
    );
  };

  removeItem = (index: number) => {
    this.setState(
      update(this.state, {
        list: {
          $splice: [[index, 1]]
        }
      })
    );
  };

  moveItem = (dragIndex: number, hoverIndex: number) => {
    const { list } = this.state;
    const dragItem = list[dragIndex];

    this.setState(
      update(this.state, {
        list: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        }
      })
    );
  };

  render() {
    const {
      width = 200,
      height = 200,
      rows = 1,
      style,
      activeStyle,
      canDrop,
      isOver,
      connectDropTarget
    } = this.props;
    const { list } = this.state;
    const isActive = canDrop && isOver;
    const listStyle = isActive ? activeStyle : style;

    return connectDropTarget(
      <div
        style={{
          ...listStyle,
          display: 'flex',
          width: width * rows,
          height: list.length ? height * Math.ceil(list.length / rows) : height,
          minHeight: height,
          overflow: 'auto',
          flexWrap: 'wrap'
        }}
      >
        {list.map((item: { id: number }, i) => {
          return (
            <Item
              key={item.id}
              index={i}
              item={item}
              listId={this.props.id}
              listName={this.props.name}
              removeItem={this.removeItem}
              moveItem={this.moveItem}
            />
          );
        })}
      </div>
    );
  }
}

export default Container;
