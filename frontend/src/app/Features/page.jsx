"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const Features = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://imgs.search.brave.com/HDoIbGowzA3Ds5JB-VLuvHzW-noyq2OeoHynsTG_oLA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/ZWFtd29yay1tYWtp/bmctb25saW5lLWJs/b2dfNTM4NzYtOTQ4/NjguanBnP3NlbXQ9/YWlzX2h5YnJpZA"
        subheading="Collaborate"
        heading="User-Friendly Interface"
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Quality"
        heading="Never compromise."
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Modern"
        heading="Do Your Best."
      >
        <ExampleContent />
      </TextParallaxContent>
    </div>
  )
}

const IMG_PADDING = 12

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
      className="mb-12 sm:mb-24"
    >
      <div className="relative">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  )
}

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(70vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl shadow-xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  )
}

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [250, -250])
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0])

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-lg md:mb-4 md:text-3xl font-light tracking-wide">{subheading}</p>
      <p className="text-center text-3xl font-bold md:text-6xl lg:text-7xl max-w-3xl px-4">{heading}</p>
    </motion.div>
  )
}

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pt-8 sm:pt-12 md:grid-cols-12">
    <div className="col-span-1 md:col-span-8 mx-auto">
      <p className="mb-4 text-lg text-neutral-600 md:text-2xl font-bold text-center md:text-left">
        Our blogging platform offers an intuitive and clutter-free interface, making it easy for writers of all levels
        to create and publish content seamlessly.
      </p>
    </div>
  </div>
)

export default Features
