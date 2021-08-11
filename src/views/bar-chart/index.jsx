import { defineComponent, onMounted } from 'vue'
import dataset from '../../data/weather'
import * as d3 from 'd3'
const BarChart = defineComponent({
  setup() {
    onMounted(() => {
      const width = 600

      let dimensions = {
        width,
        height: width * 0.9,
        margin: {
          top: 30,
          right: 10,
          bottom: 50,
          left: 50
        }
      }
      dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
      dimensions.boundedHeight =
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom

      const drawHistogram = metric => {
        const metricAccessor = d => d[metric]
        const yAccessor = d => d.length

        const svg = d3
          .select('#app')
          .append('svg')
          .attr('width', dimensions.width)
          .attr('height', dimensions.height)

        const bounds = svg
          .append('g')
          .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top})px`)

        svg
          .attr('role', 'figure')
          .attr('tabindex', '0')
          .append('title')
          .text(`Histogram looking at the distribution of ${metric} in Seattle over the past year`)

        const xScale = d3
          .scaleLinear()
          .domain(d3.extent(dataset, metricAccessor))
          .range([0, dimensions.boundedWidth])

        const binsGenerator = d3.bin().domain(xScale.domain()).value(metricAccessor).thresholds(12)
        const bins = binsGenerator(dataset)
        // const yScale = d3.scaleLinear().domain(fuckUndefined(d3.extent(dataset, )))

        const yScale = d3
          .scaleLinear()
          .domain([0, d3.max(bins, yAccessor)])
          .range([dimensions.boundedHeight, 0])
          .nice()
      }

      drawHistogram('2')
    })
  },
  render: () => null
})

export { BarChart }
export default BarChart
