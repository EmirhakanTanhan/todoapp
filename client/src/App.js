import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import ListHeader from './components/ListHeader'
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [tasks, setTasks] = useState(null);

    const userEmail = cookies.Email;

    const getData = async (tag) => {
        try {
            console.log('ABABABA');
            console.log(tag);
            let query = `http://localhost:8000/todos/${userEmail}`;

            if (tag) {
                query += `?tags=${tag}`;
            }

            const response = await fetch(query);
            const result = await response.json();
            setTasks(result);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    //Sort by date
    const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="app">
            {!cookies.RefreshToken && <Auth/>}
            {cookies.RefreshToken &&
                <>
                <ListHeader listName={'Holiday'} getData={getData} />
                {sortedTasks?.map((task) => <ListItem key={task.id} getData={getData} task={task}/>)}
                </>
            }
        </div>
    );
}

export default App;
