import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import * as d3 from 'd3'
import { getSingleNumberArray, getStringRange } from '../../utils'

const Svg = defineComponent({
  setup() {
    const width = 1000
    const height = 400
    const dataset = ref<any[]>([])

    onMounted(() => {
      dataset.value = getSingleNumberArray(20, 80, 15)
      d3.select('#ck').on('click', () => (dataset.value = getSingleNumberArray(20, 80, 15)))

      const xScale = d3
        .scaleBand()
        .domain(getStringRange(dataset.value.length))
        .range([0, width])
        .paddingInner(0.05)

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset.value)!])
        .range([0, height])

      const svg = d3.select('#app').append('svg').attr('height', height).attr('width', width)

      svg
        .selectAll('rect')
        .data(dataset.value)
        .enter()
        .append('rect')
        .transition()
        .duration(1000)
        .attr('x', (d, i) => xScale(i + '')!)
        .attr('y', d => height - yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale(d))
        .attr('fill', `rgba(39, 174, 96,1.0)`)

      svg
        .selectAll('text')
        .data(dataset.value)
        .enter()
        .append('text')
        .transition()
        .duration(1000)
        .text(d => d)
        .attr('x', (d, i) => xScale(i + '')! + xScale.bandwidth() / 2)
        .attr('y', d => height - yScale(d) + 20)
        .attr('text-anchor', 'middle')
    })

    watch(dataset, () => {
      const xScale = d3
        .scaleBand()
        .domain(getStringRange(dataset.value.length))
        .range([0, width])
        .paddingInner(0.05)

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset.value)!])
        .range([0, height])

      const svg = d3.select('#app svg')

      svg
        .selectAll('rect')
        .data(dataset.value)
        .transition()
        .delay((d, i) => i * 100)
        .duration(1000)
        .attr('x', (d, i) => xScale(i + '')!)
        .attr('y', d => height - yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale(d))
        .attr('fill', `rgba(39, 174, 96,1.0)`)

      svg
        .selectAll('text')
        .data(dataset.value)
        .transition()
        .delay((d, i) => i * 100)
        .duration(1000)
        .on('start', function () {
          d3.select(this).attr('fill', 'white')
        })
        .text(d => d)
        .attr('x', (d, i) => xScale(i + '')! + xScale.bandwidth() / 2)
        .attr('y', d => height - yScale(d) + 20)
      // .transition()
      // .duration(1000)
      // .attr('fill', 'black')
      // .on('end', function () {
      //   d3.select(this).transition().duration(1000).attr('fill', 'black')
      // })
    })
    onUnmounted(() => {
      d3.select('#app svg').remove()
    })
  },
  render: () => null
})

export { Svg }
export default Svg
