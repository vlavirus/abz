import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tooltip.scss';

class Tooltip extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        content: PropTypes.string,
        position: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
    }

    static defaultProps = {
        children: 'Tooltip content',
        content: {},
        position: 'bottom'
    }

    state = {
        visible: false
    }

    show = () => {
        this.setVisible(true);
    }

    hide = () => {
        this.setVisible(false);
    }

    setVisible = visible => {
        this.setState({ visible });
    }

    render() {
        const {visible} = this.state;
        const { children, content, style, position } = this.props;

        const classes = classNames(
            'tooltip',
            position,

        );

        return (
            <span className="tooltip__wrapper"
            onMouseEnter={this.show}
            onMouseLeave={this.hide}
            >
               {visible &&  <span style={style} className={classes}>{content}</span>}
                <span 
                    className="targetElement"
                >{children}</span>
            </span>
        )
    }
}

export default Tooltip;