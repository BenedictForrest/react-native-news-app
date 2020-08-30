import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View} from 'react-native'
import { FiltersContext } from '../ContextProvider/ContextProvider'
import { getFiltersCSS } from './Filters.styles'

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

    // Update selectedSources
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

    // Styles
    const {
        bodyCSS,
        titleCSS,
        labelCSS,
        rowCSS,
        checkboxCSS,
        tickCSS,
    } = getFiltersCSS()
    
    return (
        <ScrollView style={bodyCSS}>
            <View>
                <Text style={titleCSS}>SOURCES</Text>
                {sources.map((source, index) => {
                    return (
                        <TouchableOpacity style={rowCSS} key={index} onPress={() => onPress(source.id)}>
                            <View style={checkboxCSS}>
                                {selectedSources.indexOf(source.id) > -1 && <Text style={tickCSS}>✓</Text>}
                            </View>
                            <Text style={labelCSS}>{source.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    )
}
