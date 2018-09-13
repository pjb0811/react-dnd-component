import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

type Props = {
  index: number;
  listId: string | number;
  listName: string | number;
  item: any;
  removeItem: (index: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
};

const itemTarget = {
  hover(props: any, monitor: any, component: any) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;
    const sourceListName = monitor.getItem().listName;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBounding: any = findDOMNode(component);
    const hoverBoundingRect = hoverBounding.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (props.listName === sourceListName && props.listId === sourceListId) {
      props.moveItem(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  }
};

const itemSource = {
  beginDrag(props: any) {
    return {
      index: props.index,
      listId: props.listId,
      listName: props.listName,
      item: props.item
    };
  },

  endDrag(props: any, monitor: any) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (
      dropResult &&
      dropResult.listName === item.listName &&
      dropResult.listId !== item.listId
    ) {
      props.removeItem(item.index);
    }
  }
};

@DropTarget('ITEM', itemTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('ITEM', itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Item extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      item,
      isDragging,
      connectDragSource,
      connectDropTarget
    }: any = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(<div style={{ opacity }}>{item.child}</div>)
    );
  }
}

export default Item;
