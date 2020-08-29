import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function App() {
    // Articles state
    const [articles, setArticles] = useState([])

    // Fetch the articles from NewsAPI
    const fetchMovies = () => {
        fetch(`http://newsapi.org/v2/top-headlines?country=au&apiKey=96e7efbae84544aca2e40f5834bf2777`)
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
                <View>
                    <Text>{item.title}</Text>
                    <Text>{item.author}</Text>
                    <Text>{item.description}</Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
