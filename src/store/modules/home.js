import {
  getHomeGoodPriceData,
  getHomeHighScoreData,
  getHomeDiscountData,
  getHomeHotRecommendData,
  getHomeLongforData,
  getHomePlusData
} from '@/services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    productList: [], // 这是测试的
    goodPriceInfo: {},
    highScoreInfo: {},
    discountInfo: {},
    recommendInfo: {},
    longforInfo: {},
    plusInfo: {}
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      console.log('reducer1__', arguments)
      state.goodPriceInfo = payload
    },
    changeHighScoreInfoAction(state, { payload }) {
      // console.log('reducer2__', arguments)
      state.highScoreInfo = payload
    },
    changeDiscountInfoAction(state, { payload }) {
      state.discountInfo = payload
    },
    changeRecommendInfoAction(state, { payload }) {
      state.recommendInfo = payload
    },
    changeLongforInfoAction(state, { payload }) {
      state.longforInfo = payload
    },
    changePlusInfoAction(state, { payload }) {
      state.plusInfo = payload
    }
  },
  extraReducers: {
    // [fetchHomeDataAction.fulfilled](state, { payload }) {
    //   console.log('extraR__', arguments)
    //   state.goodPriceInfo = payload
    // }
  }
})
export const {
  changeGoodPriceInfoAction,
  changeHighScoreInfoAction,
  changeDiscountInfoAction,
  changeRecommendInfoAction,
  changeLongforInfoAction,
  changePlusInfoAction
} = homeSlice.actions

/* 外面react代码某地方会使用dispatch来派发这个方法，如果dispatch是function类型的话，实例上是会被被拦截（一系列操作），dispatch方法会作为参数继续派发异步后action对像数据 {type:'xxx',数据} */
export const fetchHomeDataAction = createAsyncThunk('fetchhomedata', async function (payload, { dispatch, getState }) {
  // 如果你要使用原来的state的数据的话就调用getState
  console.log('asyncThunk__', payload, getState(), arguments)
  /*     const res = await getHomeGoodPriceData()
    const res2 =await getHomeHighScoreData()
    return [res,res2] */
  // 上面这种做法会产生先后顺序 return返回一个带有数据或错误的 Promise
  // 如果不return也是使用上面的dipatch来派发一个action 然后reducer修改store中的state根据action的type来判断并根据其载体(真正的参数内容)来赋新值
  getHomeGoodPriceData().then(res => {
    /* 我们重新dispatch一个action对象，即可让reduce来修改store上的state的数据 */
    dispatch(changeGoodPriceInfoAction(res))
  })

  getHomeHighScoreData().then(res => {
    dispatch(changeHighScoreInfoAction(res))
  })

  getHomeDiscountData().then(res => {
    dispatch(changeDiscountInfoAction(res))
  })

  getHomeHotRecommendData().then(res => {
    dispatch(changeRecommendInfoAction(res))
  })

  getHomeLongforData().then(res => {
    dispatch(changeLongforInfoAction(res))
  })
  getHomePlusData().then(res => {
    dispatch(changePlusInfoAction(res))
  })
})

export default homeSlice.reducer
