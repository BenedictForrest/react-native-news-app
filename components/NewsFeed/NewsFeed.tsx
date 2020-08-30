import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Linking, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { FiltersContext } from '../ContextProvider/ContextProvider'

export default function NewsFeed() {
    // Fetch context
    const {selectedSources} = useContext(FiltersContext)

    let selectedSourcesString = selectedSources.length > 0 ? 'sources=' : 'country=au'
    selectedSources.forEach((id, index) => {
        if (index > 0) {
            selectedSourcesString =  `${selectedSourcesString}, `
        }
        selectedSourcesString = `${selectedSourcesString}${id}`
    })

    console.log(selectedSourcesString)

    // Articles state
    const [articles, setArticles] = useState([])
    const [status, setStatus] = useState('')

    // Fetch the articles from NewsAPI
    const fetchMovies = () => {
        fetch(`http://newsapi.org/v2/top-headlines?${selectedSourcesString}&apiKey=96e7efbae84544aca2e40f5834bf2777`)
          .then((response) => response.json())
          .then((json) => {
              setArticles(json.articles)
              setStatus(json.message)
          })
          .catch((error) => console.log(error))
    }

    // run fetchMovies on inital render
    useEffect(() => {
        fetchMovies()
    }, [selectedSourcesString])

    return (
        <FlatList
            data={articles}
            keyExtractor={(item, index: number) => index.toString()}
            renderItem={({ item, index }) => (
                <TouchableOpacity activeOpacity={0.5} onPress={() => Linking.openURL(item.url)}>
                    <View style={styles.article}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.author}>{item.author ? item.author : item.source.name}</Text>
                        <Text style={styles.description}>{item.description ? item.description : `Preview content is not available for this article. Read the full article on ${item.source.name}.`}</Text>
                    </View>
                </TouchableOpacity>
            )}
            style={styles.body}
            ItemSeparatorComponent={() => (
                <View style={styles.divider} />
            )}
        />
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFF',
        flexBasis: 0,
        flexGrow: 1,
    },
    article: {
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    author: {
        color: '#666',
        fontSize: 12,
        marginBottom: 8,
    },
    description: {
        color: '#333',
        fontSize: 16,
        lineHeight: 22,
    },
    divider: {
        backgroundColor: '#EEE',
        height: 1,
    }
})
