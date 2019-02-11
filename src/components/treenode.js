
import React from 'react';
import '../css/treenode.css';

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            parentNodeState: (this.props.node.parent_employee_id === null) ? this.props.node : null,
            focusIndex: (this.props.node.parent_employee_id === null) ? 1 : -1
        };
    }

    sumNodes = (node) => {
        if(node.childNodes === undefined) {
            return 0
        }
        var count =0;   
        for(var i=0; i < node.childNodes.length; i++ ) {
            count +=  this.sumNodes(node.childNodes[i])
        }
        return count + node.childNodes.length;
    }

    getChildNodeIndex = (parentNode, childNode) => {
        for(var i = parentNode.childNodes.length -1 ; i >= 0; i--) {
            if(parentNode.childNodes[i].id === childNode.id) {
                return i
            }
        }
        return -1   //Will Never return
    }

    getLastExpandedNodeID = (node, passedID) => {
        var id
        if(node.expanded === false || node.id === passedID) {
            return node.id
        }
        else {
            for(var i = node.childNodes.length -1 ; i >= 0; i--) {
                id = this.getLastExpandedNodeID(node.childNodes[i],passedID)
                if(id) { break }
            }
        }
        return id;
    }

    setExpanded = (id, tree) => {
        if(tree.id === id) {
            tree.expanded = !tree.expanded
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
        let id = (typeof(e) === 'object') ? parseInt(e.currentTarget.id, 10) : e
        if(this.state.parentNodeState !== null) { //Top parent node
            //alert('Top Node')
            var tree = this.setExpanded(id, this.state.parentNodeState )
            this.setState({ parentNodeState: tree  })
        } else { //child nodes
            //alert('child nodes')
            this.props.toggleExpanded(id)
        }
    }

    handelFocus = (e) => {
        let id = (typeof(e) === 'object') ? parseInt(e.currentTarget.id, 10) : e
        if(this.state.parentNodeState !== null) {
            //alert('Top Node: ' + id)
            this.setState({ focusIndex: id })
        } else {
            //alert('child nodes' + id)
            this.props.onHandelFocus(id)
        }
    }

    //clicked/selected the text/node text/name on the node.
    selected = (e) => {
        let id = (typeof(e) === 'object') ? parseInt(e.currentTarget.id, 10) : e
        if(this.state.parentNodeState !== null) {
            this.handelFocus(id)
        } else {
            this.props.onHandelFocus(id)
        }
        this.props.onNodeClick(e.currentTarget.dataset.tag);
    }

    handelKeyPress = (e) => {
        let node = (this.state.parentNodeState !== null) ? this.state.parentNodeState : this.props.node 
        let counter
        switch (e.keyCode) {
            case 38: //up key 
                //alert('up key')
                //alert(this.props.id)
                counter  = this.props.id - 1 
                if(this.state.parentNodeState !== null) {
                    this.handelFocus(counter )
                } else {
                    var thisNodeIndex = this.getChildNodeIndex(this.props.parentNode, this.props.node)
                    var upperNodeIndex = thisNodeIndex -1
                    if(upperNodeIndex === -1) {
                        counter = this.props.parentNode.id
                    } else {
                        var upperNode = this.props.parentNode.childNodes[upperNodeIndex]
                        counter = this.getLastExpandedNodeID(upperNode, counter)        
                    }
                    this.props.onHandelFocus(counter)            
                }

                break;
            case 40: //down key
                //alert('down key')
                //alert(this.props.id)
                if(this.state.parentNodeState !== null) {
                    counter = this.state.parentNodeState.id;
                } else {
                    counter = this.props.id;
                }
                if(!node.expanded) {
                     counter += this.sumNodes(this.props.node)
                }
                //alert(counter + 1)
                if(this.state.parentNodeState !== null) {
                    this.handelFocus(counter + 1)
                } else {
                    this.props.onHandelFocus(counter + 1)
                }
                
                break;
            case 37: //left key collapse
                //alert('left key')
                if(node.expanded === true) {
                    if(this.state.parentNodeState !== null) {
                        this.toggle(this.state.parentNodeState.id)
                    } else {                 
                        this.props.toggleExpanded(this.props.id)
                    }
                } else { //move to the parent node id
                    if(this.state.parentNodeState !== null) {
                        this.handelFocus(this.state.parentNodeState.id)
                    } else {
                        this.props.onHandelFocus(this.props.parentNode.id)
                    }
                }
                break;
            case 39: //right key expand
                //alert('right key')
                if(node.expanded === false) {
                    if((this.state.parentNodeState !== null)) {
                        this.toggle(this.state.parentNodeState.id)
                    } else {                 
                        this.props.toggleExpanded(this.props.id)
                    }
                }
                break;
            case 13: //enter key pressed.
                this.props.onNodeClick(e.currentTarget.dataset.tag)
                break;
            default:
                //do nothing
        }
    }
  
    componentDidUpdate(prevProps, prevState) {
        var span;
        if((this.state.parentNodeState !== null) ) {
            if(this.state.focusIndex === 1) {   //Top Node
                span = this.refs.span
                span.focus() 
            } else {                           //Child of Top Node 
                this.setFocus(this.state.focusIndex)
            }
        } else { 
            this.setFocus(this.props.focusIndex)            
        }
    }

    setFocus = (index) => {
        var span,thisID;
        thisID = this.refs[index]
        if(!thisID) return;
        span = thisID.refs.span;
        span.focus();      
    }

    render() {
        let childNodes;
        let toggleClassName,ulStyle, nodeClassName;
        
        
        let node = (this.state.parentNodeState !== null) ? this.state.parentNodeState : this.props.node 
        let lfocusIndex = (this.state.parentNodeState !== null) ? this.state.focusIndex: this.props.focusIndex
        //alert('node:' + node.name + ' lfocusIndex:' + lfocusIndex)
        let bexpandChildNodes = (this.props.expandChildNodes === undefined) ? node.expanded : this.props.expandChildNodes;
        if(node) {  
            //If the childnodes need to be expanded than only create child
            if(node.childNodes != null) {
                childNodes = node.childNodes.map((childNode, index) => {
                    return  <TreeNode key={index}  
                                        node={childNode} 
                                        parentNode={node}
                                        id={childNode.id}
                                        nodeSelected={this.props.nodeSelected}
                                        onNodeClick={this.props.onNodeClick}

                                        toggleExpanded={this.toggle}

                                        expandChildNodes={node.expanded}

                                        onHandelFocus={this.handelFocus}
                                        focusIndex={lfocusIndex}

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
                    <span style={{whiteSpace: 'nowrap'}}>
                        {/* toggle up down arrow */}
                        <span className={toggleClassName} id={node.id} onClick={this.toggle}>  </span>
                        
                        {/* node attributes*/}
                        <span   onClick={this.selected} 
                                className={nodeClassName} 
                                data-tag={node.name} 
                                id={node.id}
                                tabIndex={0} 
                                onKeyDown={this.handelKeyPress}
                                ref={'span'}
                                >
                            {node.name} 
                        </span>
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