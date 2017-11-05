import React from 'react';
import './block.css';
class Block extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let style = {
            backgroundColor: this.props.cell
        }
        return (
            <section className="block" style={style}>
            </section>
        );
    }
}

export default Block;