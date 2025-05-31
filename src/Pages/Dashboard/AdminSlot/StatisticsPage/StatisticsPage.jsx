import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Heading from '../../../../components/Shared/Heading/Heading'
import Chart from './Chart/Chart'

const StatisticsPage = () => {
  const [statisticData, setStatisticData] = useState({})
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin-state`)
      .then(res => res.json())
      .then(data => setStatisticData(data))
  }, [])
 
  return (
    <div>
      <div>
        <Heading text={'statistic data'}></Heading>
      </div>
      <div>
        {
          <Chart statisticData={statisticData}></Chart>
        }
      </div>
    </div>
  )
}

export default StatisticsPage
