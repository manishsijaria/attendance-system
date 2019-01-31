
import React from 'react';
import '../css/treenode.css';

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            parentNodeState: (this.props.node.parent_employee_id === null) ? this.props.node : null
        };
    }

    sumNodes = (node) => {
        if(node.childNodes  === undefined) {
            return 0 
        }
        var count =0;
        for(var i=0; i < node.childNodes.length; i++ ) {
            count += this.sumNodes(node.childNodes[i])
        }
        return node.childNodes.length;
    }

    setExpanded = (id, tree, value) => {
        if(tree.id === id) {
            if(value === undefined) {
                tree.expanded = !tree.expanded    
            }
            else {
                tree.expanded = value
            }
        }  
        if( !(tree.childNodes === undefined)) {
            for(var i=0; i < tree.childNodes.length; i++) {
                this.setExpanded(id, tree.childNodes[i])
            }
        }
        return tree;
    }

    //clicked the arrow up/down 
    toggle = (e) => {
        //this.setState({visible: !this.state.visible});
        var id = (typeof(e) === 'object') ? 1 : e
        if(this.state.parentNodeState !== null) { //Top parent node
            //alert('Top Node')
            var tree = this.setExpanded(id, this.state.parentNodeState )
            this.setState({ parentNodeState: tree  })
        } else { //child nodes
            //alert('child nodes')
            this.props.toggleExpanded(this.props.id)
        }
    }


    //clicked/selected the text/node text/name on the node.
    selected = (e) => {
        this.props.onHandelFocus(this.props.id)
        this.props.onNodeClick(e.currentTarget.dataset.id);
    }

    handelKeyPress = (e) => {
        let node = (this.state.parentNodeState !== null) ? this.state.parentNodeState : this.props.node 
        //let bexpandChildNodes = (this.props.expandChildNodes === undefined) ? node.expanded : this.props.expandChildNodes;
        switch (e.keyCode) {
            case 38: //up key 
                //alert('up key')
                //alert(this.props.id)
                var decrement = this.props.id - 1
                this.props.onHandelFocus(4)

                break;
            case 40: //down key
                //alert('down key')
                //alert(this.props.id)
                var counter = this.props.id;
                if(!node.expanded) {
                     counter += this.sumNodes(this.props.node)
                }
                //alert(counter + 1)
                this.props.onHandelFocus(counter + 1)
                
                break;
            case 37: //left key collapse
                //alert('left key')
                if(node.expanded === true) {
                    if((this.state.parentNodeState !== null)) {
                        this.toggle(1)
                    } else {                 
                        this.props.toggleExpanded(this.props.id)
                    }
                    //this.setState({visible: false})
                }
                break;
            case 39: //right key expand
                //alert('right key')
                if(node.expanded === false) {
                    if((this.state.parentNodeState !== null)) {
                        this.toggle(1)
                    } else {                 
                        this.props.toggleExpanded(this.props.id)
                    }
                    //this.setState({visible: true})
                }
                break;
            default:
                //do nothing
        }
    }
  
    componentDidUpdate(prevProps, prevState) {
        var span;
        if(this.props.node.parent_employee_id === null && this.props.focusIndex === 1) {
            span = this.refs.span
            span.focus()
        } else {        
            var thisID = this.refs[this.props.focusIndex]
            if(!thisID) return;
            //alert('here')
            span = thisID.refs.span;
            span.focus();        
        }
    }
    render() {
        let childNodes;
        let toggleClassName,ulStyle, nodeClassName;
        
        
        let node = (this.state.parentNodeState !== null) ? this.state.parentNodeState : this.props.node 
        let bexpandChildNodes = (this.props.expandChildNodes === undefined) ? node.expanded : this.props.expandChildNodes;
        if(node) {  
            //If the childnodes need to be expanded than only create child
            if(node.childNodes != null) {
                childNodes = node.childNodes.map((childNode, index) => {
                    return  <TreeNode key={index}  node={childNode} 
                                        id={childNode.id}
                                        nodeSelected={this.props.nodeSelected}
                                        onNodeClick={this.props.onNodeClick}

                                        toggleExpanded={ this.toggle }

                                        expandChildNodes={node.expanded}

                                        onHandelFocus={this.props.onHandelFocus}
                                        focusIndex={this.props.focusIndex}

                                        ref={childNode.id}
                                        > 
                            </TreeNode>
                })
            }
        
            //on toggeling up, visible=false, hide the li's in ul.
            //ulStyle property is applicable to this node's childNodes.
            if(bexpandChildNodes || (node.parent_employee_id === null)) {
                ulStyle = { display: "block"}
            } else {
                ulStyle = { display: "none"};
            } 

            //arrow character toggeling code
            toggleClassName = 'togglable';
            if (node.expanded && node.childNodes) {
                toggleClassName += ' togglable-down';
            } else if (this.props.node.childNodes){
                toggleClassName += ' togglable-up';
            }

            //node text selected, className code.
            nodeClassName = 'node'
            if(this.props.nodeSelected === node.name) {
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
                            data-id={node.name} 
                            tabIndex={0} 
                            onKeyDown={this.handelKeyPress}
                            ref={'span'}
                            >
                        {node.name + ' ' + node.id} 
                    </span>
                        
                    {/* childNodes */}
                    {node.childNodes && childNodes }
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