import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Linking, TouchableOpacity, Text, View } from 'react-native'
import { FiltersContext } from '../ContextProvider/ContextProvider'
import { getNewsFeedCSS } from './NewsFeed.styles'

export default function NewsFeed() {
    // Fetch context
    const {selectedSources} = useContext(FiltersContext)

    // Create API safe list of sources as comma separated string
    // Fallback to all top headlines from Australia if no sources selected
    let selectedSourcesString = selectedSources.length > 0 ? 'sources=' : 'country=au'
    selectedSources.forEach((id, index) => {
        if (index > 0) {
            selectedSourcesString =  selectedSourcesString.concat(', ')
        }
        selectedSourcesString = selectedSourcesString.concat(id)
    })

    // Articles state
    const [articles, setArticles] = useState([])

    // Fetch the articles from NewsAPI
    const fetchMovies = () => {
        fetch(`http://newsapi.org/v2/top-headlines?${selectedSourcesString}&apiKey=96e7efbae84544aca2e40f5834bf2777`)
          .then((response) => response.json())
          .then((json) => setArticles(json.articles))
          .catch((error) => console.log(error))
    }

    // run fetchMovies on inital render
    useEffect(() => {
        fetchMovies()
    }, [selectedSourcesString])

    // Styles
    const {
        bodyCSS,
        articleCSS,
        titleCSS,
        authorCSS,
        descriptionCSS,
        dividerCSS,
    } = getNewsFeedCSS()

    return (
        <FlatList
            data={articles}
            keyExtractor={(item, index: number) => item.id || index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.5} onPress={() => Linking.openURL(item.url)}>
                    <View style={articleCSS}>
                        <Text style={titleCSS}>{item.title}</Text>
                        <Text style={authorCSS}>{item.author ? item.author : item.source.name}</Text>
                        <Text style={descriptionCSS}>{item.description ? item.description : `Preview content is not available for this article. Read the full article on ${item.source.name}.`}</Text>
                    </View>
                </TouchableOpacity>
            )}
            style={bodyCSS}
            ItemSeparatorComponent={() => (
                <View style={dividerCSS} />
            )}
        />
    )
}
