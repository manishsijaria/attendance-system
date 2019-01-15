
import React from 'react';
import '../css/treenode.css';

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: true};
    }

    //clicked the arrow up/down 
    toggle = (e) => {
        this.setState({visible: !this.state.visible});
    }

    //clicked/selected the text/node text/name on the node.
    selected = (e) => {
        this.props.onNodeClick(e.currentTarget.dataset.id);
    }

    render() {
        let childNodes;
        let toggleClassName,ulStyle, nodeClassName;
        
        if(this.props.node.childNodes != null) {
            childNodes = this.props.node.childNodes.map((node, index) => {
                return <li key={index} className='li-treeview'>
                            <TreeNode   node={node} 
                                        nodeSelected={this.props.nodeSelected}
                                        onNodeClick={this.props.onNodeClick}
                                        >
                            </TreeNode>
                        </li>
            })
        }
        //arrow character toggeling code
        toggleClassName = 'togglable';
        if (this.state.visible && this.props.node.childNodes) {
            toggleClassName += ' togglable-down';
        } else if (this.props.node.childNodes){
            toggleClassName += ' togglable-up';
        }
       
        //on toggeling up, visible=false, hide the li's in ul.
        if(!this.state.visible) {
            ulStyle = { display: "none"};
        }

        //node text selected, className code.
        nodeClassName = 'node'
        if(this.props.nodeSelected === this.props.node.title) {
            nodeClassName += ' node-selected';
        } else {
            nodeClassName += ' node-deselected';
        }

        return(
            <ul style={{margin:0, padding: 0, display: "inline-block"}}>
                
                <li className='li-treeview'>
                    {/* toggle up down arrow */}
                    <span className={toggleClassName} onClick={this.toggle}>  </span>

                    {/* node attributes*/}
                    <span onClick={this.selected} className={nodeClassName} data-id={this.props.node.title}>
                        {this.props.node.title} 
                    </span>
                
                    {/* childNodes */}
                    {this.props.node.childNodes && 
                        <ul style={ulStyle}>
                            {childNodes}
                        </ul>
                    }
                </li>
            </ul>
        );
    }
}

export default TreeNode;
/*
<ul id="myUL">
  <li><span class="caret">Beverages</span>
    <ul class="nested">
      <li>Water</li>
      <li>Coffee</li>
      <li><span class="caret">Tea</span>
        <ul class="nested">
          <li>Black Tea</li>
          <li>White Tea</li>
          <li><span class="caret">Green Tea</span>
            <ul class="nested">
              <li>Sencha</li>
              <li>Gyokuro</li>
              <li>Matcha</li>
              <li>Pi Lo Chun</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
*/