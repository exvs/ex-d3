import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'

const dataset = [
  [23, 34],
  [45, 45],
  [34, 42],
  [92, 42],
  [13, 54],
  [34, 54],
  [13, 42],
  [22, 43],
  [43, 24],
  [65, 43],
  [77, 32]
]

const Scatter = defineComponent({
  setup() {
    onMounted(() => {
      const svgHeight = 400
      const svgWidth = 1000
      const svg = d3
        .select('#app')
        .append('svg')
        .attr('height', svgHeight)
        .attr('width', svgWidth)
        .style('user-select', 'none')

      const circles = svg
        .selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', d => d[0] * 5)
        .attr('cy', d => svgHeight - d[1] * 5)
        .attr('r', 5)
      // .attr('fill', 'rgba(39, 174, 96,1.0)')

      const texts = svg
        .selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .attr('x', d => d[0] * 5)
        .attr('y', d => svgHeight - d[1] * 5)
        .text(d => `${d[0]},${d[1]}`)
    })
  },
  render: () => null
})

export { Scatter }
export default Scatter
