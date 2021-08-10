import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import './index.scss'

const Index = defineComponent({
  render: () => (
    <div id='index'>
      <div style={{ fontSize: '32px' }}>Hello D3 - Ryan Moyo</div>
    </div>
  )
})

export { Index }
export default Index
