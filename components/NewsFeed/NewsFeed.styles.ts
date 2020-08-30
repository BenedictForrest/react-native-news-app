import { css } from '@emotion/native'

export const getNewsFeedCSS = () => {
    const bodyCSS = css({
        backgroundColor: '#FFF',
        flexBasis: 0,
        flexGrow: 1,
    })

    const articleCSS = css({
        padding: 24,
    })

    const titleCSS = css({
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    })

    const authorCSS = css({
        color: '#666',
        fontSize: 12,
        marginBottom: 8,
    })

    const descriptionCSS = css({
        color: '#333',
        fontSize: 16,
        lineHeight: 22,
    })

    const dividerCSS = css({
        backgroundColor: '#EEE',
        height: 1,
    })

    return {
        bodyCSS,
        articleCSS,
        titleCSS,
        authorCSS,
        descriptionCSS,
        dividerCSS,
    }
}
