import React from 'react'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from '../components/CourseGrid'
import AllCourseButton from '../components/AllCoursesButton'

const HomePage = () => {
  return (
    <>
    <Hero/>
    <TopCourses/>
    <CourseGrid isHome={true}/>
    <AllCourseButton/>

    
    </>
  )
}

export default HomePage