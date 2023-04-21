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
        fontWeight: 700,
        color: 'white'
     },
    textInput: {
        color: 'white'
    },
    backgroundImage :{
        flex: 1,
        marginTop: -10,
        paddingTop: 16,
    }
});
export default MakeRoomStyle;