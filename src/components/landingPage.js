import React from 'react'
import TreeNode from './treenode';
import SplitPane from 'react-split-pane'
import '../css/react-split-pane.css'

import { connect } from 'react-redux'
import { employeeTreeActions } from '../_actions'


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nodeSelected: '', height: 0};
    }
    
    componentWillMount() {
        const { dispatch, employeeTree } = this.props

        this.updateDimensions();
        if(employeeTree === null) {
            dispatch(employeeTreeActions.getEmployeeTree())
        }
    }

    updateDimensions = () => {
        var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        //width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
        //height = body.getElementsByClassName('middleContents')[0].clientHeight;
        //alert(height)
        let divPaddingInOverallLayoutCSS = 5 * 2    //5px after Header  and 5px in Footer
        let heightOfHeaderAndFooter = 56 + 31       //56px for Header and 31px in Footer
        let middleContentHeight = height - heightOfHeaderAndFooter - divPaddingInOverallLayoutCSS
        middleContentHeight = (100 * middleContentHeight) / height
        middleContentHeight = Math.trunc(middleContentHeight) + "%"
        //alert(middleContentHeight)
        this.setState({ height: middleContentHeight });
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    handelClick = (nodeValue) => {
        this.setState({ nodeSelected: nodeValue})
    }  
   
    render() {
        const { employeeTree } = this.props
        if(!employeeTree ) { return null}
 
        //this.refs.middleContentsRef.getBoundingClientRect().height
        return(
                <>
                    <div className='middleContents' ref={'middleContentsRef'}>
                        <SplitPane split="vertical" minSize={70} defaultSize={300} style={{ height: this.state.height }}>
                            <div>
                                <TreeNode   node={employeeTree}
                                            nodeSelected={this.state.nodeSelected} 
                                            onNodeClick={this.handelClick} 
                                />    
                            </div>
                            <div>
                                {this.state.nodeSelected}
                            </div>
                        </SplitPane>
                    </div>
                    { /*
                        <div className='aside'>
                            <TreeNode   node={employeeTree}
                                        nodeSelected={this.state.nodeSelected} 
                                        onNodeClick={this.handelClick} 
                            />                    
                        </div>
                        <div className='contents'> {this.state.nodeSelected} </div>
                    */ }
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