const state = {
  tasks: {
    'ID1': {
      name: "Go to shop",
      completed: false,
      dueDate: "2019/05/26",
      dueTime: "18:00"
    },
    'ID2': {
      name: "Get bananas",
      completed: false,
      dueDate: "2019/05/25",
      dueTime: "18:00"
    },
    'ID3': {
      name: "Get apples",
      completed: false,
      dueDate: "2019/05/29",
      dueTime: "18:00"
    }
  }

}

const mutations = {
  updateTask(state, payload) {
    console.log('payload (from mutation: ', payload);
    Object.assign(state.tasks[payload.id], payload.updates)
  }
}

const actions = {
  updateTask({
    commit
  }, payload) {
    commit('updateTask', payload)
  }
}

const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
