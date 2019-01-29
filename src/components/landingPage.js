import React from 'react'
import TreeNode from './treenode';

import { connect } from 'react-redux'
import { employeeTreeActions } from '../_actions'

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nodeSelected: '', refresh: false, focusIndex: 1};
    }
    
    componentWillMount() {
        const { dispatch, employeeTree } = this.props
        if(employeeTree === null) {
            dispatch(employeeTreeActions.getEmployeeTree())
        }
    }

    handelClick = (nodeValue) => {
        this.setState({ nodeSelected: nodeValue})
    }  
    
    handelFocus = (index) => {
        this.setState({focusIndex: index})
    }
    
    render() {
        const { employeeTree } = this.props
        if(!employeeTree ) { return null}
        return(
                <>
                    <div className='aside'>
                        <TreeNode   node={employeeTree}
                                    id={employeeTree.id} 
                                    nodeSelected={this.state.nodeSelected} 
                                    onNodeClick={this.handelClick} 

                                    focusIndex={this.state.focusIndex}
                                    onHandelFocus={this.handelFocus}
                        />                    
                    </div>
                    <div className='contents'> {this.state.nodeSelected} </div>
                </>
        )
    }
}

function mapStateToProps(state) {
    const { employeeTree } = state.employeeTreeGet
    return { employeeTree }
}

const connectedLandingPage = connect(mapStateToProps)(LandingPage)

export { connectedLandingPage as LandingPage}