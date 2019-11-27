import { serializeResponse } from '../__helpers__/serializeResponse'

const appMocks = [
    {
      name: 'AppName',
      desc: 'Description',
      repo: 'https://github.com/ohager/burst-applications',
      img:  'great-success.png',
      tags: ['cool', 'killer', 'cip22']
    },
    {
      name: 'AppName 2',
      desc: 'Description 2',
      repo: 'https://github.com/ohager/burst-applications',
      img:  'great-success.png',
      tags: ['cool', 'killer', 'cip22']
    }
]

const getMocks = () => {
    return new Promise( resolve => {
        setTimeout(() =>{
            resolve(appMocks)
        }, 1000)
    })
}

export const get = async (_, res) => {
  try {
      const mocks = await getMocks()
      res.end(serializeResponse(mocks))
  } catch (e) {
    console.log('Error', e)
    // handleBffException(res, e)
  }
}
