import Modal from "./Modal";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

function ListHeader({ listName, getData }) {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [showModal, setShowModal] = useState(false);
    const [tags, setTags] = useState(null);
    const [tagFilter, setTagFilter] = useState('all');

    const getTags = async () => {
        try {
            const response = await fetch('http://localhost:8000/tags');
            const result = await response.json();
            setTags(result);
        } catch (err) {
            console.log(err);
        }
    };

    const handleTagChange = async (e) => {
        await setTagFilter(e.target.value);
    };

    useEffect(() => {
        getTags();
    }, []);

    useEffect(() => {
        getData(tagFilter);
    }, [tagFilter]);

    const signOut = async () => {
        try {
            await fetch('http://localhost:8000/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: cookies.refreshToken
                })
            });

            removeCookie('Email');
            removeCookie('RefreshToken');
        } catch (err) {
            console.log(err);
        }

        window.location.reload();
    };

    return (
        <div className='listHeader'>
            <h1>{listName}</h1>
            <select value={tagFilter} onChange={(e) => handleTagChange(e)}>
                <option value="all" selected>Select an Option</option>
                {tags?.map(tag => {
                    return (<option key={tag.id} value={tag.id}>{tag.name}</option>)
                })}
            </select>
            <div className='buttonContainer'>
                <button className='create' onClick={() => setShowModal(true)}>Add New</button>
                <button className='signout' onClick={signOut}>Sign Out</button>
            </div>

            {showModal &&  <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
        </div>
    );
}

export default ListHeader;
