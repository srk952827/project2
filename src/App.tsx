import { SafeAreaView, StatusBar, StyleSheet, Text, View,FlatList,Pressable,Linking,TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import Snackbar from 'react-native-snackbar'
import Icons from './component/icon'
import Icon from 'react-native-vector-icons/FontAwesome'


export default function App():JSX.Element {
       const [isCross,setIsCross] = useState<boolean>(false)
       const [gameWinner,setGameWinner]=useState<string>('')
       const [gameState,setGameState]=useState(new Array(9).fill('empty',0,9))

       const handleInstagramPress = () => {
        const instagramUrl = 'https://www.instagram.com/itz_13_shahrukh/';
        Linking.openURL(instagramUrl);
      };
       const handleLinkdinPress = () => {
        const LinkdinUrl = 'https://www.linkedin.com/in/shahrukh-khan-855814203';
        Linking.openURL(LinkdinUrl);
      };
       const handleGitPress = () => {
        const GitUrl = 'https://github.com/srk952827';
        Linking.openURL(GitUrl);
      };
      
       const reloadGame =()=>{
        setIsCross(false)
        setGameWinner('')
        setGameState(new Array(9).fill('empty',0,9))
       }
       const checkIsWinner =() =>{
        if(gameState[0]===gameState[1] &&
          gameState[0]===gameState[2] &&
          gameState[0]!=='empty')
          {
            setGameWinner(`${gameState[0]} won the game! 😘 `)
          }
          else if (
                   gameState[3]!=='empty'&&   
                   gameState[3]===gameState[4] &&
                   gameState[4]===gameState[5] )
                   {
                    setGameWinner(`${gameState[3]} won the game! 😘 `)
                    
                   }
          else if (
                   gameState[6]!=='empty'&&   
                   gameState[6]===gameState[7] &&
                   gameState[7]===gameState[8] )
                   {
                    setGameWinner(`${gameState[6]} won the game! 😘 `)
                    
                   }
          else if (
                   gameState[0]!=='empty'&&   
                   gameState[0]===gameState[3] &&
                   gameState[3]===gameState[6] )
                   {
                    setGameWinner(`${gameState[0]} won the game! 😘 `)
                    
                   }
          else if (
                   gameState[1]!=='empty'&&   
                   gameState[1]===gameState[4] &&
                   gameState[4]===gameState[7] )
                   {
                    setGameWinner(`${gameState[1]} won the game! 😘 `)
                    
                   }
          else if (
                   gameState[2]!=='empty'&&   
                   gameState[2]===gameState[5] &&
                   gameState[5]===gameState[8] )
                   {
                    setGameWinner(`${gameState[2]} won the game! 😘 `)
                    
                   }
          else if (
                   gameState[0]!=='empty'&&   
                   gameState[0]===gameState[4] &&
                   gameState[4]===gameState[8] )
                   {
                    setGameWinner(`${gameState[0]} won the game! 😘 `)
                    
                   }
          else if (
                   gameState[2]!=='empty'&&   
                   gameState[2]===gameState[4] &&
                   gameState[4]===gameState[6] )
                   {
                    setGameWinner(`${gameState[2]} won the game! 😘 `)
                    
                   }
                   else if(!gameState.includes('empty',0)){
                    setGameWinner('Draw game...🙂')
                    
                   }
       }
       const onChangeItem =(itemNumber:number)=>{
        if(gameWinner){
          return Snackbar.show({
            text:gameWinner,
            backgroundColor:'#000000',
            textColor:'#ffffff'
          })
        }
        if(gameState[itemNumber]==='empty'){
          gameState[itemNumber]=isCross ? 'cross' :'circle'
          setIsCross(!isCross)
        }
        else {
          return Snackbar.show({
            text: "Position is already filled",
            backgroundColor: "red",
            textColor: "#FFF"
          })
        }
        checkIsWinner()
      }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      {gameWinner ? (
        <View style={[styles.playerInfo,styles.winnerInfo]}>
          <Text style={styles.winnerText}>{gameWinner}</Text>
        </View>
      ) :(
        <View
        style={[styles.playerInfo,
               isCross ? styles.playerX :styles.playerO
        ]}
        >
        <Text style={styles.gameTurnText}>
           {isCross ? 'X' : 'O'}'s Turn
        </Text>
        </View>
      )}
      <FlatList
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item,index})=>(
        <Pressable
        key={index}
        style={styles.card}
        onPress={() => onChangeItem(index)}
        >
          <Icons name={item} />
        </Pressable>
      )}
      />
      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start' : 'Retry'}
        </Text>
      </Pressable>
      <View style={styles.social}>
        <Text style={styles.socialtxt}>FOLLOW ME:</Text>
        <TouchableOpacity onPress={handleInstagramPress}>
        <Icon name="instagram" size={30} color="#bc2a8d" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLinkdinPress}>
        <Icon name="linkedin" size={30} color="#0077B5" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGitPress}>
        <Icon name="github" size={30} color="#333" />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  playerInfo:{
    alignItems:'center',
    // backgroundColor:'#fbc620',
    padding:12,
    margin:8,
    marginRight:12,
    borderRadius:8
  },
  winnerInfo:{},
  winnerText:{
    fontWeight:'600',
    fontSize:24,
    color:'#12b314'
  },
  playerX:{
    backgroundColor:'#98070e'
  },
  playerO:{
    backgroundColor:'#099b1b'
  },
  gameTurnText:{
    fontWeight:'600',
    color:'#fff'
  },
  grid:{
    margin:12,
    
  },
  card:{
    height:100,
    width:'33.33%',
    justifyContent:'center',
    alignItems:'center',
    
  },
  gameBtn:{
    alignItems: 'center',
    backgroundColor:'#ea8929',
    marginHorizontal:32,
    elevation:3,
    padding:8,
    borderRadius:8,
    marginBottom:100
    
  },
  gameBtnText:{
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  container:{
    flex:1,
    
    backgroundColor:'#000000',
    
  },
  social:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    backgroundColor:'#757470',
   
  },
  socialtxt:{
    fontSize:16,
    fontWeight:'600'
  }
})