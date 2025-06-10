import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import deletecross from '../../assets/icons/deletecross.png';

export const SortableImage = ({ id, src, isDraggable, deleteImg }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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
      {...(isDraggable ? attributes : {})}
      {...(isDraggable ? listeners : {})}
    >
      <img
        className="object-fit-cover w-100 h-100"
        src={`${import.meta.env.VITE_SERVER_URL}images/servicesImages/${src}`}
        alt={`Imagen ${id}`}
        width={100}
        height={100}
      />

      <div className="delete">
        <img
          onClick={() => deleteImg(id, src)}
          src={deletecross}
          alt="borrar foto"
        />
      </div>
    </div>
  );
};
