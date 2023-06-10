
import { useDispatch, useSelector } from 'react-redux';
import { InsertTaskUsecase } from '../../../domain/Tasks'
import { NotificationDateTime } from '../../../domain/Eventsfilter'
import { LR } from '../../View/NotificationScreen/notification'
import { getTaskCompletedUserList } from '../../../model/api';
import { useNavigation } from '@react-navigation/native';
import { setitems } from '../../redux/userdataSlice'
import { setrefreshItems } from '../../redux/filterSlice';
import { HideTask } from '../../../domain/Events';


export const useViewModel = () => {
    const scheduleNotification = (item) => {
        const shdate = NotificationDateTime(item.item.fullSDate)
        shdate != undefined && LR(shdate, item.item.Title)
    }

    const events = useSelector((state) => state.userdata.items)
    const access = useSelector(state => state.userdata.person)
    const name = useSelector(state => state.userdata.name)
    const classTitle = useSelector(state => state.filter.className)

    const setEventsD = useDispatch()
    const RefreshItemsD = useDispatch()
    const HideItem = async (id) => {
        setEventsD(setitems(await HideTask(id, events)))
        RefreshItemsD(setrefreshItems())

    }

    const InsertTask = (Id) => {
        InsertTaskUsecase(Id, name, classTitle)
        HideItem(Id)
    }

    const navigation = useNavigation()
    const NavigateToHist = async (id) => {
        if (classTitle=='') {
            alert('Не задан класс в настройках')
            return 
        }  
        
        const hist = await getTaskCompletedUserList(classTitle, id)
        if (hist=='Что-то пошло не так') {
            alert('Что-то пошло не так...')
            return 
        }  

        
        
        navigation.navigate('ScreenEventHistory', hist)
    }

    const NavigateToDetails = (teacherDescription,studentDescription) => {
        navigation.navigate('Details', access == 'Учитель' ? teacherDescription : studentDescription)
    }


    return {
        HideItem,
        InsertTask,
        scheduleNotification,
        NavigateToHist,
        NavigateToDetails,
        access,
        
    }
}



