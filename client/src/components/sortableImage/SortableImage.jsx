import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import deletecross from "../../assets/icons/deletecross.png"; 


export const SortableImage = ({ id, src, isDraggable, deleteImg }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    margin: '0 10px',
  };

  return (
    <div 
      className="photo"
      ref={setNodeRef} 
      style={style} 
      {...(isDraggable? attributes: {})} 
      {...(isDraggable? listeners: {})}
    >
      
      <img className="object-fit-cover w-100 h-100" src={`http://localhost:4000/images/servicesImages/${src}`} alt={`Imagen ${id}`} width={100} height={100} />

      <div className='delete'>
                              <img onClick={()=>deleteImg(id, src)} src={deletecross} alt="borrar foto" />
                            </div>
    </div>

  );
};

{/* {images.length ?
                      images.map((e) => {
                        return (
                          <div className='cont-img' key={e.image_id}>
                            <div>
                              <img key={e.image_id} className='photo'
                                src={`${
                                  import.meta.env.VITE_SERVER_URL
                                }images/servicesImages/${e.image_name}`}
                                alt="foto servicio"
                              />
                            </div>
                            <div className='delete'>
                              <img onClick={()=>deleteImg(e.image_id, e.image_name)} src={deletecross} alt="borrar foto" />
                            </div>
                          </div>
                        );
                      }): <div className='d-flex align-items-center justify-content-center'><p className='m-0'>Agrega algunas fotos</p></div>} */}