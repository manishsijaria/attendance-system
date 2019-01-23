
import React from 'react';
import '../css/treenode.css';

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: (this.props.expandChildNodes === undefined) ? true : this.props.expandChildNodes};
    }

    //clicked the arrow up/down 
    toggle = (e) => {
        this.setState({visible: !this.state.visible});
        //alert(this.state.visible)
    }

    //clicked/selected the text/node text/name on the node.
    selected = (e) => {
        this.props.onNodeClick(e.currentTarget.dataset.id);
    }

    handelKeyPress = (e) => {
        //alert('here')
        switch (e.keyCode) {
            case 38: //up key 
                alert('up key')
                break;
            case 40: //down key
                alert('down key')
                break;
            case 37: //left key collapse
                //alert('left key')
                if(this.state.visible === true) {
                    this.setState({visible: false})
                }
                break;
            case 39: //right key expand
                //alert('right key')
                if(this.state.visible === false) {
                    this.setState({visible: true})
                }
                break;
            default:
                //do nothing
        }
    }
    render() {
        let childNodes;
        let toggleClassName,ulStyle, nodeClassName;
        let bexpandChildNodes = (this.props.expandChildNodes === undefined) ? true : this.props.expandChildNodes;

        if(this.props.node) {    
            if(this.props.node.childNodes != null) {
                childNodes = this.props.node.childNodes.map((node, index) => {
                    return  <TreeNode key={index}  node={node} 
                                        nodeSelected={this.props.nodeSelected}
                                        onNodeClick={this.props.onNodeClick}
                                        expandChildNodes={this.state.visible}> 
                            </TreeNode>
                            
                })
            }
        
            //on toggeling up, visible=false, hide the li's in ul.
            //ulStyle property is applicable to this node's childNodes.
            if(!bexpandChildNodes) {
                ulStyle = { display: "none"};
            } else {
                ulStyle = { display: "block"}
            }

            //arrow character toggeling code
            toggleClassName = 'togglable';
            if (this.state.visible && this.props.node.childNodes) {
                toggleClassName += ' togglable-down';
            } else if (this.props.node.childNodes){
                toggleClassName += ' togglable-up';
            }

            //node text selected, className code.
            nodeClassName = 'node'
            if(this.props.nodeSelected === this.props.node.name) {
                nodeClassName += ' node-selected';
            } else {
                nodeClassName += ' node-deselected';
            }
        } else {
            return null
        }
        
        return(
            <ul style={ulStyle} >   
                <li className='li-treeview'   >
                    {/* toggle up down arrow */}
                    <span className={toggleClassName} onClick={this.toggle}>  </span>

                    {/* node attributes*/}
                    <span   onClick={this.selected} 
                            className={nodeClassName} 
                            data-id={this.props.node.name} 
                            tabIndex={0} 
                            onKeyDown={this.handelKeyPress}
                            >
                        {this.props.node.name} 
                    </span>
                
                    {/* childNodes */}
                    {this.props.node.childNodes && childNodes }

                </li>
            </ul>
        );
    }
}

export default TreeNode;

/*
<ul style={ulStyle} >
</ul>
*/
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