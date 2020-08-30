import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { FiltersContext } from '../ContextProvider/ContextProvider'

export default function Filters() {
    // Fetch context
    const {selectedSources, setSelectedSources } = useContext(FiltersContext)

    // Sources state
    const [sources, setSources] = useState([])

    // Fetch the articles from NewsAPI
    const fetchSources = () => {
        fetch(`http://newsapi.org/v2/sources?country=au&apiKey=96e7efbae84544aca2e40f5834bf2777`)
          .then((response) => response.json())
          .then((json) => setSources(json.sources))
          .catch((error) => console.log(error))
    }

    // run fetchSources on inital render
    useEffect(() => {
        fetchSources()
    }, [])

    // Update selectedSource
    const onPress = (id: string) => {
        const itemIndex = selectedSources.indexOf(id)
        const newSelectedSources = [...selectedSources]

        if (itemIndex === -1) {
            setSelectedSources([...newSelectedSources, id])
        }
        else {
            newSelectedSources.splice(itemIndex, 1)
            setSelectedSources(newSelectedSources)
        }
    }
    
    return (
        <ScrollView style={styles.body}>
            <View>
                <Text style={styles.title}>SOURCES</Text>
                {sources.map((source, index) => {
                    return (
                        <TouchableOpacity style={styles.row} key={index} onPress={() => onPress(source.id)}>
                            <View style={styles.checkbox}>
                                {selectedSources.indexOf(source.id) > -1 && <Text style={styles.tick}>✓</Text>}
                            </View>
                            <Text style={styles.label}>{source.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFF',
        flexBasis: 0,
        flexGrow: 1,
        padding: 24,
    },
    title: {
        color: '#999',
        fontSize: 14,
        fontWeight: '700',
    },
    label: {
        color: '#333',
        fontSize: 16,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    },
    checkbox: {
        alignItems: 'center',
        backgroundColor: '#EEE',
        borderRadius: 3,
        height: 14,
        justifyContent: 'center',
        marginRight: 8,
        width: 14,
    },
    tick: {
        color: '#666',
        fontSize: 10,
        fontWeight: '700',
    }
})
