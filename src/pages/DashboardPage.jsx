import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { db } from '../firebase'
import Table from '../components/Table'

import defaultImage from '../static/images/no-image.png'
import { NavLink } from 'react-router-dom'
import { IoMdOpen } from 'react-icons/io'

const DashboardPage = () => {
  const [plantTableData, setPlantTableData] = useState({ data: [], meta: {} })
  const [categoryTableData, setCategoryTableData] = useState({ data: [], meta: {} })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    onLoadPlants()
    onLoadCategories()
  }, [])

  const plantColumns = [
    {
      key: 'name',
      label: 'Name',
      render: ({ name, image_url }) => (
        <div className="flex items-center w-auto">
          <img src={image_url || defaultImage} className="w-10 h-10 mr-3 rounded-full" alt="" />
          <span>{name}</span>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: ({ category: { label } }) => label,
    },
    {
      key: 'stock',
      label: 'Stock',
    },
    {
      key: 'available',
      label: 'Status',
      render: ({ available }) => (available ? 'Available' : 'Not available'),
    },
  ]

  const categoryColumns = [
    {
      key: 'name',
      label: 'Name',
    },
  ]

  async function onLoadPlants() {
    const data = []

    setIsLoading(true)
    const docs = await db.collection('plants').orderBy('name', 'asc').get()

    docs.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    const newData = data.slice(0, 7)

    const newTableData = {
      meta: { count: newData.length },
      data: newData,
    }

    if (newTableData) setIsLoading(false)
    setPlantTableData({ ...newTableData })
  }

  async function onLoadCategories() {
    const data = []

    setIsLoading(true)
    const docs = await db.collection('categories').orderBy('name', 'asc').get()

    docs.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    const newData = data.slice(0, 7)

    const newTableData = {
      meta: { count: newData.length },
      data: newData,
    }

    if (newTableData) setIsLoading(false)
    setCategoryTableData({ ...newTableData })
  }

  return (
    <div>
      <div className="rounded w-full bg-white py-4 px-6 border border-gray-300 mb-5">
        <div className="flex items-center">
          <h1 className="text-2xl font-medium text-gray-600">Dashboard</h1>
          <span className="ml-auto text-gray-600">
            {dayjs(new Date()).format('dddd, MMMM D YYYY')}
          </span>
        </div>
      </div>

      <div className="flex flex-start">
        <div className="w-3/4 pr-3">
          <div className="rounded w-full bg-white shadow p-4">
            <div className="flex items-center mb-6">
              <h2 className="text-xl text-gray-700 mr-auto">Plants</h2>
              <NavLink to="/plants">
                <span className="text-sm text-gray-600 hover:text-teal-400 flex items-center">
                  <span className="mr-2">See All</span>
                  <IoMdOpen size={20} className="" />
                </span>
              </NavLink>
            </div>
            <Table tableData={plantTableData} columns={plantColumns} loading={isLoading} />
          </div>
        </div>

        <div className="w-1/4 pl-3">
          <div className="bg-white w-full shadow p-4 rounded">
            <div className="flex items-center mb-6">
              <h2 className="text-xl text-gray-700 mr-auto">Categories</h2>
              <NavLink to="/master-data/categories">
                <span className="text-sm text-gray-600 hover:text-teal-400 flex items-center">
                  <span className="mr-2">See All</span>
                  <IoMdOpen size={20} className="" />
                </span>
              </NavLink>
            </div>
            <Table tableData={categoryTableData} columns={categoryColumns} loading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
