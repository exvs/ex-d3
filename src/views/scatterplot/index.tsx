import { defineComponent, onMounted, onUnmounted } from 'vue'
import dataset from '../../data/weather'
import * as d3 from 'd3'
import { fuckUndefined, weather } from '../making-your-first-chart'

export type dimention = {
  width: number
  height: number
  margin: {
    top: number
    right: number
    bottom: number
    left: number
  }
  boundedWidth: number
  boundedHeight: number
}

const xAccessor = (d: weather) => d.dewPoint
const yAccessor = (d: weather) => d.humidity
const colorAccessor = (d: weather) => d.cloudCover

const scatterplot = defineComponent({
  setup() {
    onMounted(() => {
      /**
       * not undefined
       */
      const width = d3.min([window.innerHeight * 0.9, window.innerWidth * 0.9])!

      const dimensions: dimention = {
        width,
        height: width,
        margin: {
          top: 10,
          right: 10,
          bottom: 50,
          left: 50
        },
        boundedWidth: width,
        boundedHeight: width
      }

      dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
      dimensions.boundedHeight =
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom

      const svg = d3
        .select('#app')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)

      const bounds = svg
        .append('g')
        .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`)

      const xScale = d3
        .scaleLinear()
        .domain(fuckUndefined(d3.extent(dataset, xAccessor)))
        .range([0, dimensions.boundedWidth])
        .nice()

      const yScale = d3
        .scaleLinear()
        .domain(fuckUndefined(d3.extent(dataset, yAccessor)))
        .range([dimensions.boundedHeight, 0])
        .nice()

      const colorScale = d3
        .scaleLinear<string>()
        .domain(fuckUndefined(d3.extent(dataset, colorAccessor)))
        .range(['skyblue', 'darkslategrey'])

      const dots = bounds.selectAll('circle').data(dataset)
      /**
       * join is a shortcut for running enter(), append(), merge(), and other...
       */
      dots
        .join('circle')
        .transition()
        .delay((d, i) => i * 25)
        .duration(1000)
        .attr('cx', d => xScale(xAccessor(d)))
        .attr('cy', d => yScale(yAccessor(d)))
        .attr('r', 5)
        .attr('fill', d => colorScale(colorAccessor(d)))

      const xAxisGenerator = d3.axisBottom(xScale)
      const xAxis = bounds
        .append('g')
        .call(xAxisGenerator)
        .style('transform', `translate(0, ${dimensions.boundedHeight}px)`)

      const xAxisLabel = xAxis
        .append('text')
        .attr('x', dimensions.boundedWidth / 2)
        .attr('y', dimensions.margin.bottom - 5)
        .attr('fill', 'black')
        .style('font-size', '1.4rem')
        .html('Dew point (&deg;F)')

      const yAxisGenerator = d3.axisLeft(yScale).ticks(4)
      const yAxis = bounds.append('g').call(yAxisGenerator)
      const yAxisLabel = yAxis
        .append('text')
        .attr('x', -dimensions.boundedHeight / 2)
        .attr('y', -dimensions.margin.left + 17)
        .attr('fill', 'black')
        .style('font-size', '1.4rem')
        .text('Relative humidity')
        .style('transform', 'rotate(-90deg)')
        .style('text-anchor', 'middle')
    })
    onUnmounted(() => {
      d3.select('#app svg').remove()
    })
  },
  render: () => null
})

export { scatterplot }
export default scatterplot
