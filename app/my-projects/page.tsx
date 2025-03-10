"use client"

import ProjectCard from '@/components/ProjectCard'
import { Projects } from '@/constants'
import React from 'react'
import './page.css' 

const Page = () => {
  return (
    <div
      style={{ backgroundImage: "url(/bg-3.jpg)" }}
      className='w-screen h-screen flex items-center justify-center bg-center bg-cover'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[90%] max-h-[90%] overflow-y-auto p-5 custom-scrollbar'>
        {Projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            text={project.text}
            image={project.src}
            link={project.link}
          />
        ))}
      </div>
    </div>
  )
}

export default Page