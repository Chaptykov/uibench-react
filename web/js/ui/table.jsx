import React from 'react';

class TableCell extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.text !== nextProps.text;
  }

  render() {
    return (<td className="TableCell">{this.props.text}</td>);
  }
}

class TableRow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render() {
    var data = this.props.data;
    var classes = 'TableRow';
    if (data.active) {
      classes = 'TableRow active';
    }
    var cells = data.props;

    var children = [(<TableCell key="-1" text={'#' + data.id}></TableCell>)];
    for (var i = 0; i < cells.length; i++) {
      children.push((<TableCell key={i} text={cells[i]}></TableCell>));
    }

    return (<tr className={classes} data-id={data.id}>{children}</tr>);
  }
}

export class Table extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render() {
    var i;
    var newItems;
    var data = this.props.data;
    var items = data.items;

    if (data.filter) {
      newItems = [];
      for (i = 0; i < items.length; i++) {
        if ((i % data.filter) === 0) {
          newItems.push(items[i]);
        }
      }
      items = newItems;
    }
    if (data.sort != null) {
      newItems = items.slice();
      newItems.sort(function(a, b) { return a.props[data.sort].localeCompare(b.props[data.sort]); });
      items = newItems;
    }

    var children = [];
    for (i = 0; i < items.length; i++) {
      var item = items[i];
      children.push((<TableRow key={item.id} data={item} />));
    }

    return (<table className="Table"><tbody>{children}</tbody></table>);
  }
}