import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactFauxDom from 'react-faux-dom';
import { select } from 'd3-selection';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';
import cloud from 'd3-cloud';

import {
  defaultFontSizeMapper, defaultClickEvent
} from './defaultMappers';


const fill = scaleOrdinal(schemeCategory10);

class WordCloud extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    font: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    fontSizeMapper: PropTypes.func,
    clickEvent: PropTypes.func,
    rotate: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
  }

  static defaultProps = {
    width: 700,
    height: 600,
    padding: 5,
    font: 'serif',
    fontSizeMapper: defaultFontSizeMapper,
    rotate: 0,
    clickEvent: defaultClickEvent
  }

  componentWillMount() {
    this.wordCloud = ReactFauxDom.createElement('div');
  }

  shouldComponentUpdate(newProps, newState) {
    return newProps.data[0].text !== this.props.data[0].text || newProps.width !== this.props.width || newProps.height !== newProps.height;
  }

  render() {
    const { data, width, height, padding, font, fontSizeMapper, rotate, clickEvent } = this.props;
    const wordCounts = data.map(
      text => ({ ...text })
    );

    // clear old words
    select(this.wordCloud).selectAll('*').remove();

    // render based on new data
    const layout = cloud()
      .size([width, height])
      .font(font)
      .words(wordCounts)
      .padding(padding)
      .rotate(rotate)
      .fontSize(fontSizeMapper)
      .on('end', words => {
        select(this.wordCloud)
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('font-family', font)
          .style('fill', (d, i) => fill(i))
          .attr('text-anchor', 'middle')
          .attr('transform',
          d => `translate(${[d.x, d.y]})rotate(${d.rotate})`
          )
          .text(d => d.text)
          .on('click', function(d) {
            clickEvent(d);
          });
      });

    layout.start();

    return this.wordCloud.toReact();
  }
}


export default WordCloud;
