import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'
import { getSingleNumberArray } from '../utils'

const Home = defineComponent({
  setup() {
    onMounted(() => {
      d3.select('#home')
        .selectAll('p')
        .data(getSingleNumberArray(30, 300, 10))
        .enter()
        .append('p')
        .text((d, i, arg) => {
          return `${i}: ${d}`
        })
        .style('color', (d, i) => {
          console.log(d, i)
          switch (i % 4) {
            case 0:
              return 'rgba(26, 188, 156,1.0)'
            case 1:
              return 'rgba(22, 160, 133,1.0)'
            case 2:
              return 'rgba(46, 204, 113,1.0)'
            default:
              return 'rgba(39, 174, 96,1.0)'
          }
        })
    })
  },
  render: () => <div id='home' style={{ userSelect: 'none' }}></div>
})

export { Home }
export default Home
