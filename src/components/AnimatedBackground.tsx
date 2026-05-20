import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* 基底 */}
      <div className="absolute inset-0 bg-[#fafaf7]" />

      {/* 光晕 1 - 蓝紫调 右上 */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full opacity-[0.35] blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(120,130,210,0.9) 0%, rgba(160,170,230,0.5) 40%, transparent 70%)',
        }}
        animate={{
          x: [-100, 80, -40, -100],
          y: [-120, 40, 100, -120],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 光晕 2 - 琥珀暖调 左下 */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.3] blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(210,160,120,0.9) 0%, rgba(230,190,150,0.5) 40%, transparent 70%)',
        }}
        animate={{
          x: [60, -80, 20, 60],
          y: [80, -40, -100, 80],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 光晕 3 - 青绿调 中上 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.25] blur-[90px]"
        style={{
          background:
            'radial-gradient(circle, rgba(100,180,160,0.9) 0%, rgba(140,210,190,0.5) 40%, transparent 70%)',
        }}
        animate={{
          x: [-300, -150, -350, -300],
          y: [-200, -300, -150, -200],
          scale: [0.9, 1.2, 1, 0.9],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 光晕 4 - 紫粉调 右下 */}
      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full opacity-[0.22] blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(190,130,190,0.9) 0%, rgba(210,160,210,0.5) 40%, transparent 70%)',
        }}
        animate={{
          x: [200, 100, 250, 200],
          y: [100, 250, 150, 100],
          scale: [1.1, 0.85, 1.05, 1.1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 细微颗粒纹理 */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(100,100,100,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 对角线微光 */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            'repeating-linear-gradient(-35deg, transparent, transparent 120px, rgba(10,10,10,0.15) 120px, rgba(10,10,10,0.15) 121px)',
        }}
      />
    </div>
  )
}
