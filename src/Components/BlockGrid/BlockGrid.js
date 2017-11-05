import React from 'react';
import BlockRow from '../BlockRow/BlockRow';
import './block-grid.css';

export default class BlockGrid extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {rows} = this.props;
        return(
            <section className="block-grid">
                {rows.map((data, i) => {
                    return <BlockRow key={i} cells={data}/>
                })}
            </section>
        );
    }
}