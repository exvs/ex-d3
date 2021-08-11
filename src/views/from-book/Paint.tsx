import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'
import './paint.scss'
import { arrayData } from '../../data'

const Paint = defineComponent({
  setup() {
    onMounted(() => {
      d3.select('#paint')
        .selectAll('div')
        .data(arrayData)
        .enter()
        .append('div')
        .attr('class', 'bar')
        .style('height', (d, i) => {
          return `${d * 5}px`
        })
    })
  },
  render: () => <div id='paint' style={{ userSelect: 'none' }}></div>
})

export { Paint }
export default Paint
