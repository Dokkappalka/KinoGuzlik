import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface fetchTypes {
  genre: string
  rate: string
  date: string
  country: string
  popular: string
  age: string[]
  pages: number
}
//Это выглядит немного страшно. Мне следует вернуться к этому моменту...
export const fetchFilms = createAsyncThunk(
  'films/fetchAll',
  async (_: fetchTypes, thunkAPI) => {
    const genre = _.genre === '0' ? '' : `&field=genres.name&search=${_.genre}`
    const country =
      _.country === '0' ? '' : `&field=countries.name&search=${_.country}`
    const age =
      _.age.length > 0
        ? '&field=ageRating&search=' + _.age.join('&field=ageRating&search=')
        : ''
    const popular =
      _.popular === '' ? '' : `&field=votes.kp&search=${_.popular}`
    const rate = `&field=rating.kp&search=${_.rate}`
    const date = `&field=year&search=${_.date}`
    //На это тоже нужно обратить вниакние.
    const nextPage =
      _.pages === 1
        ? `&page=${1}`
        : `&page=${Math.floor(Math.random() * _.pages + 1)}`
    try {
      const response = await axios.get(
        `https://api.kinopoisk.dev/v1.3/movie?&limit=1${genre}${country}${popular}${date}${rate}${nextPage}${age}`,
        { headers: { 'X-API-KEY': 'C6AE02R-QQT4Z07-M6YAG1X-HD4BSC0' } }
      )
      return response.data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
