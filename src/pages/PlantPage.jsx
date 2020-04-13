import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { IoIosCreate, IoIosTrash } from 'react-icons/io'
import Table from '../components/Table'
import Panel from '../components/Panel'
import Tabs from '../components/Tabs'
import Toaster from '../components/Toaster'
import { TextField } from '../components/inputs'
import { Button, IconButton } from '../components/buttons'
import { ConfirmationDialog } from '../components/Dialog'
import PlantForm from '../components/forms/PlantForm'
import PictureForm from '../components/forms/PictureForm'

import defaultImage from '../static/images/no-image.png'
import { privateApi, url } from '../utils/request'

const PlantPage = () => {
  const [tableData, setTableData] = useState({ meta: {}, data: [] })
  const [isLoading, setIsLoading] = useState(false)

  const [isAdd, setIsAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  const [editedItem, setEditedItem] = useState(null)
  const [deletedItem, setDeletedItem] = useState(null)

  const [activeTab, setActiveTab] = useState('data')

  const defaultToastState = {
    isShow: false,
    type: 'default',
    duration: 4000, // remove duration property to prevent autoclose after 4s
  }
  const [toast, setToast] = useState(defaultToastState)

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: ({ name, picture }) => (
        <div className="flex items-center">
          <img
            src={(picture && url(`static/images/plants/${picture}`)) || defaultImage}
            className="w-10 h-10 mr-3 rounded-full"
            alt=""
          />
          <span>{name}</span>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: ({ price }) => 'Rp. ' + price,
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
    {
      key: 'category',
      label: 'Category',
      render: ({ category: { name } }) => name,
    },
    {
      key: 'room',
      label: 'Room',
      render: ({ room: { name } }) => name,
    },
    {
      key: 'created_at',
      label: 'Created at',
      render: ({ createdAt }) => dayjs(createdAt).format('dddd, MMMM D YYYY'),
    },
    {
      key: 'options',
      label: 'Options',
      render: ({ category: { id: categoryId }, room: { id: roomId }, ...data }) => (
        <div className="flex items-center">
          <button
            className="p-1 text-gray-400 hover:text-yellow-400"
            onClick={() => {
              setIsEdit(true)
              setEditedItem({ categoryId, roomId, ...data })
            }}
          >
            <IoIosCreate size={22} />
          </button>
          <button
            className="p-1 text-gray-400 hover:text-red-400"
            onClick={() => {
              setIsDelete(true)
              setDeletedItem(data)
            }}
          >
            <IoIosTrash size={22} />
          </button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    onLoadPage()
  }, [])

  async function onLoadPage() {
    setIsLoading(true)

    const response = await privateApi()
      .get('plants')
      .catch(error => {
        if (error.response.status == 404) {
          setToast({
            ...toast,
            isShow: true,
            type: 'warning',
            title: 'Not Found',
            message: "There's no plant!",
          })
          setIsLoading(false)
        }
      })

    if (response && response.data.data) {
      const data = response.data.data
      const newTableData = {
        meta: { count: data.length },
        data,
      }
      setIsLoading(false)
      setTableData(newTableData)
    }
  }

  async function onCommitAdd(values) {
    const response = await privateApi().post('plants', { ...values })

    if (response) {
      setIsAdd(false)
      onLoadPage()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Plant Created',
        message: 'A new plant has been created!',
      })
    }
  }

  async function onCommitEdit(values) {
    const response = await privateApi().put(`plants/${editedItem.id}`, {
      ...values,
    })

    if (response && response.data.data) {
      onCancelEdit()
      onLoadPage()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Plant Updated',
        message: `${editedItem.name} has been updated successfully!`,
      })
    }
  }

  function onCancelEdit() {
    setIsEdit(false)
    setEditedItem(null)
  }

  async function onCommitDelete(item) {
    const response = await privateApi().delete(`plants/${item.id}`)

    if (response) {
      onCancelDelete()
      onLoadPage()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Plant Deleted',
        message: `${deletedItem.name} has been deleted!`,
      })
    }
  }

  function onCancelDelete() {
    setIsDelete(false)
    setDeletedItem(null)
  }

  async function onCommitChangeImage(file) {
    const formData = new FormData()
    formData.append('picture', file)

    const response = await privateApi().put(`plants/change_picture/${editedItem.id}`, formData)

    if (response && response.data.data) {
      onCancelEdit()
      onLoadPage()
      setToast({
        ...toast,
        isShow: true,
        type: 'primary',
        title: 'Picture Updated',
        message: `${editedItem.name} picture changed successfully!`,
      })
    }
  }

  return (
    <div>
      <Toaster
        isShow={toast.isShow}
        type={toast.type}
        duration={toast.duration}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast({ ...toast, ...defaultToastState })}
      />

      <Panel title="Plant" size="small" isOpen={isAdd} onClose={() => setIsAdd(false)}>
        <PlantForm onSubmit={onCommitAdd} onCancel={() => setIsAdd(false)} />
      </Panel>

      <Panel title="Plant" size="small" isOpen={isEdit} onClose={() => onCancelEdit()}>
        <div className="mb-5">
          <Tabs
            items={[
              { key: 'data', label: 'Data' },
              { key: 'image', label: 'Image' },
            ]}
            activeTab={activeTab}
            onChangeTab={key => setActiveTab(key)}
          />
        </div>
        {activeTab === 'data' && (
          <PlantForm
            initialValues={editedItem}
            onSubmit={onCommitEdit}
            onCancel={() => onCancelEdit()}
          />
        )}

        {activeTab === 'image' && (
          <PictureForm
            initialImage={
              (!!editedItem &&
                editedItem.picture &&
                url(`static/images/plants/${editedItem.picture}`)) ||
              defaultImage
            }
            onSubmit={file => onCommitChangeImage(file)}
            onCancel={() => onCancelEdit()}
          />
        )}
      </Panel>

      <ConfirmationDialog
        isOpen={isDelete}
        onClose={() => onCancelDelete()}
        onAccept={() => onCommitDelete(deletedItem)}
        color="danger"
        title="Delete Plant"
        descriptions="Are you sure want to delete this plant?"
      />

      <div className="flex items-center bg-white py-4 px-6 shadow mb-6 rounded">
        <h1 className="text-2xl font-medium text-gray-600">Plant</h1>
        <span className="ml-auto text-gray-600">{dayjs().format('dddd, MMMM D YYYY')}</span>
      </div>

      <div className="bg-white py-4 px-6 shadow mb-8 rounded">
        <div className="mb-6 flex">
          <div>
            <Button color="primary" icon="add" size="small" onClick={() => setIsAdd(true)}>
              Add Plant
            </Button>
          </div>
          <div className="ml-auto flex">
            <div className="mr-1 w-64">
              <TextField noMargin size="small" name="name" placeholder="Find plant" />
            </div>
            <IconButton icon="search" size="small" />
          </div>
        </div>

        <Table tableData={tableData} columns={columns} loading={isLoading} />
      </div>
    </div>
  )
}

export default PlantPage
