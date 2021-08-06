import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'
import { getDateNumberArray } from '../utils'

const TimeChart = defineComponent({
  setup() {
    onMounted(() => {
      d3.select('#app svg').remove()

      const svgHeight = 800
      const svgWidth = 1000
      const padding = 100
      const dataset = getDateNumberArray('2021-4-19', '2021-8-6', 0, 500, 13)
      const svg = d3
        .select('#app')
        .append('svg')
        .attr('height', svgHeight)
        .attr('width', svgWidth)
        .style('user-select', 'none')

      const xScale = d3
        .scaleTime()
        .domain([new Date('2021-4-19'), new Date('2021-8-6')])
        .range([padding, svgWidth - padding])

      const xAxis = d3.axisBottom(xScale)

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, d => d[1])!])
        .range([svgHeight - padding, padding])

      const rScale = d3
        .scaleSqrt()
        .domain([0, d3.max(dataset, d => d[1])!])
        .range([3, 6])

      svg
        .selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', d => rScale(d[1]))
        .attr('fill', 'rgba(39, 174, 96,1.0)')

      svg
        .selectAll('line')
        .data(dataset)
        .enter()
        .append('line')
        .attr('x1', d => xScale(d[0]))
        .attr('x2', d => xScale(d[0]))
        .attr('y1', d => yScale(d[1]))
        .attr('y2', svgHeight - padding)
        .attr('stroke', 'grey')
        .attr('stroke-width', '1px')

      // const texts = svg
      //   .selectAll('text')
      //   .data(dataset)
      //   .enter()
      //   .append('text')
      //   .attr('x', d => xScale(d[0]))
      //   .attr('y', d => yScale(d[1]))
      //   .text(d => `${d[0].toLocaleString()} : ${d[1]}`)

      svg
        .append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${svgHeight - padding})`)
    })
  },
  render: () => null
})

export { TimeChart }
export default TimeChart
