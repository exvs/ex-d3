import { defineComponent } from 'vue'

const SvgAnimate = defineComponent({
  render: () => (
    <svg width='120' height='120'>
      <rect x='10' y='10' width='100' height='100' fill='cornflowerblue'>
        <animate attributeName='x' values='0;20;0' dur='2s' repeatCount='indefinite' />
        {/* 触发属性，属性变换，持续时间，重复次数 */}
        <animate
          attributeName='fill'
          values='cornflowerBlue;maroon;cornflowerBlue'
          dur='6s'
          repeatCount='indefinite'
        />
      </rect>
    </svg>
  )
})

export { SvgAnimate }
export default SvgAnimate
