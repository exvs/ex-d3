import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'
import dataset from '../../../data/weather'
import { fuckUndefined } from '../../making-your-first-chart'

const createDimensions = (
  width: number,
  height: number,
  top: number,
  right: number,
  bottom: number,
  left: number
) => {
  return {
    width,
    height,
    top,
    right,
    bottom,
    left,
    boundedWidth: width - left - right,
    boundedHeight: height - top - bottom
  }
}

const createSvg = (parentSelector: string, width: number, height: number) =>
  d3.select(parentSelector).append('svg').attr('width', width).attr('height', height)

const createBounds = (
  selection: d3.Selection<any, unknown, HTMLElement, any>,
  left: number,
  top: number
) => selection.append('g').style('transform', `translate(${left}px, ${top}px)`)

const numberArrToNumberNumber = (arr: any[]): [any, any] => [arr[0], arr[1]]

const DrawBarsWithCssTransition = defineComponent({
  setup() {
    onMounted(() => {
      const { width, height, top, right, bottom, left, boundedWidth, boundedHeight } =
        createDimensions(500, 500 * 0.6, 30, 10, 50, 50)

      const svg = createSvg('#app', width, height)
      const bounds = createBounds(svg, left, top)

      // 初始化静态节点？
      bounds.append('g').attr('class', 'bins')
      bounds.append('line').attr('class', 'mean')
      bounds
        .append('g')
        .attr('class', 'x-axis')
        .style('transform', `translateY(${boundedHeight}px)`)
        .append('text')
        .attr('class', 'x-axis-label')

      const drawHistogram = (metric: number | string) => {
        const metricAccessor = (d: any) => d[metric]
        const yAccessor = (d: any) => d.length

        // 创建比例尺

        const xScale = d3
          .scaleLinear()
          .domain(fuckUndefined(d3.extent(dataset, metricAccessor)))
          .range([0, boundedWidth])

        const binsGenerator = d3
          .histogram<any, any>()
          .domain(numberArrToNumberNumber(xScale.domain()))
          .value(metricAccessor)
          .thresholds(12)

        const bins = binsGenerator(dataset)

        const yScale = d3
          .scaleLinear()
          .domain([0, d3.max(bins, yAccessor)])
          .range([boundedHeight, 0])
          .nice()

        // 画数据

        const barPadding = 1

        let binGroups = bounds.select('.bins').selectAll('.bin').data(bins) as any

        binGroups.exit().remove()

        const newBinGroups = binGroups.enter().append('g').attr('class', 'bin')

        newBinGroups.append('rect')
        newBinGroups.append('text')

        binGroups = newBinGroups.merge(binGroups)
      }
    })
  },
  render: () => null
})

export { DrawBarsWithCssTransition }
export default DrawBarsWithCssTransition
