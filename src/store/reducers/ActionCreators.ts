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
    const nextPage =
      _.pages === 1
        ? `&page=${1}`
        : `&page=${Math.floor(Math.random() * _.pages)}`
    try {
      const response = await axios.get(
        `https://api.kinopoisk.dev/movie?token=<ENTER_YOUR_TOKEN_HERE>&limit=1${genre}${country}${popular}${date}${rate}${nextPage}${age}`
      )
      return response.data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
