import {useState} from "react";
import {useCookies} from "react-cookie";

function Modal({mode, setShowModal, getData, task}) {
    const [cookies, setCookie, removeCookie] = useCookies(null);

    const editMode = mode === 'edit';

    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookies.Email,
        title: editMode ? task.title : "",
        status: editMode ? task.status : false,
        date: editMode ? task.date : new Date()
    });

    const postData = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/todos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                setShowModal(false);
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const editData = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                setShowModal(false);
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChanges = (e) => {
        const {name, value} = e.target;

        setData(data => ({
            ...data,
            [name]: value
        }));
    };

    return (
        <div className='overlay'>
            <div className='modal'>
                <div className='form-title-container'>
                    <h3>Lets {mode} your task</h3>
                    <button onClick={() => setShowModal(false)}>x</button>
                </div>

                <form>
                    <input
                        required
                        maxLength={30}
                        placeholder='Your task'
                        name='title'
                        value={data.title}
                        onChange={handleChanges}
                    />
                    <input className={mode} type='submit' onClick={editMode ? editData : postData}/>
                </form>
            </div>
        </div>
    );
}

export default Modal;
