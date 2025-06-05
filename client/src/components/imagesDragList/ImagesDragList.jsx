import React, { useContext, useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableImage } from '../sortableImage/SortableImage';
import { Button } from 'react-bootstrap';
import { fetchData } from '../../helpers/axiosHelpers';
import { AuthContext } from '../../context/AuthContextProvider';
import addImage from '../../assets/icons/add_image.png';

const ImagesDragList = ({images, setImages, deleteImg, handleChange, service }) => {
  const [reorder, setReorder] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));
  const [newOrder, setNewOrder] = useState([])
  const {token} = useContext(AuthContext);

  useEffect(()=>{
    if(images) {
      setNewOrder(images)
    }
  },[images])

  console.log("newwwww", newOrder)
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = newOrder.findIndex((img) => img.image_id === active.id);
      const newIndex = newOrder.findIndex((img) => img.image_id === over?.id);

      setNewOrder((imgs) => arrayMove(imgs, oldIndex, newIndex));
     
    }
  };

  const cancelReorder = () => {
    setNewOrder(images)
    setReorder(false)
  }

  const saveImages = async() => {
    try {
      let res = await fetchData("admin/reorderServiceImages", "post", newOrder, token)
      console.log("resss", res.data)
      setReorder(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className='d-flex gap-3 flex-column align-items-center justify-content-center'>
              <SortableContext
                items={images?.map((img) => img.image_id)}
                strategy={horizontalListSortingStrategy}
              >
                <div className='d-flex flex-wrap row-gap-3 justify-content-center'>
                  {newOrder?.map((image) => (
                    <SortableImage
                      key={image.image_id}
                      id={image.image_id}
                      src={image.image_name}
                      isDraggable={reorder}
                      deleteImg={deleteImg}
                      images={images}
                    />
                  ))}
                </div>
              </SortableContext>
            <div className='d-flex gap-3'>
              <label htmlFor="imgId">
                                  {' '}
                                  <img src={addImage} alt="añadir imagen servicios" />{' '}
                                </label>
                                <input
                                  type="file"
                                  id="imgId"
                                  hidden
                                  multiple
                                  onChange={(event) =>
                                    handleChange(event, service.service_id)
                                  }
                                />
              {!reorder ?
                      <div><button type='button' className='btn' onClick={()=>setReorder(true)} disabled={!images.length}>Ordenar</button></div> :
                      <div>
                        <p>Elige nuevo orden</p>
                        <div className='d-flex justify-content-center align-items-center gap-3'>
                          <button type="button" className='btn' onClick={cancelReorder}>Cancelar</button>
                          <button type='button' className='btn' onClick={saveImages}>Aceptar</button>
                        </div>
                      </div>}
            </div>
          </div>
        </DndContext>
  )
}

export default ImagesDragList