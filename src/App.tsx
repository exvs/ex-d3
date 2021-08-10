import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './app.scss'

const App = defineComponent({
  render: () => (
    <>
      {/* <div id='ck'>click to change dataset</div> */}
      <RouterView />
    </>
  )
})

export { App }
export default App
