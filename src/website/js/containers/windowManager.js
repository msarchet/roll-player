import React from 'react';
import Pane from '../components/pane';
import {filter} from 'lodash';

class WindowManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {panes : []}
  }

  getPaneId() {
    return Math.random().toString();
  }

  addPanes(panes) {
    this.setState({
      panes: this.state.panes.concat(panes)    
    });
  }

  renderPanes() {
    let allPanes = this.props.defaultPanes.concat(this.state.panes);
    return allPanes.map(model => { 
        let paneObj = model.model;
        return (<Pane 
          key={paneObj.paneId}
          paneName={paneObj.paneId} 
          {...paneObj.pane} 
          closePane={this.closePane.bind(this)}>
          {paneObj.content}
        </Pane>)
      });
  }


  closePane(paneName) {
    // remove the pane from the list of panes
    this.setState({
      panes: filter(this.state.panes, p => p.model.paneId !== paneName)
    });
  }

  render() {
    let panes = this.renderPanes();
    return (
        <div style={{width: '100%', height: '100%', position: 'relative', flex : 1}}>
          {panes}
        </div>
    )
  }
}  

export default WindowManager;

