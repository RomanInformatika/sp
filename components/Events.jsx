
import { Event } from './Event'
import Notification from '../screens/NotificationScreen/notification'
import { View, FlatList,StyleSheet } from 'react-native'

export const Events = ({response,navigation}) => {

    return (
        <View style={styles.events}>
            <FlatList
                data={response?.value}
                renderItem={(item) => <Event navigation={navigation} item={item} />}
                keyExtractor={(item) => item.ID}
                vertical
                refreshing={true}
                contentContainerStyle={{ paddingBottom: 200 }}
            />
            <Notification />
        </View>)

}


const styles = StyleSheet.create({

    events: {
  
      backgroundColor: '#0A4563',
      justifyContent: "flex-start",
      flex:1
    },
  

  });