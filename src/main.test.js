import {describe, expect, test, jest} from '@jest/globals';
import deepGet, {errArrayIndexNotExists, errObjectInvalid, errPathInvalid, errPropertyNotExists} from './main'

describe('deepGet', () => {
    // deepGet(object, ‘sons[1].grandsons[0].name’)
    const path = 'sons[0].grandsons[0].name'
    const ob = {
        sons: [
            {
                grandsons: [
                    {
                        name: 'Leonardo'
                    }
                ]
            }
        ]
    }

    test('object param is invalid', () => {
        expect(() => deepGet(null, '')).toThrow(errObjectInvalid)
    })
    test('path param is invalid', () => {
        expect(() => deepGet(ob, [])).toThrow(errPathInvalid)
    })
    test('property doesnt exists', () => {
        expect(() => deepGet(ob, 'childrens')).toThrow(errPropertyNotExists)
    })
    test('array index doesnt exists', () => {
        expect(() => deepGet(null, 'sons[2]')).toThrow(errArrayIndexNotExists)
    })

    test('is valid', () => {
        expect(deepGet(ob, path)).toBe('Leonardo')
    })
})


