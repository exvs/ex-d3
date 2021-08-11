import { defineComponent, onMounted, onUnmounted, reactive } from 'vue'
import * as d3 from 'd3'
import weatherData from '../../data/weather'

export const fuckUndefined = (orUndefined: any[]) => orUndefined.map(d => d!)

export type weather = {
  time: number
  summary: string
  icon: string
  sunriseTime: number
  sunsetTime: number
  moonPhase: number
  precipIntensity: number
  precipIntensityMax: number
  precipProbability: number
  temperatureHigh?: number
  temperatureHighTime?: number
  temperatureLow?: number
  temperatureLowTime?: number
  apparentTemperatureHigh?: number
  apparentTemperatureHighTime?: number
  apparentTemperatureLow?: number
  apparentTemperatureLowTime?: number
  dewPoint: number
  humidity: number
  pressure: number
  windSpeed: number
  windGust: number
  windGustTime: number
  windBearing: number
  cloudCover: number
  uvIndex: number
  uvIndexTime: number
  visibility: number
  temperatureMin: number
  temperatureMinTime: number
  temperatureMax: number
  temperatureMaxTime: number
  apparentTemperatureMin: number
  apparentTemperatureMinTime: number
  apparentTemperatureMax: number
  apparentTemperatureMaxTime: number
  date: string
  ozone?: number
}

/**
 * %Y full year name, like 2016 not 16
 * %m month with prefix '0', like 01, 02, ..., 11, 12
 * %d day with prefix '0', like 01, 02, ..., 11
 */
const dataFormatString = '%Y-%m-%d'
const dataPrase = d3.timeParse(dataFormatString)
const xAccessor = (d: weather) => dataPrase(d.date)!
const yAccessor = (d: weather) => d.temperatureMax

/**
 * margin bottom & left are larger due to xAxis & yAxis
 */
const dimensions = {
  width: window.innerWidth * 0.8,
  height: window.innerHeight * 0.8,
  margin: {
    top: 15,
    right: 15,
    bottom: 45,
    left: 45
  },
  boundedWidth: window.innerWidth * 0.8 - 60,
  boundedHeight: window.innerHeight * 0.8 - 60
}
dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

const MakingYourFirstChart = defineComponent({
  setup() {
    const dataset = reactive<weather[]>(weatherData)
    onMounted(() => {
      const svg = d3
        .select('#app')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)

      /**
       * use g to change whole ele inside it with css with one operation
       */
      const bounds = svg
        .append('g')
        .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`)

      const yScale = d3
        .scaleLinear()
        .domain(fuckUndefined(d3.extent(dataset, yAccessor)))
        .range([dimensions.boundedHeight, 0])

      const freezingTemperaturePlacement = yScale(32)
      const freezingTemperatures = bounds
        .append('rect')
        .attr('x', 0)
        .attr('width', dimensions.boundedWidth)
        .attr('y', freezingTemperaturePlacement)
        .attr('height', dimensions.boundedHeight - freezingTemperaturePlacement)
        .attr('fill', '#e0f3f3')

      const xScale = d3
        .scaleTime()
        .domain(fuckUndefined(d3.extent(dataset, xAccessor)))
        .range([0, dimensions.boundedWidth])

      const lineGenerator = d3.line<weather>(
        d => xScale(xAccessor(d)),
        d => yScale(yAccessor(d))
      )

      const line = bounds
        .append('path')
        .attr('d', lineGenerator(dataset))
        .attr('fill', 'none')
        .attr('stroke', '#af9358')
        .attr('stroke-width', 2)

      const yAxisGenerator = d3.axisLeft(yScale)
      const yAxis = bounds.call(yAxisGenerator)

      const xAxisGenerator = d3.axisBottom(xScale)
      const xAxis = bounds
        .append('g')
        .call(xAxisGenerator)
        .style('transform', `translate(0, ${dimensions.boundedHeight}px)`)
    })
    onUnmounted(() => {
      d3.select('#app svg').remove()
    })
  },
  render: () => null
})

export { MakingYourFirstChart }
export default MakingYourFirstChart
