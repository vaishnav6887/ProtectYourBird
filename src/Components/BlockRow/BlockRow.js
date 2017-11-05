import React from 'react';
import Block from '../Block/Block';
import './block-row.css';

class BlockRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {cells} = this.props;
        return (
            <section className="block-row">
                {cells.map((data, i) => {
                    return <Block key={i} cell={data} />
                })}
            </section>
        )
    }
}
export default BlockRow;