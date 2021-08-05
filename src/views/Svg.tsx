import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'
import { arrayData } from '../data'

const Svg = defineComponent({
  setup() {
    onMounted(() => {
      const svgWidth = 800
      const svgHeight = 300
      const barPadding = 1
      const svg = d3.select('#svg').style('height', svgHeight).style('width', svgWidth)
      const rects = svg
        .selectAll('rect')
        .data(arrayData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * (svgWidth / arrayData.length))
        .attr('y', d => svgHeight - d * 4)
        .attr('width', svgWidth / arrayData.length - barPadding * 10)
        .attr('height', d => d * 4)
        .attr('fill', d => `rgba(0, ${d * 4 + 100}, 0,1.0)`)
      const texts = svg
        .selectAll('text')
        .data(arrayData)
        .enter()
        .append('text')
        .text(d => d)
        .attr(
          'x',
          (d, i) =>
            i * (svgWidth / arrayData.length) +
            (svgWidth / arrayData.length - barPadding * 10) / 2
        )
        .attr('y', d => svgHeight - d * 4 + 15)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
      // const circles = svg.selectAll('circle').data(arrayData).enter().append('circle')
      // circles
      //   .attr('cx', (d, i) => i * 88 + 25)
      //   .attr('cy', 400 / 2)
      //   .attr('r', d => d)
      //   .attr('fill', 'rgba(39, 174, 96,1.0)')
      //   .attr('stroke', 'rgba(22, 160, 133,1.0)')
      //   .attr('stroke-width', d => d / 2)
    })
  },
  render: () => <svg id='svg' style={{ userSelect: 'none' }}></svg>
})

export { Svg }
export default Svg
