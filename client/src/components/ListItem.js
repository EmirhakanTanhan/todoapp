import {useState} from "react";
import TickIcon from "./TickIcon";
import Modal from "./Modal";

function ListItem({ task, getData }) {
    const [showModal, setShowModal] = useState(false);

    const deleteItem = async () => {
        try {
            const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <li className='listItem'>
            <div className='infoContainer'>
                <TickIcon getData={getData} task={task}/>
                <p className='taskTitle'>{task.title}</p>
            </div>

            <div className='buttonContainer'>
                <button className='edit' onClick={() => setShowModal(true)}>Edit</button>
                <button className='delete' onClick={deleteItem}>Delete</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
        </li>
    );
}

export default ListItem;
