import { css } from '@emotion/native'

export const getFiltersCSS = () => {
    const bodyCSS = css({
        backgroundColor: '#FFF',
        flexBasis: 0,
        flexGrow: 1,
        padding: 24,
    })

    const titleCSS = css({
        color: '#999',
        fontSize: 14,
        fontWeight: '700',
    })

    const labelCSS = css({
        color: '#333',
        fontSize: 16,
    })

    const rowCSS = css({
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    })

    const checkboxCSS = css({
        alignItems: 'center',
        backgroundColor: '#EEE',
        borderRadius: 3,
        height: 14,
        justifyContent: 'center',
        marginRight: 8,
        width: 14,
    })

    const tickCSS = css({
        color: '#666',
        fontSize: 10,
        fontWeight: '700',
    })

    return {
        bodyCSS,
        titleCSS,
        labelCSS,
        rowCSS,
        checkboxCSS,
        tickCSS,
    }
}
