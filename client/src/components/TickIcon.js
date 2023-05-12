function TickIcon({ getData, task }) {
    const changeStatus = async () => {
        try {
            const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user_email: task.user_email,
                    title: task.title,
                    status: !task.status,
                    date: task.date
                })
            });

            if (response.status === 200) {
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <svg className={`tick ${task.status ? 'active' : ''}`} onClick={() => changeStatus()} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
    );
}

export default TickIcon;
