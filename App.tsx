import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function App() {
    // Articles state
    const [articles, setArticles] = useState([])

    // Fetch the articles from NewsAPI
    const fetchMovies = () => {
        fetch(`https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=au&apiKey=96e7efbae84544aca2e40f5834bf2777`)
          .then((response) => response.json())
          .then((json) => setArticles(json.articles))
          .catch((error) => console.log(error))
    }

    // run fetchMovies on inital render
    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <FlatList
            data={articles}
            keyExtractor={(item, index: number) => index.toString()}
            renderItem={({ item, index }) => (
                <View style={styles.article}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.author}>{item.author ? item.author : item.source.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            )}
            style={styles.container}
            ItemSeparatorComponent={() => (
                <View style={styles.divider} />
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flexBasis: 0,
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    article: {
        padding: 24,
    },
    title: {
        color: '#000',
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
