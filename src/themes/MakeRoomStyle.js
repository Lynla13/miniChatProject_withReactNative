import {
    StyleSheet
} from 'react-native';

const MakeRoomStyle = StyleSheet.create({
    checkBoxView: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginLeft: 10,
        display: 'flex',
        marginTop: 20,
        marginBottom: 20,
    },
    checkBoxLabel:{
        marginLeft: 10,
        fontSize: 15,
        marginTop: -3
     },
    inputLabel:{
        fontSize: 16,
        marginTop: 2,
        fontWeight: 600,
     }
});
export default MakeRoomStyle;