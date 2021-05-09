import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Loader} from '../components/Loader';

interface EnvironmentProps{
    key: string,
    title: string
}
interface PlantProps{
  
      id: string,
      name: string,
      about: string,
      water_tips: string,
      photo: string,
      environments: [string],
      frequency: {
        times: Number,
        repeat_every: string
      }
    
}
export function PlantSelect(){

    const [envs, setEnvs] = useState<EnvironmentProps[]>([]);
    const [envSelected, setEnvSelected] = useState('all');
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    async function fetchPlants(){
        const {data} = await api.get(`plants?_sort=name&_order=asc&page=${page}&_limit=8`);
        
        if(!data){
            setIsLoading(true);
        }

        if(page > 1){
            setPlants(old => [...old, ...data]);
            setFilteredPlants(old => [...old, ...data]);
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }
        setIsLoading(false);
        setHasMore(false);
    }

    function handleEnv(env:string){
        setEnvSelected(env);
        if( env == 'all'){
            return setFilteredPlants(plants);  
        }else{
            const filtered = plants.filter(plant => plant.environments.includes(env));
            setFilteredPlants(filtered);
        }
    }

    function handleFetchMore(distance: number){
        if(distance < 1){
            return;
        }else{
            setHasMore(true);
            setPage(oldValue => oldValue +1);
            fetchPlants();
        }
    }

    useEffect(()=>{
        async function fetchEnvironments(){
            const {data} = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvs([
                {
                    key:'all',
                    title:'Todos'
                },
                ...data
            ]);
        }
        fetchEnvironments();
    },[]);

    useEffect(()=>{
        fetchPlants();
    },[]);

    
    if(isLoading){
        return (
            <Loader />
        )
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar a sua planta?
                </Text>
                <View>
                    <FlatList
                        data={envs} 
                        renderItem={( {item} )=> (
                            <EnvironmentButton 
                            title={item.title} 
                            active={item.key == envSelected}
                            onPress ={() => handleEnv(item.key)}
                            />
                        )}
                        
                        horizontal
                        showsHorizontalScrollIndicator = {false}
                        contentContainerStyle = {styles.envList}
                    />
                </View>
            </View>
            <View style={styles.plants}>
                   
                    <FlatList 
                        data= {filteredPlants}
                        renderItem = {({ item }) => (
                            <PlantCardPrimary data={item} />
                        )}
                        numColumns = { 2 }
                        showsVerticalScrollIndicator = { false }
                        keyExtractor={(item) => item.id.toString()} 
                        onEndReachedThreshold = {0.1}
                        onEndReached ={({distanceFromEnd})=> handleFetchMore(distanceFromEnd)}
                        ListFooterComponent = { 
                            hasMore 
                            ? <ActivityIndicator color={colors.green_dark}/>
                            : <></>
                        }
                        />
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background,
    },
    header:{
        padding:30
    },
    title:{
        fontSize:17,
        color:colors.heading,
        fontFamily: fonts.heading,
        lineHeight:20,
        marginTop:15
    },
    subtitle:{
        fontSize:17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight:20
    },
    envList:{
        height:40,
        justifyContent:'center',
        paddingBottom:5,
        marginVertical:32,   
    },
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'

    }
});