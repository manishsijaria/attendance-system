import React from 'react'
import TreeNode from './treenode';


var tree = {
    title: "howdy",
    childNodes: [
        {title: "bobby"},
        {title: "suzie", childNodes: [
            {title: "puppy", childNodes: [
                {title: "dog house"}
            ]},
            {title: "cherry tree"}
        ]}
    ]
  }
  
export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nodeSelected: ''};
      }
    handelClick = (nodeValue) => {
        this.setState({ nodeSelected: nodeValue})
    }    
    render() {
        return(
                <>
                    <div className='aside'>
                        <TreeNode   node={tree} 
                                    nodeSelected={this.state.nodeSelected} 
                                    onNodeClick={this.handelClick} 
                        />                    
                    </div>
                    <div className='contents'> {this.state.nodeSelected} </div>
                </>
        )
    }
}