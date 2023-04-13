import { store } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";



export const getTaskCompletedUserList = async (classid, taskid) => {

    var myHeaders = new Headers();
    myHeaders.append("X-Hasura-Role", "anonymous");
    myHeaders.append("content-type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const res = await fetch(`https://inform250.school1298.ru/api/rest/gettaskexecutors?classid=${encodeURIComponent(classid)}&taskid=${encodeURIComponent(taskid)}`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => {});
    return res
}