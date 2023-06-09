import {
    StyleSheet
} from 'react-native';
import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';

const LoginStyles = StyleSheet.create({
    loginBtn:{
        marginTop: 20,
        marginBottom:10,
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 5,
        width: '100%',
    },
    loginView :{
        flex:1,
        justifyContent:'flex-start',
        backgroundColor: 'lightgreen',
    },
    signupBtn: {
        width: '100%',
    },
    backgroundImage :{
        flex: 1,
        justifyContent: 'center',
    },
    profile:{
        width : '100%',
        height: 120,
        backgroundColor: 'lightblue',
        marginBottom: 10,
        marginTop: -140,
        
    },
    profileBoder:{
        borderRadius: 50,
        marginTop: 20,
        width : 70,
        height: 70,
        backgroundColor: 'lightgreen',
        marginLeft: 10,
    },
    avaText:{
        fontSize: 17,
        marginLeft: 20,
        marginTop: 20,
        fontStyle: 'italic',
        fontWeight: 500,
    },
    subAvaText:{
        fontSize: 15,
        marginLeft: 20,
        marginTop: 10,
        fontWeight: 400,
    },
    miniBackgroundImage:{
      marginTop: -10,
      flex:1,
      flexDirection:'row', 
      flexWrap:'wrap',

    }
});
export default LoginStyles;