import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'
import './scatter.scss'

const dataset: number[][] = [
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
      d3.select('#app svg').remove()

      const padding = 50
      const svgHeight = 400
      const svgWidth = 1000
      const svg = d3
        .select('#app')
        .append('svg')
        .attr('height', svgHeight)
        .attr('width', svgWidth)
        .style('user-select', 'none')

      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, d => d[0])!])
        .range([padding, svgWidth - padding])

      const formatFixed1 = d3.format('.1f')
      const xAxis = d3.axisBottom(xScale).tickFormat(formatFixed1)
      // .ticks(20)
      // .tickValues([0, 20, 30, 50, 70, 90, 92])

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, d => d[1])!])
        .range([svgHeight - padding, padding])

      const yAxis = d3.axisLeft(yScale)

      const rScale = d3
        .scaleSqrt()
        .domain([d3.min(dataset, d => d[1])!, d3.max(dataset, d => d[1])!])
        .range([3, 6])

      const circles = svg
        .selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', d => rScale(d[1]))
        .attr('fill', 'rgba(39, 174, 96,1.0)')

      const texts = svg
        .selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .attr('x', d => xScale(d[0]))
        .attr('y', d => yScale(d[1]))
        .text(d => `${d[0]},${d[1]}`)

      svg
        .append('g')
        .call(xAxis)
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${svgHeight - padding})`)

      svg
        .append('g')
        .call(yAxis)
        .attr('class', 'y-axis')
        .attr('transform', `translate(${padding} , 0)`)
      // .attr('transform', `translate(0, ${svgHeight - padding})`)
    })
  },
  render: () => null
})

export { Scatter }
export default Scatter
